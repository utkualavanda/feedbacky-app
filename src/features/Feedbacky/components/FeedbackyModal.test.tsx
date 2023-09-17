import nock from "nock";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "../../../test/testUtils";
import { FeedbackyModal } from "./FeedbackyModal";

describe("FeedbackyModal", () => {
  it("should render the modal", () => {
    const setOpen = vitest.fn();
    render(<FeedbackyModal open={true} setOpen={setOpen} />);

    expect(screen.getByTestId("feedbacky-modal")).toBeInTheDocument();
  });

  it("should not render the modal", () => {
    const setOpen = vitest.fn();
    render(<FeedbackyModal open={false} setOpen={setOpen} />);

    expect(screen.queryByTestId("feedbacky-modal")).not.toBeInTheDocument();
  });

  it("should render the feedbacky input", () => {
    const setOpen = vitest.fn();
    render(<FeedbackyModal open={true} setOpen={setOpen} />);

    expect(
      screen.getByTestId("feedbacky-modal-form-input")
    ).toBeInTheDocument();
  });

  it("should show a progress icon when sending the feedback", async () => {
    const setOpen = vitest.fn();

    render(<FeedbackyModal open={true} setOpen={setOpen} />);

    await userEvent.type(
      screen.getByTestId("feedbacky-modal-form-input"),
      "test feedback"
    );

    await userEvent.click(screen.getByTestId("feedbacky-modal-form-button"));

    expect(
      await screen.findByTestId("circular-progress-icon")
    ).toBeInTheDocument();
  });

  it("should disable the button when sending the feedback", async () => {
    const setOpen = vitest.fn();

    render(<FeedbackyModal open={true} setOpen={setOpen} />);

    await userEvent.type(
      screen.getByTestId("feedbacky-modal-form-input"),
      "test feedback"
    );

    await userEvent.click(screen.getByTestId("feedbacky-modal-form-button"));

    expect(await screen.findByTestId("feedbacky-modal-form-button")).toBeDisabled();
  });

  it("should show the success message if the feedback is successfully created", async () => {
    const setOpen = vitest.fn();

    render(<FeedbackyModal open={true} setOpen={setOpen} />);

    await userEvent.type(
      screen.getByTestId("feedbacky-modal-form-input"),
      "test feedback"
    );

    nock("https://v1.nocodeapi.com")
      .post(`/feedbackyproject/google_sheets/coESHZWOyTWQHyTv?tabId=Sheet1`)
      .reply(200, {});

    await userEvent.click(screen.getByTestId("feedbacky-modal-form-button"));

    expect(
      await screen.findByText("WE HAVE GOT YOUR FEEDBACK")
    ).toBeInTheDocument();
  });

  it("should show the error message if the feedback is not successfully created", async () => {
    const setOpen = vitest.fn();

    render(<FeedbackyModal open={true} setOpen={setOpen} />);

    await userEvent.type(
      screen.getByTestId("feedbacky-modal-form-input"),
      "test feedback"
    );

    nock("https://v1.nocodeapi.com")
      .post(`/feedbackyproject/google_sheets/coESHZWOyTWQHyTv?tabId=Sheet1`)
      .reply(400);

    await userEvent.click(screen.getByTestId("feedbacky-modal-form-button"));

    expect(await screen.findByText("SOMETHING WENT WRONG")).toBeInTheDocument();
  });

  it("should show error message if user enters more than 2000 characters", async () => {
    const setOpen = vitest.fn();

    render(<FeedbackyModal open={true} setOpen={setOpen} />);

    await userEvent.click(screen.getByTestId("feedbacky-modal-form-button"));

    expect(
      screen.getByText("feedback is a required field")
    ).toBeInTheDocument();
  });

  it("should should clean up the form state when the modal is closed", async () => {
    const setOpen = vitest.fn();

    render(<FeedbackyModal open={true} setOpen={setOpen} />);

    const input = screen.getByTestId("feedbacky-modal-form-input");

    await userEvent.type(input, "test feedback");

    expect(input).toHaveValue("test feedback");

    await userEvent.click(screen.getByTestId("feedbacky-modal-close-button"));

    expect(input).toHaveValue("");
  });
});
