import React from "react";
import { ErrorBoundaryWrapper } from "./ErrorBoundaryStyle";
import Catch from "./FunctionErrorBoundary";
type Props = {
  children: React.ReactNode;
};
export const ErrorBoundary = Catch(function ErrorBoundary(
  props: Props,
  error?: Error
) {
  if (error) {
    return (
      <ErrorBoundaryWrapper>
        <h2>{error.message}</h2>
      </ErrorBoundaryWrapper>
    );
  } else {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
});
