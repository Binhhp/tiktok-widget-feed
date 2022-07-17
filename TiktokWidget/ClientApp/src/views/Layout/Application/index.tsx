import { ContainerSection } from "common/style/Utils.style";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DivTikTok,
  DivTiKTokenizer,
  TikTokContent,
  TikTokWrapper,
} from "./TiktokStyle";
import { WidgetReponsitory } from "repositories/implements/WidgetReponsitory";
import { IWidgetResponse } from "repositories/dtos/responses/WidgetResponse";
import {
  ISettingProviderWidget,
  SettingProviderWidget,
} from "stores/Widget/state";
import ApplicationContainer from "ui-components/ApplicationContainer";
import VideoScroll from "../VideoScroll";
import { ShopActionTS } from "stores/Shop/action";
import UserProfile from "./UserInformation";
import Layout from "./Layout";

function TikTok() {
  const [widgets, setWidgets] = useState<ISettingProviderWidget[]>([]);

  const dispatch = useDispatch();

  const [isPending, setPending] = useState(true);
  const fetchWidget = (id: string) => {
    new WidgetReponsitory().GetById(id).then((res) => {
      if (res.Status) {
        const result = res.Data as IWidgetResponse;
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

  const fetchWidgetByIds = (widgetIds: Array<string>) => {
    new WidgetReponsitory().GetByIds(widgetIds).then((res) => {
      const result = res.Data as IWidgetResponse[];
      const listNewWidgetIds: Array<ISettingProviderWidget> = [];

      result.forEach((item) => {
        listNewWidgetIds.push(new SettingProviderWidget(item).ToDto());
      });
      setWidgets([...widgets, ...listNewWidgetIds]);
      dispatch(
        ShopActionTS.OnSetInformation({
          shop: result[0].shops,
        })
      );
      setPending(false);
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
    const widgetElements = document.querySelectorAll('div[name="orichi"]');
    if (widgetElements && widgetElements.length > 0) {
      if (widgetElements.length === 1) {
        const widgetId = widgetElements[0].getAttribute("data-id");
        if (widgetId) {
          fetchWidget(widgetId);
        }
      } else {
        let widgetIds: Array<string> = [];
        widgetElements.forEach((item: any) => {
          const id = item.getAttribute("data-id");
          if (id) {
            widgetIds.push(id);
          }
        });
        fetchWidgetByIds(widgetIds);
      }
    } else {
      fetchWidgetsFromDomain();
    }
  }, []);

  return (
    <ApplicationContainer>
      {widgets.map((item, index) => (
        <DivTiKTokenizer key={`TikTok-Widget-${item.id}`}>
          <TikTokWrapper>
            <DivTikTok>
              {item.showProfile && item.source === 1 && (
                <UserProfile id={`${item.id}`}></UserProfile>
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
          <VideoScroll id={`${item.id}`}></VideoScroll>
        </DivTiKTokenizer>
      ))}
    </ApplicationContainer>
  );
}

export default TikTok;
