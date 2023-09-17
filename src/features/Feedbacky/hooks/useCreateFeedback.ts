import { useMutation } from "@tanstack/react-query";
import { type FeedbackyForm } from "../components/FeedbackyModal";
import axios from "axios";

interface HookProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useCreateFeedback = ({ onError, onSuccess }: HookProps = {}) => {
  const createFeedback = useMutation({
    mutationFn: ({ feedback }: FeedbackyForm) =>
      axios.post(
        "https://v1.nocodeapi.com/feedbackyproject/google_sheets/coESHZWOyTWQHyTv?tabId=Sheet1",
        [[feedback]]
      ),
    onError: () => {
      onError?.();
    },
    onSuccess: () => {
      onSuccess?.();
    },
  });

  return { createFeedback };
};
