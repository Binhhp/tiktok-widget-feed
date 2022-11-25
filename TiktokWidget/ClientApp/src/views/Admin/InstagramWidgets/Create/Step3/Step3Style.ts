import styled from "Dependencies/StyledComponents/Container";
import { Link } from "react-router-dom";

export const Step3Wrapper = styled("div")`
  width: 68%;
  padding: 20px;
  background: #ffffff;
`;

export const Step3Content = styled("div")`
  padding: 37px 20px 0px 20px;
  a {
    line-height: 19px;
    color: #000000;
    font-weight: 700;
    font-size: 19px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Step3DoneContent = styled("div")`
  padding: 37px 20px 0px 20px;
  display: flex;
  justify-content: space-between;
`;

export const Step3Caption = styled("div")`
  font-size: 20px;
  line-height: 23px;
  color: #202223;
  font-weight: 700;
`;

export const DivText = styled("p")`
  font-weight: 400;
  font-size: 19px;
  line-height: 21px;
  color: #000000;
  margin-bottom: 5px;
`;
export const DivTextDone = styled("p")`
  font-weight: 400;
  font-size: 19px;
  line-height: 33px;
  color: #000000;
  margin-bottom: 5px;
  width: 50%;
  padding-right: 8px;
`;
export const DivImage = styled("div")`
  width: 100%;
  margin-top: 30px;
  img {
    width: 100%;
    object-fit: contain;
    display: block;
  }
`;
export const DivImageDone = styled("div")`
  width: 50%;
  img {
    width: 100%;
    object-fit: contain;
    display: block;
  }
`;
export const DivLinkHelp = styled("div")`
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-decoration-line: underline;
  color: #000000;
  cursor: pointer;
  margin-top: 22px;
`;

interface IDivActionStep {
  mt?: number;
}
export const DivActionStep = styled("div")<IDivActionStep>`
  margin-top: ${(props) => props.mt ?? 20}px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const DivActionStepContent = styled("div")`
  margin-left: 10px;
  font-size: 15px;
  color: #6d7175;
  font-weight: 400;
`;

export const DivLink = styled(Link)`
  background: #008060;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 7px 23px;
  color: #ffffff;
  text-decoration: none;
`;
