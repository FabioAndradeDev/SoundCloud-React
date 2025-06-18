// Tipos base
export interface Song {
  id: string;
  title: string;
  artist: Artist;
  coverUrl: string;
  audioUrl: string;
  duration: number;
  plays: number;
  likes: number;
  createdAt: string;
}

export interface Playlist {
  id: string;
  name: string;
  coverUrl: string;
  owner: User;
  songs: Song[];
  likes: number;
  createdAt: string;
}

export interface Artist {
  id: string;
  name: string;
  avatarUrl: string;
  followers: number;
  songs: Song[];
  playlists: Playlist[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  coverUrl?: string;
  bio?: string;
  followers: number;
  following: number;
  totalPlays?: number;
  playlists: Playlist[];
  songs?: Song[];
  likedSongs: Song[];
  likedPlaylists: Playlist[];
  likedArtists: Artist[];
}

export interface SearchResults {
  songs: Song[];
  playlists: Playlist[];
  artists: Artist[];
} 