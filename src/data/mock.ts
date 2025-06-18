import type { User, Song, Playlist, Artist, SearchResults } from '../types';

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Maria Santos',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    followers: 5678,
    songs: [],
    playlists: []
  },
  {
    id: '2',
    name: 'Pedro Costa',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    followers: 3456,
    songs: [],
    playlists: []
  },
  {
    id: '3',
    name: 'João Silva',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    followers: 1234,
    songs: [],
    playlists: []
  }
];

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Summer Vibes',
    artist: mockArtists[2],
    coverUrl: 'https://source.unsplash.com/random/300x300?music,1',
    audioUrl: 'https://example.com/summer-vibes.mp3',
    duration: 180,
    plays: 12345,
    likes: 789,
    createdAt: '2024-03-15'
  },
  {
    id: '2',
    title: 'Midnight Dreams',
    artist: mockArtists[0],
    coverUrl: 'https://source.unsplash.com/random/300x300?music,2',
    audioUrl: 'https://example.com/midnight-dreams.mp3',
    duration: 240,
    plays: 8765,
    likes: 432,
    createdAt: '2024-03-14'
  },
  {
    id: '3',
    title: 'Ocean Waves',
    artist: mockArtists[1],
    coverUrl: 'https://source.unsplash.com/random/300x300?music,3',
    audioUrl: 'https://example.com/ocean-waves.mp3',
    duration: 210,
    plays: 5432,
    likes: 321,
    createdAt: '2024-03-13'
  }
];

mockArtists[0].songs = [mockSongs[1]];
mockArtists[1].songs = [mockSongs[2]];
mockArtists[2].songs = [mockSongs[0]];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Chill Vibes',
    coverUrl: 'https://source.unsplash.com/random/300x300?playlist,1',
    songs: mockSongs.slice(0, 2),
    likes: 123,
    createdAt: '2024-01-01',
    owner: null as any, // Placeholder for owner
  },
  {
    id: '2',
    name: 'Workout Mix',
    coverUrl: 'https://source.unsplash.com/random/300x300?playlist,2',
    songs: [mockSongs[0], mockSongs[2]],
    likes: 456,
    createdAt: '2024-02-01',
    owner: null as any, // Placeholder for owner
  }
];

export const currentUser: User = {
  id: '1',
  username: 'joaosilva',
  email: 'joao@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
  coverUrl: 'https://source.unsplash.com/random/1200x400?music',
  bio: 'Produtor musical e DJ apaixonado por música eletrônica.',
  followers: 1234,
  following: 567,
  totalPlays: 45678,
  songs: [mockSongs[0]],
  playlists: mockPlaylists,
  likedSongs: [mockSongs[1]],
  likedPlaylists: [mockPlaylists[0]],
  likedArtists: [mockArtists[0]]
};

// Add owner to playlists
mockPlaylists[0].owner = currentUser;
mockPlaylists[1].owner = currentUser;

export const mockSearchResults: SearchResults = {
  songs: mockSongs,
  artists: mockArtists,
  playlists: mockPlaylists
}; 