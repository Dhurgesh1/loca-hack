# Location Tracker Tool

A simple browser-based location tracker that gets your exact GPS coordinates, fetches weather details, and saves the location info to Supabase.

## Repository contents

- `index.html` — single-page UI with one button
- `styles.css` — polished styling, responsive layout
- `script.js` — geolocation, weather fetch, localStorage, Supabase save
- `README.md` — this step-by-step guide

## What you need first

- A modern browser with geolocation support
- A Supabase account
- An OpenWeather API key

## Step 1: Sign up for Supabase

1. Visit https://supabase.com.
2. Create a free account.
3. Create a new project.
4. In the project dashboard, open **API** from the left menu.
5. Copy the **Project URL** and the **anon public** key from the **Project API keys** section.

## Step 2: Create the `locations` table

In Supabase, go to **SQL Editor** and run this SQL:

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

If `uuid-ossp` is already enabled in your project, you can remove the first line.

## Step 3: Create an OpenWeather API key

1. Go to https://openweathermap.org/ and sign in or register.
2. Open the **API keys** section in your account.
3. Create a new key.
4. Copy the API key.

## Step 4: Configure the app

1. Open `script.js` in your editor.
2. Update these values at the top of the file:

```js
const supabaseUrl = 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const weatherApiKey = 'YOUR_OPENWEATHER_API_KEY';
```

3. Save `script.js`.

## Step 5: Run the project locally

1. Open `index.html` in your browser.
   - You can double-click the file or use a simple static server.
2. Click **Save Current Location**.
3. Allow location access when prompted.

## What the app does

- Requests your exact latitude and longitude from the browser.
- Fetches current weather data for that location from OpenWeather.
- Displays the weather and coordinates in the UI.
- Saves the location record to the `locations` table in Supabase.
- Stores the last saved location in browser `localStorage`.

## How to verify it worked

1. In Supabase, open **Table Editor**.
2. Select the `locations` table.
3. Confirm the new row appears each time you click the button.

## Common issues and fixes

- **Button not working**: open browser console and check for errors.
- **Geolocation blocked**: allow browser location permission.
- **Supabase save fails**: verify `supabaseUrl`, `supabaseKey`, and the table schema.
- **Weather fails**: verify `weatherApiKey` and check the console for API errors.

## Optional: host this as a static site

- Use GitHub Pages, Netlify, or Vercel.
- Upload the three files `index.html`, `styles.css`, and `script.js`.
- Make sure `script.js` contains your keys and project URL.

## Notes for your user

- This repo is a simple location tracker + weather saver.
- It uses Supabase for storage and OpenWeather for weather data.
- It works best on `https://` or `localhost` because geolocation requires a secure context.
