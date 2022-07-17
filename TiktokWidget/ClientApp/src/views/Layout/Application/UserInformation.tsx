import { ContainerSection } from "common/style/Utils.style";
import Profile from "Dependencies/Profile";
import React from "react";
import { useSelector } from "react-redux";
import { TemplateStoreModel } from "stores/Templates/state";
import { RootTikTokReducer } from "stores/TikTokReducer";

export interface IUserProfileProps {
  id: string;
}
function UserInformation(props: IUserProfileProps) {
  const templateReducer: TemplateStoreModel = useSelector(
    (state: RootTikTokReducer) =>
      state.templateStoreReducer.filter((x) => x.id === props.id)[0]
  );

  return (
    <ContainerSection width={100} mb={50}>
      <Profile
        profileInfo={{
          name: templateReducer?.user?.author,
          followers: templateReducer?.user?.followerCount,
          following: templateReducer?.user?.followingCount,
          avt: templateReducer?.user?.avatarThumb,
          like: templateReducer?.user?.diggCount,
        }}
      ></Profile>
    </ContainerSection>
  );
}

export default React.memo(UserInformation);
