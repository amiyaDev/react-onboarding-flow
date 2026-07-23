import { Avatar, Box, IconButton, Stack, TextField, Typography } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import Card from '../ui/Card';
import type { SongCardProps } from './SongCard.types';

const SongCard = ({ song, index, onChange, onDelete }: SongCardProps) => {
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
            <TextField
              size="small"
              fullWidth
              placeholder="Song title"
              value={song.title}
              onChange={(e) => onChange(song.id, 'title', e.target.value)}
            />
            <TextField
              size="small"
              fullWidth
              placeholder="Artist"
              value={song.artist}
              onChange={(e) => onChange(song.id, 'artist', e.target.value)}
            />
          </Stack>
        </Box>

        <IconButton
          onClick={() => onDelete(song.id)}
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
