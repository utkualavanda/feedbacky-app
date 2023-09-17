import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import RateReviewIcon from "@mui/icons-material/RateReviewOutlined";
import { useState } from "react";
import { FeedbackyModal } from "../components/FeedbackyModal";

export const Feedbacky = () => {
  const [feedbackyModalOpen, setFeedbackyModalOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
        }}
      >
        <IconButton
          data-testid="feedbacky-button"
          sx={{ padding: 0 }}
          onClick={() => {
            setFeedbackyModalOpen(true);
          }}
        >
          <RateReviewIcon
            sx={{ fontSize: { mobile: "50px", desktop: "60px" } }}
          />
        </IconButton>
      </Box>

      {feedbackyModalOpen && (
        <FeedbackyModal
          open={feedbackyModalOpen}
          setOpen={setFeedbackyModalOpen}
        />
      )}
    </>
  );
};
