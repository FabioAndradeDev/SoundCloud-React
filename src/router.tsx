import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from './App';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import UploadSong from './pages/UploadSong';
import LikedSongs from './pages/LikedSongs';
import MyPlaylists from './pages/MyPlaylists';
import ArtistDetails from './pages/ArtistDetails';
import PlaylistDetails from './pages/PlaylistDetails';
import SongDetails from './pages/SongDetails';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  // --- Rotas Públicas ---
  {
    path: '/',
    element: <PublicRoute />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ]
  },
  // --- Rotas Privadas (Layout Principal) ---
  {
    path: '/app',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="/app/home" replace /> },
      { path: 'home', element: <Home /> },
      { path: 'search', element: <Search /> },
      { path: 'profile', element: <Profile /> },
      { path: 'upload', element: <UploadSong /> },
      { path: 'liked-songs', element: <LikedSongs /> },
      { path: 'my-playlists', element: <MyPlaylists /> },
      { path: 'artist/:artistId', element: <ArtistDetails /> },
      { path: 'playlist/:playlistId', element: <PlaylistDetails /> },
      { path: 'song/:songId', element: <SongDetails /> },
    ],
  },
  // --- Rota de Fallback ---
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
]); 