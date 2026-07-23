import type { Song } from '../../types/onboarding.types';

export interface SongCardProps {
  song: Song;
  index: number;
  onChange: (field: keyof Omit<Song, 'id'>, value: string) => void;
  onBlur?: (field: keyof Omit<Song, 'id'>) => void;
  onDelete: () => void;
  errors?: Partial<Record<keyof Omit<Song, 'id'>, string>>;
}
