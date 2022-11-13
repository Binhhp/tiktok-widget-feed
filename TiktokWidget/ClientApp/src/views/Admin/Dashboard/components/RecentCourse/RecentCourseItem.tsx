import { Card, MediaCard } from "@shopify/polaris";
import React from "react";
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
          title={item.title}
          primaryAction={{
            content: "Learn more",
            onAction: () => {
              window.open(item.url);
            },
          }}
          description={item.description}
        >
          <div className="orichi-courses-card-content">
            <Card sectioned>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="orichi-courses-poster"
              >
                <img alt={item.title} src={item.image} />
              </a>
            </Card>
          </div>
        </MediaCard>
      </div>
    </RecentCourseItemRoot>
  );
};

export default RecentCourseItem;
