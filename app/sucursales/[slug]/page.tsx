import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuOrderingApp } from "@/components/ordering/MenuOrderingApp";
import { BRANCHES, getBranchBySlug } from "@/data/branches";
import { CATEGORIES, PRODUCTS } from "@/data/menuContent";

interface BranchMenuPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BRANCHES.map((branch) => ({ slug: branch.slug }));
}

export async function generateMetadata({ params }: BranchMenuPageProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);
  if (!branch) return {};

  const title = `Menú – ${branch.name}`;
  const description = `Menú y pedidos de Juicy Hamburgers en ${branch.name}, ${branch.city}. Armá tu pedido y confirmalo por WhatsApp.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/sucursales/${branch.slug}`,
    },
    openGraph: {
      title: `${title} | Juicy Hamburgers`,
      description,
      url: `/sucursales/${branch.slug}`,
    },
  };
}

export default async function BranchMenuPage({ params }: BranchMenuPageProps) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FastFoodRestaurant",
    name: branch.name,
    servesCuisine: "Hamburguesas",
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: branch.city,
      addressCountry: "AR",
    },
    url: `https://juicy-burguers.vercel.app/sucursales/${branch.slug}`,
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MenuOrderingApp branch={branch} branches={BRANCHES} categories={CATEGORIES} products={PRODUCTS} />
    </main>
  );
}
