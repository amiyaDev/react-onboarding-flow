import { Box, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useFormik, FieldArray, FormikProvider, type FormikErrors, type FieldArrayRenderProps } from 'formik';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import OnboardingLayout from '../../../layouts/OnboardingLayout';
import SongCard from '../../../components/SongCard';
import Button from '../../../components/ui/Button';
import ConfirmDialog from '../../../components/ui/ConfirmDialog/ConfirmDialog';
import { ONBOARDING_STEPS } from '../onboardingSteps';
import type { Step2Props } from './Step2.types';
import type { Song } from '../../../types/onboarding.types';

const createEmptySong = (): Song => ({ id: crypto.randomUUID(), title: '', artist: '' });

const songsValidationSchema = Yup.object().shape({
  songs: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required('Song title is required'),
        artist: Yup.string(),
      }),
    )
    .min(1, 'Add at least one favorite song'),
});

const Step2 = ({ songs, onSubmit, onPrevious }: Step2Props) => {
  const formik = useFormik<{ songs: Song[] }>({
    initialValues: {
      songs: songs.length > 0 ? songs : [createEmptySong()],
    },
    validationSchema: songsValidationSchema,
    onSubmit: (values) => {
      onSubmit(values.songs);
    },
  });

  const songErrors = formik.errors.songs;
  const songTouched = formik.touched.songs;
  const listLevelError = typeof songErrors === 'string' ? songErrors : undefined;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const arrayHelpersRef = useRef<FieldArrayRenderProps>(null);

  return (
    <FormikProvider value={formik}>
      <OnboardingLayout
        steps={ONBOARDING_STEPS}
        activeStep={1}
        title="Favorite Songs"
        subtitle="Add a few songs you love — we'll use these to personalize your experience."
        onPrevious={onPrevious}
        onNext={() => formik.handleSubmit()}
      >
        <FieldArray name="songs">
          {(arrayHelpers) => {
            arrayHelpersRef.current = arrayHelpers;
            return (
              <Stack spacing={2}>
              {formik.values.songs.length === 0 && (
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

                {formik.values.songs.map((song, index) => {
                const rawEntryError = Array.isArray(songErrors) ? songErrors[index] : undefined;
                const entryErrors: FormikErrors<Song> | undefined =
                  typeof rawEntryError === 'string' ? undefined : rawEntryError;
                const entryTouched = Array.isArray(songTouched) ? songTouched[index] : undefined;

                  return (
                    <SongCard
                      key={song.id}
                      song={song}
                      index={index}
                      onChange={(field, value) => formik.setFieldValue(`songs.${index}.${field}`, value)}
                      onBlur={(field) => formik.setFieldTouched(`songs.${index}.${field}`, true)}
                      onDelete={() => {
                        setDeletingIndex(index);
                        setDeleteOpen(true);
                      }}
                      errors={{
                        title: entryTouched?.title ? entryErrors?.title : undefined,
                        artist: entryTouched?.artist ? entryErrors?.artist : undefined,
                      }}
                    />
                  );
                })}

              {listLevelError && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {listLevelError}
                </Typography>
              )}

              <Button
                variantKind="secondary"
                onClick={() => arrayHelpers.push(createEmptySong())}
                startIcon={<AddRoundedIcon />}
                sx={{ alignSelf: 'flex-start' }}
              >
                Add Song
              </Button>
              </Stack>
            );
          }}
        </FieldArray>

        <ConfirmDialog
          open={deleteOpen}
          title="Delete song"
          description="Are you sure you want to delete this song?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={() => {
            if (deletingIndex !== null && arrayHelpersRef.current) {
              arrayHelpersRef.current.remove(deletingIndex);
            }
            setDeleteOpen(false);
            setDeletingIndex(null);
          }}
          onClose={() => {
            setDeleteOpen(false);
            setDeletingIndex(null);
          }}
        />
      </OnboardingLayout>
    </FormikProvider>
  );
};

export default Step2;
