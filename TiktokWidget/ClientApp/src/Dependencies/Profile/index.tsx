import { Icon } from "@shopify/polaris";
import { PlusMinor } from "@shopify/polaris-icons";
import React, { useState } from "react";
import { IProfileProps } from "./ProfileType";
import {
  AvatarProfile,
  Contact,
  ContactItem,
  FollowerButton,
  ProfileHeader,
  ProfileInfo,
  ProfilePlus,
  ProfileWrapper,
} from "./ProfileStyle";
import Image from "ui-components/Image";
import Avatar from "react-avatar";
import { NumberFormatter } from "common/functions/NumberFormatter";
import Skeleton from "react-loading-skeleton";

function Profile(props: IProfileProps) {
  const [status, setStatus] = useState(false);

  const onChangeStatus = () => {
    if (props.onClickFollow) props.onClickFollow(!status);
    setStatus(!status);
  };

  return (
    <ProfileWrapper {...props.style}>
      <AvatarProfile {...props.style}>
        {props.default ? (
          <Avatar round={true} name="someone" />
        ) : props.profileInfo?.avt ? (
          <Image src={props.profileInfo?.avt} alt={props.profileInfo?.name} />
        ) : (
          <Skeleton circle className="profile-skeleton" />
        )}
        {props.default ? (
          <ProfilePlus {...props.style}>
            <Icon source={PlusMinor} color="highlight"></Icon>
          </ProfilePlus>
        ) : (
          props.profileInfo?.name && (
            <ProfilePlus {...props.style}>
              <Icon source={PlusMinor} color="highlight"></Icon>
            </ProfilePlus>
          )
        )}
      </AvatarProfile>
      <ProfileInfo {...props.style}>
        <ProfileHeader>
          <h2>
            {props.default
              ? `@someone`
              : props.profileInfo?.name ?? <Skeleton inline />}
          </h2>
          {!props.hiddenFollower &&
            (props.default ? (
              <FollowerButton
                className={status ? "following" : "follow"}
                onClick={onChangeStatus}
              >
                {status ? "Following" : "Follow"}
              </FollowerButton>
            ) : (
              props.profileInfo?.name && (
                <FollowerButton
                  className={status ? "following" : "follow"}
                  onClick={onChangeStatus}
                >
                  {status ? "Following" : "Follow"}
                </FollowerButton>
              )
            ))}
        </ProfileHeader>
        <Contact>
          <ContactItem fontSize={props?.style?.fontSize}>
            <div>
              <h3>
                {props.default ? (
                  0
                ) : props.profileInfo?.following !== undefined ? (
                  NumberFormatter.Format(props.profileInfo?.following)
                ) : (
                  <Skeleton inline />
                )}
              </h3>
              <span>Following</span>
            </div>
          </ContactItem>
          <ContactItem fontSize={props?.style?.fontSize}>
            <div>
              <h3>
                {props.default ? (
                  0
                ) : props.profileInfo?.followers !== undefined ? (
                  NumberFormatter.Format(props.profileInfo?.followers)
                ) : (
                  <Skeleton inline />
                )}
              </h3>
              <span>Follower</span>
            </div>
          </ContactItem>
          <ContactItem fontSize={props?.style?.fontSize}>
            <div>
              <h3>
                {props.default ? (
                  0
                ) : props.profileInfo?.like !== undefined ? (
                  NumberFormatter.Format(props.profileInfo?.like)
                ) : (
                  <Skeleton inline />
                )}
              </h3>
              <span>Likes</span>
            </div>
          </ContactItem>
        </Contact>
      </ProfileInfo>
    </ProfileWrapper>
  );
}

export default Profile;
