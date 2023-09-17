import { useState, Dispatch, SetStateAction } from "react";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import useTheme from "@mui/material/styles/useTheme";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateFeedback } from "../hooks/useCreateFeedback";

enum FormStatus {
  dataEntry,
  successMessage,
  errorMessage,
}

export interface FeedbackyForm {
  feedback: string;
}

interface FeedbackyModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const FeedbackyModal = ({ open, setOpen }: FeedbackyModalProps) => {
  const [formStep, setFormStep] = useState(FormStatus.dataEntry);

  const { spacing, palette } = useTheme();

  const { createFeedback } = useCreateFeedback({
    onSuccess: () => {
      setFormStep(FormStatus.successMessage);
    },
    onError: () => {
      setFormStep(FormStatus.errorMessage);
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FeedbackyForm>({
    defaultValues: {
      feedback: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        feedback: yup
          .string()
          .trim()
          .required()
          .max(2000, "Maximum character limit for this field is 2000"),
      })
    ),
  });

  const handleCloseModal = () => {
    setFormStep(FormStatus.dataEntry);
    reset();
    setOpen(false);
  };

  return (
    <Dialog
      data-testid="feedbacky-modal"
      open={open}
      onClose={handleCloseModal}
      PaperProps={{
        sx: {
          marginX: { mobile: 4 },
          width: { mobile: "100%", desktop: "600px" },
        },
      }}
      fullWidth
    >
      <DialogTitle>
        <IconButton
          data-testid="modal-close-button"
          disabled={createFeedback.isLoading}
          sx={{ padding: 0 }}
          onClick={handleCloseModal}
        >
          <CloseIcon sx={{ fontSize: { mobile: "30px", desktop: "40px" } }} />
        </IconButton>
      </DialogTitle>
      <form
        onSubmit={handleSubmit((data) => {
          void createFeedback.mutate(data);
        })}
      >
        {formStep === FormStatus.dataEntry && (
          <>
            <DialogContent
              sx={{
                padding: {
                  mobile: spacing(0, 5, 5, 5),
                  desktop: spacing(0, 10, 5, 10),
                },
              }}
            >
              <Stack sx={{ gap: 2 }}>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: 800,
                    fontSize: { mobile: "24px", desktop: "30px" },
                  }}
                >
                  SEND YOUR FEEDBACK
                </Typography>
                <Controller
                  control={control}
                  name="feedback"
                  render={({ field }) => (
                    <FormControl error={!!errors.feedback} fullWidth>
                      <TextField
                        {...field}
                        disabled={createFeedback.isLoading}
                        error={!!errors.feedback}
                        name="feedback"
                        label="Feedback"
                        inputProps={{
                          "data-testid": "feedbacky-form-input",
                        }}
                        sx={{
                          "& [class*=notched]": {
                            borderColor: palette.grey[200],
                          },
                        }}
                        multiline
                        rows={8}
                      />
                      {!!errors.feedback && (
                        <FormHelperText>
                          {errors.feedback.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>
            </DialogContent>
            <DialogActions
              sx={{
                paddingX: { mobile: 3, desktop: 6 },
                paddingBottom: { mobile: 8, desktop: 15 },
              }}
            >
              <Button
                data-testid="feedbacky-form-button"
                type="submit"
                disabled={createFeedback.isLoading}
                fullWidth
                sx={{
                  backgroundColor: palette.primary.main,
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: palette.primary.light,
                  },
                  "&.Mui-disabled": {
                    color: "#fff",
                    opacity: 0.6,
                  },
                  textTransform: "capitalize",
                }}
              >
                {createFeedback.isLoading ? (
                  <CircularProgress
                    data-testid="circular-progress-icon"
                    color="inherit"
                    size={26}
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogActions>
          </>
        )}
        {[FormStatus.successMessage, FormStatus.errorMessage].findIndex(
          (status) => status === formStep
        ) > -1 && (
          <Box
            sx={{
              margin: {
                mobile: spacing(18.5, 5, 30, 5),
                desktop: spacing(26, 10, 40, 10),
              },
            }}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
                textAlign: "center",
                fontWeight: 800,
                fontSize: { mobile: "30px", desktop: "36px" },
                color:
                  FormStatus.successMessage === formStep
                    ? palette.success.main
                    : palette.error.main,
              }}
            >
              {FormStatus.successMessage === formStep
                ? "WE HAVE GOT YOUR FEEDBACK"
                : "SOMETHING WENT WRONG"}
            </Typography>
          </Box>
        )}
      </form>
    </Dialog>
  );
};
