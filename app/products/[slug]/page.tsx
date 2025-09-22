import { notFound } from "next/navigation";
import * as React from "react";

type Product = {
  id: number;
  slug: string;
  name: string;
  price: number; // price in cents
  description: string;
  image: string; // URL to product image
  category: string;
};

export const revalidate = 60; // ISR-liknande, valfritt

export async function generateStaticParams() {
  // Fetch all products and generate paths
  const res = await fetch(`${process.env.BASE_URL}/products`);
  const products: Product[] = await res.json();
  return products.map((p) => ({ slug: p.slug }));
}

// Use defensive resolution for props and params (Next 15 may make params a Promise)
export default async function ProductPage({ params }: { params: any }) {
  // resolve params whether it's a plain object or a Promise (concise & compatible with Next 15)
  const { slug } = await Promise.resolve(params);

  // Fetch one product based on slug
  const res = await fetch(`${process.env.BASE_URL}/products/${slug}`);
  if (!res.ok) return notFound();
  const product: Product = await res.json();

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price} kr</p>
    </div>
  );
}
