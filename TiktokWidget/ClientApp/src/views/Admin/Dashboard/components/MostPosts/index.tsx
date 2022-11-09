import React from "react";
import { MostPostRoot } from "./style";
import product from "assets/images/product.png";
import MostPostItemComponent from "./MostPostItem";

const MostPost = () => {
  return (
    <MostPostRoot>
      <h4 className="title">Most Popular Posts</h4>
      <div className="post-list">
        <MostPostItemComponent
          img={product}
          impressionCount={23}
          clickCount={300}
        />
        <MostPostItemComponent
          img={product}
          impressionCount={23}
          clickCount={300}
        />
        <MostPostItemComponent
          img={product}
          impressionCount={23}
          clickCount={300}
        />
      </div>
    </MostPostRoot>
  );
};

export default MostPost;
