import React from 'react';
import { FeedbackBox } from '../SidebarStyle';
import GoodIcon from 'assets/images/Buttons/good-icon.png';
import SadIcon from 'assets/images/Buttons/sad-icon.png';
import { TextField, Modal, TextContainer } from '@shopify/polaris';

const FeedBack = () => {
  const [active, setActive] = React.useState(false);
  const [feedbackText, setFieldText] = React.useState<string>('');
  const handleChange = React.useCallback(() => {
    setFieldText('');
    setActive(!active);
  }, [active]);
  const handleOnClickGood = () => {
    // console.log('good');
    // console.log(feedbackText);
    // handleChange();
  };
  const handleSubmitBad = () => {
    console.log(feedbackText);
    handleChange();
  };
  const handleOnClickBad = () => {
    setActive(true);
  };
  return (
    <FeedbackBox>
      <p className='text'>
        How's your experience with us? Your feedback means the world to us!
      </p>
      <div className='reaction'>
        <button className='reaction-btn' onClick={handleOnClickBad}>
          <img src={SadIcon} alt='reaction good' />
          Bad
        </button>
        <button className='reaction-btn' onClick={handleOnClickGood}>
          <img src={GoodIcon} alt='reaction good' />
          Good
        </button>
      </div>
      <Modal
        open={active}
        onClose={handleChange}
        title='What we could have done better?'
        primaryAction={{
          content: 'Send',
          onAction: handleSubmitBad,
        }}
        secondaryActions={[
          {
            content: `I'll leave later`,
            onAction: handleChange,
          },
        ]}>
        <Modal.Section>
          <TextContainer>
            <p>
              We'll make sure that our team take every feedback into
              consideration to provide you a better app everytime you visit!
            </p>

            <TextField
              label=''
              value={feedbackText}
              onChange={setFieldText}
              multiline={4}
              autoComplete='off'
            />
          </TextContainer>
        </Modal.Section>
      </Modal>
    </FeedbackBox>
  );
};

export default FeedBack;
