import React, { useState, useEffect } from "react";
import { MostPostRoot } from "./style";
import MostPostItemComponent from "./MostPostItem";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { IPostResponse } from "repositories/dtos/responses/IPost";
import ShopAPI from "repositories/implements/ShopAPI";

const MostPost = () => {
  const dateRangeSate = useSelector(
    (state: RootReducer) => state.AppReducer.dateRange
  );

  const shop = useSelector((state: RootReducer) => state.ShopReducer.shop);
  const [data, setData] = useState<IPostResponse | undefined>(undefined);
  useEffect(() => {
    ShopAPI.GetPosts(
      shop.domain ?? "",
      dateRangeSate.startDate,
      dateRangeSate.endDate
    ).then((res) => {
      if (res) setData(res);
    });
  }, [dateRangeSate]);

  return data?.value && data?.value?.length > 0 ? (
    <MostPostRoot>
      <h4 className="orichi-post-title">Most Popular Posts</h4>
      <div className="orichi-post-list">
        {data?.value?.map((item) => (
          <MostPostItemComponent
            img={item.image}
            impressionCount={item.impression}
            clickCount={item.clicks}
            key={item.id}
            url={item.url}
            desc={item.description}
          />
        ))}
      </div>
    </MostPostRoot>
  ) : (
    <></>
  );
};

export default MostPost;
