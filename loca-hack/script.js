const supabaseUrl = 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const weatherApiKey = 'YOUR_OPENWEATHER_API_KEY';

const supabaseClient = window.supabase ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;
const fetchButton = document.getElementById('fetchButton');
const statusEl = document.getElementById('status');
const weatherEl = document.getElementById('weather');
const cityEl = document.getElementById('city');
const coordsEl = document.getElementById('coords');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

fetchButton.addEventListener('click', handleFetchWeather);

function setStatus(message, status = 'normal') {
  statusEl.textContent = message;
  statusEl.className = `status ${status}`;
}

function showWeather() {
  weatherEl.classList.remove('hidden');
}

function hideWeather() {
  weatherEl.classList.add('hidden');
}

function setButtonLoading(isLoading) {
  fetchButton.disabled = isLoading;
  fetchButton.textContent = isLoading ? 'Loading…' : 'Fetch Weather';
}

async function saveLocation(latitude, longitude, city) {
  if (!supabaseClient) {
    setStatus('Supabase not initialized. Update keys in script.js.', 'error');
    return false;
  }

  const { error } = await supabaseClient.from('locations').insert([
    { latitude, longitude, city, saved_at: new Date().toISOString() },
  ]);

  if (error) {
    console.error(error);
    setStatus('Could not save location to Supabase.', 'error');
    return false;
  }

  return true;
}

async function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Weather fetch failed');
  return response.json();
}

async function handleFetchWeather() {
  if (!navigator.geolocation) {
    setStatus('Geolocation not supported.', 'error');
    return;
  }

  setButtonLoading(true);
  setStatus('Requesting location…');
  hideWeather();

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    setStatus('Fetching weather…');

    try {
      const data = await fetchWeather(latitude, longitude);
      const city = data.name || 'Unknown';

      const saved = await saveLocation(latitude, longitude, city);
      if (saved) setStatus('Weather loaded and location saved.');

      cityEl.textContent = city;
      coordsEl.textContent = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionEl.textContent = data.weather?.[0]?.description || 'No data';
      humidityEl.textContent = `${data.main.humidity}%`;
      windEl.textContent = `${Math.round(data.wind.speed)} m/s`;
      showWeather();
    } catch (error) {
      console.error(error);
      setStatus('Failed to load weather.', 'error');
    } finally {
      setButtonLoading(false);
    }
  }, (error) => {
    console.error(error);
    setStatus('Location access denied or unavailable.', 'error');
    setButtonLoading(false);
  });
}
