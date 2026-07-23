import type { Song } from '../../types/onboarding.types';

export interface SongCardProps {
  song: Song;
  index: number;
  onChange: (id: string, field: keyof Omit<Song, 'id'>, value: string) => void;
  onDelete: (id: string) => void;
}
