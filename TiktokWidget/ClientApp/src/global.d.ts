declare interface String {
  format(...replacements: string[]): string;
}

interface Window {
  Shopify: any;
  $crisp: any;
  _timeout: number;
  _syncJob: boolean;
}
