CREATE TABLE "CatalogGame" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "CatalogGame_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CatalogOffer" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "CatalogOffer_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CatalogGame_slug_key" ON "CatalogGame"("slug");
CREATE UNIQUE INDEX "CatalogGame_position_key" ON "CatalogGame"("position");
CREATE UNIQUE INDEX "CatalogOffer_gameId_position_key" ON "CatalogOffer"("gameId", "position");

ALTER TABLE "CatalogOffer"
ADD CONSTRAINT "CatalogOffer_gameId_fkey"
FOREIGN KEY ("gameId") REFERENCES "CatalogGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;
