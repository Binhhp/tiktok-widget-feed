import React, { useState, useCallback, useEffect } from "react";
import { ImportVideoWrapper } from "../TabStyled";
import tiktok from "../../../Icons/tiktok.png";
import instagram from "../../../Icons/instagram.png";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { Form, FormLayout, TextField } from "@shopify/polaris";
import { WidgetActionTS } from "stores/Admin/TiktokWidget/action";
import { ErrorMessage } from "common/constants/Validator";
import { ValidatorProvider } from "common/constants/Validator";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import config from "config";
import { TabProps, WidgetType } from "../../../OnBoardingModel";
import InstagramVideoPreview from "Dependencies/InstagramLayout/VideoManager";
import TIktokVideoPreview from "Dependencies/TikTokLayout/VideoManager";
function ImportVideoController(props: TabProps) {
  const tiktokReducer = useSelector(
    (state: RootReducer) => state.TiktokWidgetReducer
  );
  const instagramReducer = useSelector(
    (state: RootReducer) => state.InstagramWidgetReducer
  );

  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");

  const [activeModal, setActiveModal] = useState(false);
  const onSaveChanges = useCallback(
    (videoUnchecked: string[], itemSorted: string[]) => {
      onCloseModal();
      if (videoUnchecked && videoUnchecked.length > 0)
        props.setVideoUnChecked(videoUnchecked);
      if (itemSorted && itemSorted.length > 0) props.setVideoSorted(itemSorted);
      props.onNext();
    },
    [activeModal, props.setVideoSorted, props.setVideoUnChecked, props.onNext]
  );

  const onCloseModal = () => {
    setActiveModal(!activeModal);
  };
  const onSubmit = useCallback(
    (type: WidgetType): boolean => {
      if (!activeModal) {
        if (type === WidgetType.Tiktok) {
          if (validateValueSource(tiktokReducer.settings.valueSource, type))
            return false;
        } else if (type === WidgetType.Instagram) {
          if (validateValueSource(instagramReducer.settings.valueSource, type))
            return false;
        }
        if (error) return false;
        setActiveModal(true);
        return false;
      }
      return true;
    },
    [activeModal, props.widgetType]
  );

  useEffect(() => {
    setError("");
  }, [props.widgetType]);

  useEffect(() => {
    if (props.setActionFunc) props.setActionFunc(onSubmit);
  }, [activeModal]);

  const validateValueSource = (
    val?: string,
    type: WidgetType = WidgetType.Tiktok
  ): boolean => {
    let err = error;
    if (val === "") {
      err = ErrorMessage.REQUIREMENTS.format(
        type === 0 ? "Tiktok username" : "Instagram username"
      );
    } else if (!ValidatorProvider.UserName(val)) {
      err = ErrorMessage.WIDGET_USERNAME;
    } else err = "";
    setError(err);
    return err !== "";
  };

  const onChangeUsername = (val: string) => {
    if (props.widgetType === WidgetType.Tiktok) {
      dispatch(
        WidgetActionTS.OnSetSetting({
          source: 1,
          valueSource: val,
        })
      );
    } else {
      dispatch(
        InstagramWidgetActionTS.OnSetSetting({
          source: 1,
          valueSource: val,
        })
      );
    }
    validateValueSource(val, props.widgetType);
  };

  const renderFormTikTok = (
    <Form noValidate onSubmit={() => {}}>
      <FormLayout>
        <TextField
          name="title"
          id="title"
          label={
            <div className="input-header">
              <span>
                Enter a {props.widgetType === 0 ? "Tiktok" : "Instagram"}{" "}
                Username
              </span>
              <a
                href={
                  props.widgetType === WidgetType.Tiktok
                    ? config.ONBOARDING.LinkHelperTiktok
                    : config.ONBOARDING.LinkHelperInstagram
                }
                target="_blank"
                rel="noreferrer"
              >
                Where I can find it?
              </a>
            </div>
          }
          value={
            props.widgetType === 0
              ? tiktokReducer.settings.valueSource
              : instagramReducer.settings.valueSource
          }
          helpText={
            <span className="helptext">Do not include the “@” symbol</span>
          }
          onChange={onChangeUsername}
          placeholder="@ Orichi"
          autoComplete="off"
          error={error}
        />
      </FormLayout>
    </Form>
  );

  return (
    <ImportVideoWrapper>
      <div className="header">
        <h2>How would you like to a video?</h2>
      </div>
      <div className="content">
        <div className="item import-type">
          <div
            className={
              props.widgetType === 0
                ? `import-video-type active`
                : `import-video-type`
            }
            onClick={props.setWidgetType(WidgetType.Tiktok)}
          >
            <img src={tiktok} alt="Import the Tiktok Video"></img>
            <span>Import the Tiktok Video</span>
          </div>
          <div
            className={
              props.widgetType === 1
                ? `import-video-type active`
                : `import-video-type`
            }
            onClick={props.setWidgetType(WidgetType.Instagram)}
          >
            <img src={instagram} alt="Import the Instagram Post"></img>
            <span>Import the Instagram Post</span>
          </div>
        </div>
        <div className="item form-user">{renderFormTikTok}</div>
      </div>
      {props.widgetType === WidgetType.Instagram ? (
        <InstagramVideoPreview
          onCloseModal={onCloseModal}
          videoUncheckedDefault={props.videoUnchecked}
          active={activeModal}
          onSaveChanges={onSaveChanges}
          optionsShowItem={{
            sourceType: "InstagramUserName",
          }}
        />
      ) : (
        <TIktokVideoPreview
          onCloseModal={onCloseModal}
          videoUncheckedDefault={props.videoUnchecked}
          active={activeModal}
          onSaveChanges={onSaveChanges}
          optionsShowItem={{ sourceType: "UserName" }}
        />
      )}
    </ImportVideoWrapper>
  );
}

export default ImportVideoController;
