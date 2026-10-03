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

    await transaction.popularDeal.deleteMany();
    await transaction.popularDeal.createMany({
      data: [
        {
          gameSlug: "mlbb",
          title: "Mobile Legends",
          dealName: "Weekly Diamond Pass",
          badge: "-25%",
          instant: true,
          soldCount: "42.9k+ Terjual",
          oldPrice: 38000,
          price: 28500,
          image: "/games/mlbb%20weekly%20Item.jpg",
          position: 0,
        },
        {
          gameSlug: "free-fire",
          title: "Free Fire",
          dealName: "140 Diamond",
          badge: "-30%",
          instant: true,
          soldCount: "18.1k+ Terjual",
          oldPrice: 28000,
          price: 19500,
          image: "/games/Freefire%20diamond.jpg",
          position: 1,
        },
        {
          gameSlug: "genshin-impact",
          title: "Genshin Impact",
          dealName: "Blessing of the Welkin Moon",
          badge: "-15%",
          instant: true,
          soldCount: "9.4k+ Terjual",
          oldPrice: 89000,
          price: 79000,
          image: "/games/Genshin%20Impact%20item.jpg",
          position: 2,
        },
        {
          gameSlug: "roblox",
          title: "Roblox",
          dealName: "Robux Gift Card Voucher",
          badge: "-20%",
          instant: true,
          soldCount: "12.8k+ Terjual",
          oldPrice: 65000,
          price: 52000,
          image: "/games/roblox%20item.jpg",
          position: 3,
        },
      ],
    });
  }, { timeout: 60000, maxWait: 10000 });

  console.info(`Seeded ${catalogGames.length} games, listed offers, and popular deals.`);
} finally {
  await db.$disconnect();
}
