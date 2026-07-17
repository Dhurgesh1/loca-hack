# Weather Website with Exact Location

A simple static website that uses browser geolocation to fetch weather details for your exact location. It stores the last location in browser `localStorage` and also saves each location to Supabase.

## Features

- Uses browser `navigator.geolocation` to get current latitude and longitude
- Loads weather data from OpenWeather API
- Saves location in `localStorage`
- Inserts location records in a Supabase table

## Setup

1. Create a Supabase project and note the project URL and anon public key.
2. Create a `locations` table in Supabase with these columns:
   - `id` UUID (primary key, default `uuid_generate_v4()`)
   - `latitude` double precision
   - `longitude` double precision
   - `city` text
   - `saved_at` timestamp with time zone default `now()`
3. Create an OpenWeather account and get an API key.
4. Open `script.js` and replace these placeholders:
   - `YOUR_SUPABASE_PROJECT_ID`
   - `YOUR_SUPABASE_ANON_KEY`
   - `YOUR_OPENWEATHER_API_KEY`
5. Open `index.html` in a browser.

## Usage

- Click **Use Current Location** to request geolocation and load weather data
- Click **Load Saved Location** to reuse the last saved location from localStorage

## Notes

- The page saves the most recent location in local storage so you can reload it quickly.
- Supabase storage is used for permanent location records, visible in your Supabase table.
