import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import nock from "nock";
import { useCreateFeedback } from "./useCreateFeedback";
import { ReactQueryWrapper } from "../../../test/ReactQueryWrapper";

describe("Feedbacky", () => {
  it("should call onSuccess function if it is successful", async () => {
    const onSuccess = vitest.fn();

    const { result, waitFor } = renderHook(
      () => useCreateFeedback({ onSuccess: () => onSuccess() }),
      {
        wrapper: ReactQueryWrapper,
      }
    );

    nock("https://v1.nocodeapi.com")
      .post(`/feedbackyalavanda/google_sheets/HGRnjREveuRLVNod?tabId=Sheet1`)
      .reply(200, {});

    act(() => {
      result.current.createFeedback.mutate({
        feedback: "test",
      });
    });

    await waitFor(() => {
      return result.current.createFeedback.isSuccess;
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("should call onError function if an error accured", async () => {
    const onError = vitest.fn();

    const { result, waitFor } = renderHook(
      () => useCreateFeedback({ onError: () => onError() }),
      {
        wrapper: ReactQueryWrapper,
      }
    );

    nock("https://v1.nocodeapi.com")
      .post(`/feedbackyalavanda/google_sheets/HGRnjREveuRLVNod?tabId=Sheet1`)
      .reply(400);

    act(() => {
      result.current.createFeedback.mutate({
        feedback: "test",
      });
    });

    await waitFor(() => {
      return result.current.createFeedback.isError;
    });

    // Make sure the request status resolved to true
    expect(onError).toHaveBeenCalledTimes(1);
  });
});
