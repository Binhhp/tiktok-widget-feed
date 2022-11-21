import React, { useState, useEffect } from "react";
import { MostPostRoot } from "./style";
import MostPostItemComponent from "./MostPostItem";
import { getPosts } from "repositories/api";
import { useSelector } from "react-redux";
import { RootReducer } from "stores/Admin/reducers";
import { IPostResponse } from "repositories/dtos/responses/IPost";

const MostPost = () => {
  const dateRangeSate = useSelector(
    (state: RootReducer) => state.AppReducer.dateRange
  );

  const [data, setData] = useState<IPostResponse | undefined>(undefined);
  useEffect(() => {
    getPosts(dateRangeSate.startDate, dateRangeSate.endDate).then((res) => {
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
          />
        ))}
      </div>
    </MostPostRoot>
  ) : (
    <></>
  );
};

export default MostPost;
