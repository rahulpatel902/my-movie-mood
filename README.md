# My Movie Mood  🎬
---------------------

A web application that recommends movies based on your mood using TMDB API and Firebase authentication.

## Prerequisites

Before running this project, make sure you have:

- Node.js (Latest LTS version) Installed

## Installation: 

0. Open VSCode Terminal
1. Clone the repository
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_TMDB_API_KEY=your_tmdb_api_key
```

## Running the Project

1. For development:
```bash
npm run dev
```

2. For production build:
```bash
npm run build
npm run preview
```

## Features

- 🔐 User Authentication (Sign up, Login, Password Reset)
- 🎭 Mood-based movie recommendations
- 🎬 Movie details including ratings, duration, and genres
- 📱 Responsive design
- 🎨 Modern glass-morphism UI

## Tech Stack

- Frontend: HTML5, CSS3, JavaScript
- Build Tool: Vite
- Authentication: Firebase
- Movie Data: TMDB API
- Hosting: Netlify

## Project Structure

```
project-root/
├── src/
│   └── firebase.js
├── auth.html
├── auth.js
├── auth.css
├── index.html
├── main.js
├── style.css
└── vite.config.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## Acknowledgments

- TMDB API for movie data
- Firebase for authentication
- Vite for build tooling
