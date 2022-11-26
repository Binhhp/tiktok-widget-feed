import { Card, MediaCard } from "@shopify/polaris";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { ICourseItem } from "repositories/dtos/responses/ICourse";
import { RecentCourseItemRoot } from "./style";
export type Props = {
  item: ICourseItem;
};
const RecentCourseItem: React.FC<Props> = ({ item }) => {
  return (
    <RecentCourseItemRoot>
      <div className="orichi-courses-card-item">
        <MediaCard
          portrait
          title={item?.title ?? <Skeleton />}
          primaryAction={{
            content: "Learn more",
            onAction: () => {
              window.open(item.url);
            },
          }}
          description={item?.description ?? <Skeleton height={30} />}
        >
          <div className="orichi-courses-card-content">
            <Card sectioned>
              <a
                href={item?.url}
                target="_blank"
                rel="noreferrer"
                className="orichi-courses-poster"
              >
                {item.image ? (
                  <img alt={item.title} src={item.image} />
                ) : (
                  <Skeleton height="100%" />
                )}
              </a>
            </Card>
          </div>
        </MediaCard>
      </div>
    </RecentCourseItemRoot>
  );
};

export default RecentCourseItem;
