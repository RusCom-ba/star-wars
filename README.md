# 🌌 Star Wars Character Editor

This is a futuristic React + TypeScript application that displays Star Wars characters fetched from the [SWAPI API](https://swapi.dev/), allowing users to edit character details locally with a stunning hologram-styled modal.

## 🚀 Features

- Fetch specific characters from the Star Wars API
- Store characters in Redux with normalization (`byId`, `allIds`)
- Fallback to localStorage and sync updates
- Fully editable character modal styled like a hologram
- Mobile responsive layout with themed Navbar
- Custom loaders (Hyperspace warp effect)
- Under Construction pages with lightsaber animations
- Error handling with recovery for corrupted local data

## 🧱 Tech Stack

- ⚛️ React (with Vite)
- 💬 TypeScript
- 🎨 TailwindCSS (no config file used)
- 🌌 Redux Toolkit (for state management)
- 🔗 React Router DOM (for navigation)
- 📦 Axios (for API calls)

## 📁 Project Structure

```
src/
├── assets/               # Static images (e.g. Vader, Yoda)
├── components/           # Reusable components (Card, CardList, EditModal, Loader)
├── layout/               # Layout wrapper including Navbar
├── pages/                # Page views (Home, About, etc.)
├── redux/
│   ├── character/        # character.slices.tsx, character.types.tsx, character.selector.tsx
│   └── Store.ts          # Redux store setup
└── main.tsx              # Entry point
```

## 📦 Installation

```bash
npm install
```

## 🧪 Running the Project

```bash
npm run dev
```

Project runs on [http://localhost:3000] by default.

## 💾 Caching Strategy

- Characters are first looked up in `localStorage`.
- If not found, they are fetched from the API and then saved in `localStorage`.
- User edits are saved locally and reloaded on next visit.
- Corrupted data is automatically recovered with fallback messages.

## 🎬 Live Demo

[🔗 Vercel Deployment Link](https://star-wars-lake-nine.vercel.app/)

## 🧙 Author

Created by Rusmir Čomor.  
_“May the code be with you.”_
