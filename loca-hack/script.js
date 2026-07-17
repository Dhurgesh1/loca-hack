const supabaseUrl = 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const weatherApiKey = 'YOUR_OPENWEATHER_API_KEY';
const supabase = supabaseJs.createClient(supabaseUrl, supabaseKey);

const statusEl = document.getElementById('status');
const weatherEl = document.getElementById('weather');
const cityEl = document.getElementById('city');
const coordsEl = document.getElementById('coords');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const iconEl = document.getElementById('icon');
const savedAtEl = document.getElementById('savedAt');
const saveLocationBtn = document.getElementById('saveLocationBtn');

saveLocationBtn.addEventListener('click', requestCurrentLocation);

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#b91c1c' : '#374151';
}

function showWeather() {
  weatherEl.classList.remove('hidden');
}

function hideWeather() {
  weatherEl.classList.add('hidden');
}

async function saveLocationInSupabase(location) {
  try {
    const { error } = await supabase.from('locations').insert([
      {
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.city,
        saved_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase save failed:', error);
      setStatus('Weather loaded, but saving to Supabase failed. Check console.', true);
    }
  } catch (err) {
    console.error('Unexpected Supabase error:', err);
    setStatus('Weather loaded, but saving to Supabase failed. Check console.', true);
  }
}

async function fetchWeather(lat, lon) {
  if (!weatherApiKey || weatherApiKey.includes('YOUR_OPENWEATHER_API_KEY')) {
    setStatus('Replace WEATHER API key placeholder in script.js to load weather details.', true);
    return;
  }

  setStatus('Fetching weather data...');
  hideWeather();

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    const location = {
      latitude: lat,
      longitude: lon,
      city: data.name || 'Unknown location',
      savedAt: new Date().toISOString(),
    };

    await saveLocationInSupabase({
      latitude: lat,
      longitude: lon,
      city: location.city,
    });

    updateWeatherUI(data, location);
    setStatus('Location saved to Supabase successfully.');
  } catch (err) {
    console.error(err);
    setStatus('Could not fetch weather. Check API key or network.', true);
  }
}

function updateWeatherUI(data, location) {
  cityEl.textContent = location.city;
  coordsEl.textContent = `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
  temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionEl.textContent = data.weather?.[0]?.description || 'N/A';
  humidityEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = `${Math.round(data.wind.speed)} m/s`;
  savedAtEl.textContent = new Date(location.savedAt).toLocaleString();

  const weatherIconCode = data.weather?.[0]?.icon;
  if (weatherIconCode) {
    iconEl.src = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
    iconEl.alt = data.weather[0].description;
  } else {
    iconEl.src = '';
    iconEl.alt = 'Weather icon';
  }

  showWeather();
}

function requestCurrentLocation() {
  if (!navigator.geolocation) {
    setStatus('Geolocation is not supported by your browser.', true);
    return;
  }

  setStatus('Requesting location permission...');
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude);
    },
    (error) => {
      console.error('Geolocation error:', error);
      setStatus('Unable to get location. Allow access and try again.', true);
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 60000,
    }
  );
}

window.addEventListener('DOMContentLoaded', () => {
  setStatus('Click the button to send your location to Supabase.');
});
