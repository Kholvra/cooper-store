import { PrismaClient } from "../generated/prisma/index.js";
import { catalogGames, validateCatalogData } from "../src/server/catalog-data.ts";

const validation = validateCatalogData();
if (!validation.valid) {
  throw new Error(`Catalog source data is invalid:\n${validation.errors.join("\n")}`);
}

const db = new PrismaClient();

try {
  await db.$transaction(async (transaction) => {
    await transaction.catalogOffer.deleteMany();
    await transaction.catalogGame.updateMany({
      data: { position: { increment: catalogGames.length } },
    });

    for (const [position, game] of catalogGames.entries()) {
      const savedGame = await transaction.catalogGame.upsert({
        where: { slug: game.slug },
        create: {
          slug: game.slug,
          name: game.name,
          currency: game.currency,
          position,
        },
        update: {
          name: game.name,
          currency: game.currency,
          position,
        },
      });

      await transaction.catalogOffer.createMany({
        data: game.offers.map((offer, offerPosition) => ({
          gameId: savedGame.id,
          label: offer.label,
          price: offer.price,
          position: offerPosition,
        })),
      });
    }

    await transaction.catalogGame.deleteMany({
      where: { slug: { notIn: catalogGames.map((game) => game.slug) } },
    });
  });

  console.info(`Seeded ${catalogGames.length} games and their listed offers.`);
} finally {
  await db.$disconnect();
}
