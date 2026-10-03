import { Suspense } from "react";
import { Catalog } from "~/app/_components/catalog";

export default function CatalogRoute() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Memuat katalog...</div>}>
      <Catalog />
    </Suspense>
  );
}
