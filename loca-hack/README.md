# Location tracking Tool

A simple browser app that retrieves your current location, fetches live weather from OpenWeather, and saves the coordinates to Supabase.

## Repo files

- `index.html` — main page and UI
- `styles.css` — improved styling
- `script.js` — geolocation, weather lookup, Supabase insert
- `README.md` — setup and usage guide

## Prerequisites

- A modern browser with geolocation support
- A Supabase project
- An OpenWeather API key

## Step 1: Create your Supabase table

In Supabase, open **SQL Editor** and run:

```sql
create extension if not exists "uuid-ossp";

create table public.locations (
  id uuid primary key default uuid_generate_v4(),
  latitude double precision not null,
  longitude double precision not null,
  city text not null,
  saved_at timestamptz not null default now()
);
```

## Step 2: Get your API keys

1. Go to https://supabase.com and create a project.
2. Open **API** in the Supabase dashboard.
3. Copy the **Project URL** and **anon public** key.
4. Go to https://openweathermap.org and sign in or register.
5. Create a new API key and copy it.

## Step 3: Configure `script.js`

Open `script.js` and replace the placeholders at the top:

```js
const supabaseUrl = 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const weatherApiKey = 'YOUR_OPENWEATHER_API_KEY';
```

Save the file.

## Step 4: Run the app

1. Open `index.html` in your browser.
2. Click **Fetch Weather**.
3. Allow location permission when prompted.

## What happens

- The browser gets your exact latitude and longitude.
- The app fetches weather data from OpenWeather.
- The weather appears on the page.
- The location is saved to the `locations` table in Supabase.

## Troubleshooting

- If nothing happens, open the browser console for errors.
- If geolocation fails, allow location access and use `https://` or `localhost`.
- If weather fails, verify the OpenWeather API key.
- If saving fails, verify the Supabase URL, anon key, and table schema.

## Notes

- This app is lightweight and can be served as a static page.
- Keep your keys private; do not publish them in public repositories.
