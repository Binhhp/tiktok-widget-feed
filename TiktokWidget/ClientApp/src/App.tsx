import React, { Suspense, useEffect, useState } from 'react';
import Routes from 'routes';
import NavigationScroll from './layout/MainLayout/NavigationScroll';
import { Toaster } from 'react-hot-toast';
import '@shopify/polaris/build/esm/styles.css';
import 'swiper/swiper-bundle.css';
import '@fancyapps/ui/dist/fancybox.css';
import { ShopReponsitory } from 'repositories/implements/ShopReponsitory';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShopActionTS } from 'stores/Admin/Shop/action';
import Loader from 'ui-components/Loading/ComponentLoader';
import withAppProvider from 'Dependencies/ApplicationProvider';
import { useQuery } from 'hooks';
import { WidgetActionTS } from 'stores/Admin/Widget/action';
import { InstagramWidgetActionTS } from 'stores/Admin/InstagramWidget/action';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shop = useQuery().get('shop');
  const [isPending, setPending] = useState(true);
  useEffect(() => {
    if (shop) {
      const shopReponsitory = new ShopReponsitory();
      shopReponsitory
        .Get(shop)
        .then((res) => {
          if (res) {
            if (res?.shopConfiguration && res?.shopConfiguration?.timezone) {
              localStorage.setItem('timezone', res.shopConfiguration.timezone);
            }
            dispatch(
              ShopActionTS.OnSetInformation({
                shop: res,
              }),
            );
            const script2 = document.createElement('script');
            script2.innerHTML = `
              window.$crisp=[];window.CRISP_WEBSITE_ID="07faab23-2cce-4034-93cd-5361030881aa";CRISP_TOKEN_ID = btoa("${
                (res.domain ?? '') + 'Tiktok'
              }");
              (function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
              $crisp.push(["set", "user:nickname", ["${res.domain ?? ''}"]]);
              $crisp.push(["set", "session:segments", [["Tiktok"]]]);`;
            document.body.appendChild(script2);

            shopReponsitory.GetWidgetsCount(res.domain ?? '').then((val) => {
              dispatch(WidgetActionTS.OnSetWidgetCount(val));
            });
            shopReponsitory.GetInstagramCount(res.domain ?? '').then((val) => {
              dispatch(InstagramWidgetActionTS.OnSetWidgetCount(val));
            });
          } else {
            navigate('/not-found');
          }
          setPending(false);
        })
        .catch(() => {
          navigate('/not-found');
          setPending(false);
        });
    } else {
      navigate('/not-found');
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
            position='bottom-center'
            reverseOrder={false}
            gutter={8}
            containerClassName=''
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </NavigationScroll>
      )}
    </Suspense>
  );
}

export default withAppProvider(App);
