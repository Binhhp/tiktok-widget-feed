export default class AppIntegrationProvider {
  static FacebookPixel: AppModel = {
    title: "Facebook Pixels Conversion API",
    desc: "#1 Facebook Pixel tracking, Conversion API supported, Solution for IOS update, Tracking 100% purchase events",
    url: "https://apps.shopify.com/yuri-facebook-multi-pixels?surface_source=tiktok&surface_type=in-app",
  };
  static QuantityDiscount: AppModel = {
    title: "Quantity Discount Order Limits",
    desc: "Easily set up discount campaign based on any rules. Only discount in multiple (buy 3,6,9,...) is also available now!",
    url: "https://apps.shopify.com/quantity-break-limit-purchase?surface_source=tiktok&surface_type=in-app",
  };
}

interface AppModel {
  title: string;
  desc: string;
  url: string;
}
