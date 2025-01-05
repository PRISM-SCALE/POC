import {createStorefrontClient} from '@shopify/hydrogen-react';

export const shopifyClient = createStorefrontClient({
  storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
  publicStorefrontToken: import.meta.env.VITE_SHOPIFY_PUBLIC_STOREFRONT_API_ACCESS_TOKEN,
  // privateStorefrontToken: import.meta.env.VITE_SHOPIFY_PRIVATE_STOREFRONT_API_ACCESS_TOKEN,
  storefrontApiVersion: import.meta.env.VITE_SHOPIFY_STOREFRONT_API_VERSION
});
