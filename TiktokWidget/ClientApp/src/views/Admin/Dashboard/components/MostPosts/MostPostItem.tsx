import React from 'react';
import { MostPostItem } from './style';
type IProp = {
  img?: string;
  impressionCount: number;
  clickCount: number;
}
const MostPostItemComponent: React.FC<IProp> = ({
  img,
  clickCount,
  impressionCount,
}) => {
  return (
    <MostPostItem>
      <img src={img} alt={'img post'} />
      <div className="content">
        <div className="content-item">
          <span className="name">Impression:</span>
          <span className="value">{impressionCount}</span>
        </div>
        <div className="content-item">
          <span className="name">Click:</span>
          <span className="value">{clickCount}</span>
        </div>
      </div>
    </MostPostItem>
  );
};

export default MostPostItemComponent;
