import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseInstagramWidget } from "repositories/dtos/responses/BaseInstagramWidget";
import InstagramWidgetAPI from "repositories/implements/InstagramWidgetAPI";
import { ShopActionTS } from "stores/Admin/Shop/action";
import { RootTikTokReducer } from "stores/Layout/WidgetReducer";
import ApplicationContainer from "../Common/ApplicationContainer";
import { IInstagramLayoutProps } from "./InstagramModel";
import Layout from "./Layout";

function Instagram(props: IInstagramLayoutProps) {
  const [widgets, setWidgets] = useState<BaseInstagramWidget[]>([]);

  const shopReducer = useSelector(
    (state: RootTikTokReducer) => state.shopReducer
  );

  const dispatch = useDispatch();

  const [isPending, setPending] = useState(true);
  const getWidgetById = (id: string) => {
    InstagramWidgetAPI.GetById(id).then((res) => {
      if (res.Status) {
        const result = res.Data as BaseInstagramWidget;
        setWidgets([...widgets, result]);
        if (!shopReducer.shop.domain) {
          dispatch(
            ShopActionTS.OnSetInformation({
              shop: result.shops,
            })
          );
        }
        setPending(false);
      }
    });
  };

  const getAllWidgetByShop = () => {
    const domain = window.Shopify
      ? window.Shopify["shop"]
      : window.location.host;

    InstagramWidgetAPI.Get(0, domain).then((res) => {
      const shop = res.data[0].shops;
      setWidgets([...widgets, ...res.data]);
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
      getWidgetById(props.widgetId);
    } else {
      getAllWidgetByShop();
    }
  }, []);

  return (
    <ApplicationContainer>
      {!isPending &&
        widgets.map((item, index) => (
          <Layout key={`instagram-${index}`} widget={item}></Layout>
        ))}
    </ApplicationContainer>
  );
}
export default Instagram;
