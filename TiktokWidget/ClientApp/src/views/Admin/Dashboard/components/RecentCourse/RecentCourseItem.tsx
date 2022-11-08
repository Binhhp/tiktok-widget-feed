import { Card, MediaCard } from '@shopify/polaris';
import React from 'react';
import { ICourseItem } from 'repositories/dtos/responses/ICourse';
import { RecentCourseItemRoot } from './style';
export type Props = {
  item: ICourseItem;
};
const RecentCourseItem: React.FC<Props> = ({ item }) => {
  return (
    <RecentCourseItemRoot>
      <div className='card-item'>
        <MediaCard
          portrait
          title={item.title}
          primaryAction={{
            content: 'Learn more',
            onAction: () => {
              window.open(item.url);
            },
          }}
          description={item.description}>
          <Card sectioned>
            <a href={item.url} target='_blank' rel='noreferrer'>
              <img alt='Facebook Pixel' src={item.image} />
            </a>
          </Card>
        </MediaCard>
      </div>
    </RecentCourseItemRoot>
  );
};

export default RecentCourseItem;
