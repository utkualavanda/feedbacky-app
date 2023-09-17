import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { LazyLoginPage } from "../features/Home/pages/LazyHomePage";

export const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={"loading"}>
        <LazyLoginPage />
      </Suspense>
    ),
    path: "/",
    errorElement: "error text",
  },
]);
