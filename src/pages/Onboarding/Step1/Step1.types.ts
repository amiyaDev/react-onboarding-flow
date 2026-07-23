import type { PersonalProfileData } from '../../../types/onboarding.types';

export interface Step1Props {
  data: PersonalProfileData;
  onChange: (field: keyof PersonalProfileData, value: string) => void;
  onImageChange?: (file: File | null, previewUrl: string | null) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean;
}
