import { useRef, type ChangeEvent } from 'react';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import type { ProfileImageUploadProps } from './ProfileImageUpload.types';

const ProfileImageUpload = ({ imageUrl, onImageChange, size = 112 }: ProfileImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      onImageChange?.(null, null);
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    onImageChange?.(file, previewUrl);
  };

  return (
    <Stack alignItems="center" spacing={1.5}>
      <Box position="relative" width={size} height={size}>
        <Avatar
          src={imageUrl}
          sx={{
            width: size,
            height: size,
            bgcolor: '#EEF2FF',
            color: '#4F46E5',
          }}
        >
          <PersonRoundedIcon sx={{ fontSize: size * 0.5 }} />
        </Avatar>
        <IconButton
          onClick={() => inputRef.current?.click()}
          size="small"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            bgcolor: 'primary.main',
            color: '#fff',
            border: '3px solid #FFFFFF',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          <CameraAltRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileSelect}
        />
      </Box>
      <Typography variant="body2" color="text.secondary">
        Upload a profile picture
      </Typography>
    </Stack>
  );
};

export default ProfileImageUpload;
