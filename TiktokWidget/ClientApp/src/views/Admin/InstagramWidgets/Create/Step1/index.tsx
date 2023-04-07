import { UriProvider } from "common/functions/FuncUtils";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { FlexboxDiv } from "../CreateWidgetStyle";
import InstagramCreateHOC from "../InstagramCreateHOC";
import MediaCardGuides from "../MediaCardGuides";
import FormConfig from "./FormConfig";

function Step1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(InstagramWidgetActionTS.OnStep(1));
  }, []);

  const onSubmit = async () => {
    dispatch(InstagramWidgetActionTS.OnStep(2));
    navigate(UriProvider.KeepParameters(`/instagram-step-2`));
  };

  return (
    <InstagramCreateHOC>
      <FlexboxDiv>
        <FormConfig onSubmit={onSubmit}></FormConfig>
        <MediaCardGuides></MediaCardGuides>
      </FlexboxDiv>
    </InstagramCreateHOC>
  );
}

export default Step1;
