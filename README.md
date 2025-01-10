# <div align="center">
  <img src="public/favicon.png" alt="My Movie Mood Logo" width="100" height="100">
  <h1>My Movie Mood</h1>
  <p>🎬 Your Emotional Cinema Companion</p>

  [![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![React](https://img.shields.io/badge/React-Latest-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
  [![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/)
</div>

## 🎯 Overview

My Movie Mood is an innovative web application that transforms the way you discover movies. By understanding your emotional state, it provides personalized movie recommendations that resonate with your current mood. Built with modern technologies and featuring a stunning glass-morphism UI, it offers a unique and immersive movie discovery experience.

## ✨ Key Features

- 🎭 **Intelligent Mood Detection**
  - Smart analysis of your emotional state
  - Personalized movie recommendations
  - Mood-based filtering system

- 🎬 **Rich Movie Experience**
  - High-quality movie data from TMDB
  - Detailed movie information and trailers
  - User ratings and reviews integration

- 🛡️ **Security & Performance**
  - Secure Firebase authentication
  - Efficient local caching system
  - Fast and responsive interface

- 🎨 **Modern Design**
  - Beautiful glass-morphism UI
  - Fully responsive layout
  - Dark/Light theme support
  - Smooth animations

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- Node.js (v18 or higher)
- npm (included with Node.js)
- A modern web browser
- TMDB API key
- Firebase project credentials

### Quick Setup

1. **Clone & Install**
   ```bash
   git clone https://github.com/rahulpatel902/my-movie-mood.git
   cd my-movie-mood
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_TMDB_API_KEY=your_tmdb_api_key
   ```

3. **Development**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` in your browser

### Production Build
   ```bash
   npm run build
   npm run preview
   ```

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Firebase
- **API**: TMDB API
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting
- **State Management**: React Context/Redux
- **Styling**: TailwindCSS, SCSS

## 📱 Screenshots

<div align="center">
  <img src="public/screenshots/home.png" alt="Home Screen" width="400">
  <img src="public/screenshots/mood.png" alt="Mood Selection" width="400">
</div>

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for their extensive movie database
- [Firebase](https://firebase.google.com/) for authentication and hosting
- All our contributors and supporters

---

<div align="center">
  <p>Made with ❤️ by Rahul Patel</p>
  <p>
    <a href="https://github.com/rahulpatel902">GitHub</a> •
    <a href="https://linkedin.com/in/rahulpatel902">LinkedIn</a>
  </p>
</div>
