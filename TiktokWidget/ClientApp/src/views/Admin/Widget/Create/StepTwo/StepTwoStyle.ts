import styled from "styled-components";

export class ProfileItem {
  public static item1: number = 45;
}

export const StepTwoMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const TemplateMajor = styled.div`
  width: ${ProfileItem.item1}%;
  padding-top: 40px;
  padding-left: 30px;
  background: #fafafa;
  position: sticky;
`;

export const TitleTemplateMajor = styled.h2`
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  color: #000000;
  width: 100%;
  margin-bottom: 25px;
`;

//Hashtag

export const HashtagWrapper = styled.div`
  position: relative;
  background: #63d1db;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 200px;
  padding: 7px 10px;
  margin-bottom: 40px;
  border-radius: 3px;
  span {
    margin: 0px;
  }
  h2 {
    margin-left: 15px;
    font-size: 17px;
    font-weight: 600;
  }
`;

export const IconTikTok = styled.div`
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  background-color: #ffffff;
  z-index: 1;
  border-radius: 5px;
`;
