import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DivTikTok,
  DivTiKTokenizer,
  TikTokContent,
  TikTokWrapper,
} from "./TiktokStyle";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import { BaseTikTokWidget } from "repositories/dtos/responses/BaseTikTokWidget";
import {
  ISettingProviderWidget,
  SettingProviderWidget,
} from "stores/Admin/Widget/state";
import { ShopActionTS } from "stores/Admin/Shop/action";
import UserProfile from "./UserInformation";
import Layout from "./Layout";
import { ITikTokAppProps } from "../TikTokModel";
import AudioPlayerContainer from "../SwiperAudioPlayer";
import { AudioPlayerProvider } from "../SwiperAudioPlayer/AudioPlayerContext";
import ApplicationContainer from "../ApplicationContainer";
import { ContainerSection } from "common/style/UtilStyles";

function TikTok(props: ITikTokAppProps) {
  const [widgets, setWidgets] = useState<ISettingProviderWidget[]>([]);

  const dispatch = useDispatch();

  const [isPending, setPending] = useState(true);
  const fetchWidget = (id: string) => {
    new WidgetReponsitory().GetById(id).then((res) => {
      if (res.Status) {
        const result = res.Data as BaseTikTokWidget;
        const dto = new SettingProviderWidget(result).ToDto();
        setWidgets([...widgets, dto]);
        dispatch(
          ShopActionTS.OnSetInformation({
            shop: result.shops,
          })
        );
        setPending(false);
      }
    });
  };

  const fetchWidgetsFromDomain = () => {
    const domain = window.location.host;
    new WidgetReponsitory().Get(0, domain).then((res) => {
      const widgetDto = res.data.map((item) => {
        return new SettingProviderWidget(item).ToDto();
      });
      const shop = res.data[0].shops;
      setWidgets([...widgets, ...widgetDto]);
      dispatch(
        ShopActionTS.OnSetInformation({
          shop: shop,
        })
      );
      setPending(false);
    });
  };
  useEffect(() => {
    if (props.widgetId) {
      fetchWidget(props.widgetId);
    } else {
      fetchWidgetsFromDomain();
    }
  }, []);

  return (
    <ApplicationContainer>
      {widgets.map((item) => (
        <DivTiKTokenizer key={`TikTok-Widget-${item.id}`}>
          <AudioPlayerProvider>
            <TikTokWrapper>
              <DivTikTok>
                {item.showProfile && item.source === 1 && (
                  <UserProfile></UserProfile>
                )}
                <ContainerSection height={100} width={100}>
                  {!isPending && item.id && (
                    <TikTokContent hidden={false}>
                      <Layout id={item.id} widget={item} />
                    </TikTokContent>
                  )}
                </ContainerSection>
              </DivTikTok>
            </TikTokWrapper>
            <AudioPlayerContainer widget={item} />
          </AudioPlayerProvider>
        </DivTiKTokenizer>
      ))}
    </ApplicationContainer>
  );
}

export default TikTok;
