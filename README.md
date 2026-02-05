# Movie Explorer

A modern React application for discovering and exploring movies using The Movie Database (TMDB) API. Built with React, Vite, and Tailwind CSS.

🚀 **Live Demo**: [https://ilovemovies-eight.vercel.app/](https://ilovemovies-eight.vercel.app/)

## Features

- 🎬 **Browse Popular Movies**: View a curated list of popular movies
- 🔍 **Search Movies**: Search for movies by title using the TMDB API
- ❤️ **Favorites System**: Save and manage your favorite movies
- 🎭 **Movie Details**: View detailed information about each movie
- 🌙 **Dark Mode Support**: Built-in dark/light theme toggle
- 📱 **Responsive Design**: Fully responsive layout for all devices

## Tech Stack

- **Frontend**: React 19.2.0 with Vite 7.2.4
- **Routing**: React Router DOM 7.13.0
- **Styling**: Tailwind CSS 4.1.18
- **API**: The Movie Database (TMDB) API
- **Linting**: ESLint with React-specific rules

## Project Structure

```
movie-explorer/
├── dist/                    # Build output directory
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── MovieCard.jsx   # Movie card component
│   │   ├── Navbar.jsx      # Navigation bar with theme toggle
│   │   └── SearchBar.jsx   # Search functionality
│   ├── pages/              # Page components
│   │   ├── Favorites.jsx   # Favorites management page
│   │   ├── Home.jsx        # Main movies browsing page
│   │   └── MovieDetails.jsx # Individual movie details
│   ├── utils/              # Utility functions
│   │   └── favorites.js    # Local storage for favorites
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Application entry point
│   ├── index.css           # Global styles and Tailwind imports
│   └── config.js           # API configuration (TMDB)
├── .gitignore              # Git ignore rules
├── index.html              # HTML template
├── package.json            # Dependencies and project scripts
├── vite.config.js          # Vite build configuration
├── eslint.config.js        # ESLint configuration
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Amanvermaa1/Movie-Explorer
   cd Movie-Explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

The application uses The Movie Database (TMDB) API. The API key is included in the project, but for production use, you should:

1. Sign up at [TMDB](https://www.themoviedb.org/signup)
2. Get your API key from the [TMDB API settings](https://www.themoviedb.org/settings/api)
3. Replace the API key in `src/config.js`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Usage

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:5173`

3. **Explore movies**:
   - Browse popular movies on the home page
   - Use the search bar to find specific movies
   - Click on any movie to view details
   - Save movies to favorites using the heart icon
   - View your favorites on the dedicated page

## API Integration

The application integrates with TMDB API for:
- Fetching popular movies
- Searching movies by title
- Getting detailed movie information
- Loading movie posters and backdrops

## Features in Detail

### Movie Browsing
- Grid layout with responsive design
- Movie cards displaying poster, title, and rating
- Smooth hover effects and transitions

### Search Functionality
- Real-time search as you type
- Debounced API calls to optimize performance
- Error handling for failed searches

### Favorites System
- Local storage persistence
- Add/remove favorites with one click
- Dedicated favorites page for easy management

### Responsive Design
- Mobile-first approach
- Adaptive grid layout (1-4 columns based on screen size)
- Touch-friendly interface

## Development

### Code Quality
- ESLint configuration for React best practices
- Prettier-ready configuration
- Modern ES6+ JavaScript features

### Build Process
- Vite for fast development and optimized builds
- Code splitting and lazy loading
- Asset optimization and minification

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [React](https://react.dev/) for the frontend framework
- [Vite](https://vite.dev/) for the build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework