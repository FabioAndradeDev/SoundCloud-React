import type { Song, Playlist, Artist, User } from '../types';

export const mockUser: User = {
  id: 'user-1',
  username: 'Usuário Mock',
  email: 'user@mock.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=user-mock',
  followers: 10,
  following: 20,
  playlists: [],
  likedSongs: [],
  likedPlaylists: [],
  likedArtists: [],
};

const artistTeto: Artist = {
  id: 'artist-1',
  name: 'Teto',
  avatarUrl: 'https://images.genius.com/f23c3d56a42767c75854899533e4b7b2.1000x1000x1.jpg',
  followers: 1500000,
  songs: [],
  playlists: [],
};

const artistMatue: Artist = {
  id: 'artist-2',
  name: 'Matuê',
  avatarUrl: 'https://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2022/12/matue-rapper.jpg',
  followers: 2000000,
  songs: [],
  playlists: [],
};

const artistWiu: Artist = {
  id: 'artist-3',
  name: 'WIU',
  avatarUrl: 'https://pbs.twimg.com/media/FpU_p9pXwAEVd1s.jpg',
  followers: 900000,
  songs: [],
  playlists: [],
};

export const mockArtists: Artist[] = [artistTeto, artistMatue, artistWiu];

export const mockSongs: Song[] = [
  {
    id: 'song-1',
    title: 'Fim de Semana no Rio',
    artist: artistTeto,
    coverUrl: 'https://images.genius.com/e2a8c39d8930e52f47a2fde697d29845.1000x1000x1.jpg',
    audioUrl: '',
    duration: 180,
    plays: 2500000,
    likes: 300000,
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 'song-2',
    title: 'Vampiro',
    artist: artistMatue,
    coverUrl: 'https://images.genius.com/b163a8c0e69b5c2c7f5d34a87feb7434.1000x1000x1.png',
    audioUrl: '',
    duration: 210,
    plays: 5000000,
    likes: 700000,
    createdAt: '2022-08-20T10:00:00Z',
  },
  {
    id: 'song-3',
    title: 'Coração de Gelo',
    artist: artistWiu,
    coverUrl: 'https://images.genius.com/8394625b59725f77872c035b80155b34.1000x1000x1.jpg',
    audioUrl: '',
    duration: 195,
    plays: 3200000,
    likes: 450000,
    createdAt: '2023-05-10T10:00:00Z',
  },
  {
    id: 'song-4',
    title: 'M4',
    artist: artistTeto,
    coverUrl: 'https://images.genius.com/a857053b1b655f41539265f464082269.1000x1000x1.jpg',
    audioUrl: '',
    duration: 160,
    plays: 4100000,
    likes: 600000,
    createdAt: '2021-03-12T10:00:00Z',
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: 'playlist-1',
    name: 'Trap Brasil',
    coverUrl: 'https://i.scdn.co/image/ab67706f000000021c3b11e2f75a74070a9b3d3d',
    owner: mockUser,
    songs: [mockSongs[0], mockSongs[1], mockSongs[3]],
    likes: 1200,
    createdAt: '2024-01-01T12:00:00Z',
  },
  {
    id: 'playlist-2',
    name: 'As Melhores de 2023',
    coverUrl: 'https://i.scdn.co/image/ab67706f00000002ec9d6090757519349646f254',
    owner: mockUser,
    songs: [mockSongs[0], mockSongs[2]],
    likes: 5000,
    createdAt: '2024-02-10T15:30:00Z',
  },
]; 