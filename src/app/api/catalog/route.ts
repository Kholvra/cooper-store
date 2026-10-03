import { NextResponse } from "next/server";

import { catalogMetadata } from "~/shared/catalog-metadata";
import { catalogGames } from "~/server/catalog-data";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const games = await db.catalogGame.findMany({
      orderBy: { position: "asc" },
      include: { offers: { orderBy: { position: "asc" } } },
    });

    if (
      games.length !== catalogMetadata.expectedGameCount ||
      catalogGames.length !== catalogMetadata.expectedGameCount
    ) {
      return NextResponse.json(
        { error: "Katalog belum tersedia. Silakan coba lagi nanti." },
        { status: 503 },
      );
    }

    const isValid = games.every((dbGame, index) => {
      const expectedGame = catalogGames[index];
      if (!expectedGame) return false;

      if (
        dbGame.slug !== expectedGame.slug ||
        dbGame.name !== expectedGame.name ||
        dbGame.currency !== expectedGame.currency ||
        dbGame.offers.length !== expectedGame.offers.length
      ) {
        return false;
      }

      return dbGame.offers.every((dbOffer, oIndex) => {
        const expectedOffer = expectedGame.offers[oIndex];
        if (!expectedOffer) return false;
        return (
          dbOffer.label === expectedOffer.label &&
          dbOffer.price === expectedOffer.price
        );
      });
    });

    if (!isValid) {
      return NextResponse.json(
        { error: "Katalog belum tersedia. Silakan coba lagi nanti." },
        { status: 503 },
      );
    }

    return NextResponse.json(games, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Unable to load the catalog", error);
    return NextResponse.json(
      { error: "Katalog tidak dapat dimuat. Silakan coba lagi." },
      { status: 503 },
    );
  }
}
