import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryById } from "@/lib/mock-data";
import { CatalogueContent } from "@/components/marketplace/CatalogueContent";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const category = getCategoryById(params.category);
  if (!category) return {};
  return {
    title: category.name,
    description: `Surplus, overstock and discounted ${category.name.toLowerCase()} from verified suppliers across India. ${category.descriptor}`,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryById(params.category);
  if (!category) notFound();

  return (
    <>
      <Suspense fallback={null}>
        <CatalogueContent
          presetCategory={category.id}
          eyebrow="Category"
          title={category.name}
        />
      </Suspense>
      <Footer />
    </>
  );
}
