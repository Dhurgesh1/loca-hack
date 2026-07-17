# Location Tracker Tool

A simple browser-based location tracker that gets your exact GPS coordinates, fetches weather details, and saves the location info to Supabase.

## What this project includes

- `index.html` — single-page UI with one button
- `styles.css` — minimal styling
- `script.js` — geolocation, OpenWeather fetch, localStorage, Supabase insert

## Prerequisites

- A modern browser with geolocation support
- A Supabase account
- An OpenWeather API key

## Step 1: Create a Supabase account

1. Go to https://supabase.com and sign up for a free account.
2. Create a new project.
3. In the project dashboard, open **API** from the left menu.
4. Copy the **Project URL** and the **anon public** key from the **Project API keys** section.

## Step 2: Create the `locations` table

In Supabase, open the SQL Editor and run this SQL:

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

If `uuid-ossp` is already enabled, you can omit the first line.

## Step 3: Get an OpenWeather API key

1. Go to https://openweathermap.org/ and sign up for a free account.
2. After logging in, open the API keys section in your account.
3. Create a new API key.
4. Copy the key to use in `script.js`.

## Step 4: Configure the project

1. Open `script.js` in your code editor.
2. Replace these placeholder values:

```js
const supabaseUrl = 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const weatherApiKey = 'YOUR_OPENWEATHER_API_KEY';
```

3. Save the file.

## Step 5: Run the app

1. Open `index.html` in your browser.
2. Click the **Get Weather Details** button.
3. Allow browser location access when prompted.

## What happens when you click the button

- The browser gets your exact latitude and longitude.
- The app calls the OpenWeather API for current weather at that location.
- Weather data is displayed in the page.
- The tool saves the location record to the Supabase `locations` table.

## Optional: Verify saved data in Supabase

1. In Supabase, open the **Table Editor**.
2. Select the `locations` table.
3. Confirm that new rows appear after clicking the button.

## Troubleshooting

- If location access is blocked, allow geolocation in your browser settings.
- If the weather does not load, check your OpenWeather API key and browser console.
- If Supabase insert fails, verify your Supabase URL, anon key, and table schema.

## Notes

- This tool saves location data to Supabase immediately on button click.
- The app also keeps the last location in `localStorage` for optional reuse.
- You can host this page as a static website or run it locally by opening `index.html`.
