import type { Song } from '../../../types/onboarding.types';

export interface Step2Props {
  songs: Song[];
  onSubmit: (songs: Song[]) => void;
  onPrevious?: () => void;
}
