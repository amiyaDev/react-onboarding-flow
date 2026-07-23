import { Box, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import OnboardingLayout from '../../../layouts/OnboardingLayout';
import SongCard from '../../../components/SongCard';
import Button from '../../../components/ui/Button';
import { ONBOARDING_STEPS } from '../onboardingSteps';
import type { Step2Props } from './Step2.types';

const Step2 = ({ songs, onSongChange, onAddSong, onDeleteSong, onNext, onPrevious }: Step2Props) => {
  return (
    <OnboardingLayout
      steps={ONBOARDING_STEPS}
      activeStep={1}
      title="Favorite Songs"
      subtitle="Add a few songs you love — we'll use these to personalize your experience."
      onPrevious={onPrevious}
      onNext={onNext}
    >
      <Stack spacing={2}>
        {songs.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
              border: '1px dashed #E2E8F0',
              borderRadius: '12px',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No songs added yet. Add your first favorite song below.
            </Typography>
          </Box>
        )}

        {songs.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            index={index}
            onChange={onSongChange}
            onDelete={onDeleteSong}
          />
        ))}

        <Button
          variantKind="secondary"
          onClick={onAddSong}
          startIcon={<AddRoundedIcon />}
          sx={{ alignSelf: 'flex-start' }}
        >
          Add Song
        </Button>
      </Stack>
    </OnboardingLayout>
  );
};

export default Step2;
