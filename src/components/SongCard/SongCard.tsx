import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import Card from '../ui/Card';
import FormTextField from '../form/FormTextField';
import type { SongCardProps } from './SongCard.types';

const SongCard = ({ song, index, onChange, onBlur, onDelete, errors }: SongCardProps) => {
  return (
    <Card noPadding sx={{ p: 2.5 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={song.coverUrl}
          variant="rounded"
          sx={{ width: 56, height: 56, borderRadius: '12px', bgcolor: '#EEF2FF', color: '#4F46E5' }}
        >
          <MusicNoteRoundedIcon />
        </Avatar>

        <Box flex={1} minWidth={0}>
          <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
            Song #{index + 1}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <FormTextField
              size="small"
              placeholder="Song title"
              value={song.title}
              onChange={(e) => onChange('title', e.target.value)}
              onBlur={() => onBlur?.('title')}
              error={errors?.title}
            />
            <FormTextField
              size="small"
              placeholder="Artist"
              value={song.artist}
              onChange={(e) => onChange('artist', e.target.value)}
              onBlur={() => onBlur?.('artist')}
              error={errors?.artist}
            />
          </Stack>
        </Box>

        <IconButton
          onClick={onDelete}
          aria-label="Delete song"
          sx={{
            color: '#EF4444',
            bgcolor: '#FEF2F2',
            '&:hover': { bgcolor: '#FEE2E2' },
          }}
        >
          <DeleteRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default SongCard;
