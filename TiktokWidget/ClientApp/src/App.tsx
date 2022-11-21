import React, { Suspense, useEffect, useState } from "react";
import Routes from "routes";
import NavigationScroll from "./layout/MainLayout/NavigationScroll";
import { Toaster } from "react-hot-toast";
import "@shopify/polaris/build/esm/styles.css";
import "swiper/swiper-bundle.css";
import "@fancyapps/ui/dist/fancybox.css";
import { ShopReponsitory } from "repositories/implements/ShopReponsitory";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShopActionTS } from "stores/Admin/Shop/action";
import Loader from "ui-components/Loading/ComponentLoader";
import withAppProvider from "Dependencies/ApplicationProvider";
import { useQuery } from "hooks";
import { WidgetActionTS } from "stores/Admin/Widget/action";
import { InstagramWidgetActionTS } from "stores/Admin/InstagramWidget/action";
import { ChatPlugin } from "common/functions/ChatPlugin";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shop = useQuery().get("shop");
  const [isPending, setPending] = useState(true);
  useEffect(() => {
    if (shop) {
      const shopReponsitory = new ShopReponsitory();
      shopReponsitory
        .Get(shop)
        .then(async (res) => {
          if (res) {
            if (res?.shopConfiguration && res?.shopConfiguration?.timezone) {
              localStorage.setItem("timezone", res.shopConfiguration.timezone);
            }
            dispatch(
              ShopActionTS.OnSetInformation({
                shop: res,
              })
            );
            ChatPlugin.Init(res.domain);
            const [tiktokCount, instagramCount] = await Promise.all([
              shopReponsitory.GetWidgetsCount(res.domain ?? ""),
              shopReponsitory.GetInstagramCount(res.domain ?? ""),
            ]);
            dispatch(WidgetActionTS.OnSetWidgetCount(tiktokCount));
            dispatch(InstagramWidgetActionTS.OnSetWidgetCount(instagramCount));
          } else {
            navigate("/not-found");
          }
          setPending(false);
        })
        .catch(() => {
          navigate("/not-found");
          setPending(false);
        });
    } else {
      navigate("/not-found");
      setPending(false);
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {isPending ? (
        <Loader />
      ) : (
        <NavigationScroll>
          <Routes />
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </NavigationScroll>
      )}
    </Suspense>
  );
}

export default withAppProvider(App);
