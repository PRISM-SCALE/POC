import { useState, useEffect } from "react";
import { shopifyClient } from "./services/shopify";

export default function App() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<any>(null)

  const GRAPHQL_QUERY = `
    query {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const fetchProducts = async () => {
    try {
      const res = await fetch(shopifyClient.getStorefrontApiUrl(), {
        body: JSON.stringify({
          query: GRAPHQL_QUERY,
        }),
        headers: shopifyClient.getPublicTokenHeaders(),
        method: "POST",
      });
      const response = await res.json()
      console.log(response)
      setProducts(response.data.products.edges)
    } catch (error) {
      console.log(error)      
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <div className="grid gap-4">
        <h1>Products</h1>
        {loading ? (
          <span>Loading products...</span>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {products?.map((product: any) => (
              <div key={product.node.id} className="border p-4">
                <img 
                  src={product.node.images.edges[0]?.node.url} 
                  alt={product.node.title}
                  className="w-full h-48 object-cover"
                />
                <h2 className="font-bold mt-2">{product.node.title}</h2>
                <p className="text-sm text-gray-600">{product.node.description}</p>
                <p className="mt-2">
                  {product.node.priceRange.minVariantPrice.amount} {product.node.priceRange.minVariantPrice.currencyCode}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
