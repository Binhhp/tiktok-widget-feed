import React, { useEffect } from "react";
import { TestAppControllerWrapper } from "../TabStyled";
import Completed from "../../../Icons/complete-onboarding.png";
import config from "config";
import { TabProps } from "../../../OnBoardingModel";
import { ChatPlugin } from "common/functions/ChatPlugin";

function TestAppController(props: TabProps) {
  const onSubmit = () => true;
  useEffect(() => {
    props.setActionFunc(onSubmit);
  }, []);
  return (
    <TestAppControllerWrapper>
      <div className="almost-done">
        <img src={Completed} alt="Almost done" />
        <h2>Almost Done!</h2>
      </div>
      <p>
        Please go to the store and make sure that your first widget meets your
        expectations
        <br />
        <br />
        If not, don't be concerned! You can send us a support request{" "}
        <a
          href="#! onClick={e => e.preventDefault()}"
          rel="noreferrer"
          onClick={() => ChatPlugin.Open()}
        >
          here
        </a>
        , <br />
        and we will respond as soon as possible.
      </p>
    </TestAppControllerWrapper>
  );
}

export default React.memo(TestAppController);
