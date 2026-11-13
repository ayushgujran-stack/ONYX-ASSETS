import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_PORTFOLIO } from "@/data/properties";
import { ProjectDetailClient } from "@/components/ProjectDetailClient";

export function generateStaticParams() {
  return ALL_PORTFOLIO.map((p) => ({
    slug: p.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = ALL_PORTFOLIO.find((p) => p.id === slug);

  if (!property) {
    return {
      title: "Residence Not Found | Onyx Assets LLP",
    };
  }

  return {
    title: `${property.name} | Onyx Assets LLP — Udupi`,
    description: `${property.units} in ${property.location}. ${property.tagline}`,
  };
}

export default async function EstateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = ALL_PORTFOLIO.find((p) => p.id === slug);

  if (!property) {
    notFound();
  }

  return <ProjectDetailClient property={property} />;
}
