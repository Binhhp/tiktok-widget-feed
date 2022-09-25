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
import Loader from "ui-components/Loader";
import withAppProvider from "Dependencies/ApplicationProvider";
import { useQuery } from "hooks";
import { WidgetActionTS } from "stores/Admin/Widget/action";

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
        .then((res) => {
          if (res) {
            dispatch(
              ShopActionTS.OnSetInformation({
                shop: res,
              })
            );
            shopReponsitory.GetWidgetsCount(res.domain ?? "").then((val) => {
              dispatch(WidgetActionTS.OnSetWidgetCount(val));
              if (val) {
                navigate(`/my-widget?shop=${res.domain}`);
              }
            });
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
    <Suspense fallback={<Loader></Loader>}>
      {isPending ? (
        <Loader></Loader>
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
              // Define default options
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
