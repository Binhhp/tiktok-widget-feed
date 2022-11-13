import React from 'react';
import { MostPostRoot } from './style';
import MostPostItemComponent from './MostPostItem';
import { getPosts } from 'repositories/api';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { RootReducer } from 'stores/Admin/reducers';

const MostPost = () => {
  const dateRangeSate = useSelector(
    (state: RootReducer) => state.AppReducer.dateRange,
  );

  const { data } = useSWR('/odata/Posts', () =>
    getPosts(dateRangeSate.startDate, dateRangeSate.endDate),
  );

  const posts = data?.value;
  if (posts?.length === 0) {
    return null;
  }
  return (
    <MostPostRoot>
      <h4 className='title'>Most Popular Posts</h4>
      <div className='post-list'>
        {posts?.map((item) => (
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
  );
};

export default MostPost;
