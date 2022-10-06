import { ContainerSection } from "common/style/Utils.style";
import { LayoutTemplateContext } from "Dependencies/LayoutTemplate/LayoutTemplateContext";
import Profile from "Dependencies/Profile";
import React, { useContext } from "react";

function UserInformation() {
  const templateContext = useContext(LayoutTemplateContext);

  return (
    <ContainerSection width={100} mb={50}>
      <Profile
        profileInfo={{
          name: templateContext.state?.user?.author,
          followers: templateContext.state?.user?.followerCount,
          following: templateContext.state?.user?.followingCount,
          avt: templateContext.state?.user?.avatarThumb,
          like: templateContext.state?.user?.diggCount,
        }}
      ></Profile>
    </ContainerSection>
  );
}

export default React.memo(UserInformation);
