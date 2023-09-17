import { userEvent } from "@testing-library/user-event";
import { render, screen } from "../../../test/testUtils";
import { Feedbacky } from "./Feedbacky";

describe("Feedbacky", () => {
  it("should render the feedbacky button", () => {
    render(<Feedbacky />);

    expect(screen.getByTestId("feedbacky-button")).toBeInTheDocument();
  });

  it("should render the feedbacky modal when the feedbacky button is clicked", async () => {
    render(<Feedbacky />);

    userEvent.click(screen.getByTestId("feedbacky-button"));

    expect(await screen.findByTestId("feedbacky-modal")).toBeInTheDocument();
  });
});
