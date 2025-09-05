import products from "../../data/products.json";
import { notFound } from "next/navigation";

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
  return products.map((p: Product) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  // Denna funktion körs på serversidan när någon besöker /products/[slug]
  // Next.js skickar in params med rätt slug
  const product = products.find((p: Product) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price} kr</p>
    </div>
  );
}
