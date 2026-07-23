import type { Song } from '../../../types/onboarding.types';

export interface Step2Props {
  songs: Song[];
  onSongChange: (id: string, field: keyof Omit<Song, 'id'>, value: string) => void;
  onAddSong: () => void;
  onDeleteSong: (id: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}
