export interface ProfileImageUploadProps {
  imageUrl?: string;
  onImageChange?: (file: File | null, previewUrl: string | null) => void;
  size?: number;
}
