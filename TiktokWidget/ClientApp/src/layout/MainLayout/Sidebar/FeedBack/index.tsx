import React from "react";
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
import { useDispatch } from "react-redux";
import { ShopActionTS } from "stores/Admin/Shop/action";

interface FeedbackProps {
  domain?: string;
}
const FeedBack = (props: FeedbackProps) => {
  const [active, setActive] = React.useState(false);
  const [feedbackText, setFieldText] = React.useState<string>("");

  const dispatch = useDispatch();
  const handleChange = React.useCallback(() => {
    setActive(!active);
  }, [active]);
  const handleOnClickGood = () => {
    if (props.domain) {
      return toastNotify
        .promise(
          new InstagramReponsitory().PostFeedback(props.domain, {
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
          }
        });
    }
    return;
  };
  const handleSubmitBad = () => {
    handleChange();
    if (props.domain) {
      return toastNotify
        .promise(
          new InstagramReponsitory().PostFeedback(props.domain, {
            Status: FeedbackStatus.Bad,
            Feedback: feedbackText,
          }),
          {
            loading: "Feeding back for us!",
            success: (data: any) => "Feedback success",
          }
        )
        .then((res) => {
          if (res.Status) {
            setFieldText("");
            dispatch(ShopActionTS.OnSetDescriptor(res.Data as ShopDescriptor));
          }
        });
    }
  };
  const handleOnClickBad = () => {
    setActive(true);
  };
  return (
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
      <Modal
        open={active}
        onClose={handleChange}
        title="What we could have done better?"
        primaryAction={{
          content: "Send",
          id: "feedback-submit",
          onAction: handleSubmitBad,
        }}
        secondaryActions={[
          {
            content: `I'll leave later`,
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              We'll make sure that our team take every feedback into
              consideration to provide you a better app everytime you visit!
            </p>
            <TextField
              label=""
              value={feedbackText}
              onChange={setFieldText}
              multiline={4}
              autoComplete="off"
            />
          </TextContainer>
        </Modal.Section>
      </Modal>
    </FeedbackBox>
  );
};

export default FeedBack;
