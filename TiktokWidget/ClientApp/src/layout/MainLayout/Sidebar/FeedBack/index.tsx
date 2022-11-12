import React, { useState } from "react";
import { FeedbackBox } from "../SidebarStyle";
import GoodIcon from "assets/images/Buttons/good-icon.png";
import SadIcon from "assets/images/Buttons/sad-icon.png";
import { TextField, Modal, TextContainer } from "@shopify/polaris";
import { InstagramReponsitory } from "repositories/implements/InstagramReponsitory";
import {
  FeedbackStatus,
  ShopDescriptor,
} from "repositories/dtos/responses/BaseShop";
import { toastNotify } from "Dependencies/Toast";
import { useDispatch, useSelector } from "react-redux";
import { ShopActionTS } from "stores/Admin/Shop/action";
import { DivImageThank, FeedbackWrapper } from "./Feedback";
import { ImageStorage } from "assets/images/ImageStorage";
import { RootReducer } from "stores/Admin/reducers";
import config from "config";

const FeedBack = () => {
  const [error, setError] = useState<string>("");
  const [active, setActive] = React.useState(false);
  const [feedbackText, setFieldText] = React.useState<string>("");

  const [status, setStatus] = useState<"Loading" | "Complete" | undefined>(
    undefined
  );
  const onChangeFieldText = (val: string) => {
    if (!val) {
      setError("Feedback comment is required.");
    } else {
      setError("");
    }
    setFieldText(val);
  };
  const dispatch = useDispatch();
  const handleChange = React.useCallback(() => {
    setActive(!active);
    setError("");
  }, [active]);

  const shopReducer = useSelector((state: RootReducer) => state.ShopReducer);

  const handleOnClickGood = () => {
    if (shopReducer?.shop?.domain) {
      return toastNotify
        .promise(
          new InstagramReponsitory().PostFeedback(shopReducer.shop.domain, {
            Status: FeedbackStatus.Good,
          }),
          {
            loading: "Feeding back for us!",
            success: (data: any) => "Feedback success",
          }
        )
        .then((res) => {
          if (res.Status) {
            dispatch(ShopActionTS.OnSetDescriptor(res.Data as ShopDescriptor));
            window.open(config.urlInstallTikTok);
          }
        });
    }
    return;
  };

  const handleSubmitBad = () => {
    if (status === "Complete") return setActive(false);
    setStatus("Loading");
    if (!feedbackText) {
      setError("Feedback comment is required.");
      return setStatus(undefined);
    }
    if (shopReducer?.shop?.domain) {
      new InstagramReponsitory()
        .PostFeedback(shopReducer.shop.domain, {
          Status: FeedbackStatus.Bad,
          Feedback: feedbackText,
        })
        .then((res) => {
          if (res.Status) {
            setStatus("Complete");
            dispatch(ShopActionTS.OnSetDescriptor(res.Data as ShopDescriptor));
          }
        });
    }
  };
  const handleOnClickBad = () => setActive(true);

  return (
    <>
      {(shopReducer?.shop?.shopDescriptor?.feedbackStatus === null ||
        !shopReducer?.shop?.shopDescriptor) && (
        <FeedbackBox>
          <p className="text">
            How's your experience with us? Your feedback means the world to us!
          </p>
          <div className="reaction">
            <button className="reaction-btn" onClick={handleOnClickBad}>
              <img src={SadIcon} alt="reaction good" />
              Bad
            </button>
            <button className="reaction-btn" onClick={handleOnClickGood}>
              <img src={GoodIcon} alt="reaction good" />
              Good
            </button>
          </div>
        </FeedbackBox>
      )}
      <Modal
        noScroll
        iFrameName="model"
        open={active}
        onClose={handleChange}
        title={!status ? "What we could have done better?" : ""}
        primaryAction={{
          content: status === "Complete" ? "Close" : "Send",
          id: "feedback-submit",
          loading: status === "Loading",
          onAction: handleSubmitBad,
        }}
        secondaryActions={
          status === "Complete"
            ? []
            : [
                {
                  id: "leave",
                  content: `I'll leave later`,
                  onAction: handleChange,
                },
              ]
        }
      >
        <Modal.Section>
          <FeedbackWrapper>
            {status === "Complete" ? (
              <>
                <DivImageThank>
                  <img
                    src={ImageStorage.Feedback}
                    alt="Thank for your feedback"
                  />
                </DivImageThank>

                <p className="text-confirm">
                  Your feedback is very important to us.
                  <br />
                  Our team will look at yours
                </p>
              </>
            ) : (
              <TextContainer>
                <p>
                  We'll make sure that our team take every feedback into
                  consideration to provide you a better app everytime you visit!
                </p>
                <TextField
                  label=""
                  value={feedbackText}
                  onChange={onChangeFieldText}
                  multiline={4}
                  autoComplete="off"
                  error={error}
                />
              </TextContainer>
            )}
          </FeedbackWrapper>
        </Modal.Section>
      </Modal>
    </>
  );
};

export default FeedBack;
