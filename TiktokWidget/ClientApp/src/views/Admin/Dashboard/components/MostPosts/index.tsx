import React from 'react';
import { MostPostRoot } from './style';
import product from 'assets/images/product.png';
import MostPostItemComponent from './MostPostItem';
import { getPosts } from 'repositories/api';
import useSWR from 'swr';

const MostPost = () => {
  const { data } = useSWR('/odata/Posts', () => getPosts());
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
          />
        ))}
      </div>
    </MostPostRoot>
  );
};

export default MostPost;
