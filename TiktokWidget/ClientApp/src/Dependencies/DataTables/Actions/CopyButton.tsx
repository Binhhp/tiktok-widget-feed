import { Icon } from "@shopify/polaris";
import { TickMinor } from "@shopify/polaris-icons";
import React, { useState, useEffect } from "react";
import { ButtonCopy, CopyButtonSuccessed } from "./ActionStyle";

interface CopyButtonProps {
  script: string;
}
function CopyButton(props: CopyButtonProps) {
  const [isCopy, setCopy] = useState(false);
  const onCopy = () => {
    setCopy(true);
    navigator.clipboard.writeText(props.script);
  };

  useEffect(() => {
    if (isCopy) {
      const timeout = setTimeout(() => setCopy(false), 4000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopy]);
  return isCopy ? (
    <CopyButtonSuccessed>
      <Icon source={TickMinor} color="success" />
    </CopyButtonSuccessed>
  ) : (
    <ButtonCopy onClick={onCopy}>Cick to copy</ButtonCopy>
  );
}
export default React.memo(CopyButton);
