import React, { useState } from "react";

export interface IButtonWidgetContext {
  state: string;
  OnSetState: (payload: string) => void;
}
export const ButtonWidgetContext = React.createContext<IButtonWidgetContext>({
  OnSetState: () => {},
  state: "",
});

function ButtonWidgetContextProvider({ children }: any) {
  const [state, setState] = useState<string>("");

  const OnSetState = (payload: string): void => {
    setState(payload);
  };
  return (
    <ButtonWidgetContext.Provider
      value={{
        state,
        OnSetState,
      }}
    >
      {children}
    </ButtonWidgetContext.Provider>
  );
}

export default ButtonWidgetContextProvider;
