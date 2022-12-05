import { UriProvider } from "common/functions/FuncUtils";
import { toastNotify } from "Dependencies/Toast";
import { useQuery } from "hooks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddJobRequest } from "repositories/dtos/requests/AddJobRequest";
import { SourceTypeEnum } from "repositories/dtos/requests/GetVideoByJobRequest";
import { BaseInstagramWidget } from "repositories/dtos/responses/BaseInstagramWidget";
import InstagramWidgetAPI from "repositories/implements/InstagramWidgetAPI";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { InstagramWidget } from "stores/Admin/InstagramWidget/state";
import { RootReducer } from "stores/Admin/reducers";
import { FlexboxDiv } from "../CreateWidgetStyle";
import InstagramCreateHOC from "../InstagramCreateHOC";
import MediaCardGuides from "../MediaCardGuides";
import FormConfig from "./FormConfig";

function Step1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const widgetId = useQuery().get("key");

  useEffect(() => {
    dispatch(InstagramWidgetActionTS.OnStep(1));
  }, []);

  const widgetReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );
  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);
    dispatch(InstagramWidgetActionTS.OnStep(2));
    const sourceType = widgetReducer.settings.source ?? 0;
    if (widgetReducer.settings.valueSource) {
      const res = await InstagramWidgetAPI.AddJob(
        shopReducer.shop.domain,
        new AddJobRequest(
          widgetReducer.settings.valueSource,
          sourceType === 0
            ? SourceTypeEnum.InstagramHashTag
            : SourceTypeEnum.InstagramUserName
        )
      );
      if (res.Status) {
        dispatch(
          InstagramWidgetActionTS.OnSetSetting({
            title: widgetReducer.settings.title,
            valueSource: widgetReducer.settings.valueSource,
            source: sourceType,
          })
        );
        navigate(UriProvider.KeepParameters(`/instagram-step-2`));
      } else {
        toastNotify.error({
          message: `${res.Error}`,
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (widgetId) {
      getDetailWidget(widgetId);
    }
  }, []);

  const getDetailWidget = (key: string) => {
    return InstagramWidgetAPI.GetById(key).then((res) => {
      if (res?.Status) {
        const result = res.Data as BaseInstagramWidget;
        const dto = new InstagramWidget(result).ToDto();
        dispatch(InstagramWidgetActionTS.OnSetSetting(dto));
      }
    });
  };

  return (
    <InstagramCreateHOC>
      <FlexboxDiv>
        <FormConfig loading={loading} onSubmit={onSubmit}></FormConfig>
        <MediaCardGuides></MediaCardGuides>
      </FlexboxDiv>
    </InstagramCreateHOC>
  );
}

export default Step1;
