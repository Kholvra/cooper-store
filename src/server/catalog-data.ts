import { catalogMetadata } from "../shared/catalog-metadata.ts";

export interface CatalogOffer {
  label: string;
  price: number;
}

export interface CatalogGame {
  slug: string;
  name: string;
  currency: string;
  offers: CatalogOffer[];
}


export const catalogGames: CatalogGame[] = [
  {
    slug: "mlbb",
    name: "Mobile Legends: Bang Bang",
    currency: "Diamonds",
    offers: [
      { label: "5 (5+0)", price: 1650 },
      { label: "10 (10+0)", price: 3300 },
      { label: "12 (11+1)", price: 3900 },
      { label: "15 (15+0)", price: 4950 },
      { label: "19 (17+2)", price: 6040 },
      { label: "20 (18+2)", price: 6600 },
      { label: "28 (25+3)", price: 8780 },
      { label: "44 (40+4)", price: 13200 },
      { label: "59 (53+6)", price: 17490 },
      { label: "71 (64+7)", price: 21390 },
      { label: "74 (67+7)", price: 22245 },
      { label: "85 (77+8)", price: 24976 },
      { label: "100 (91+9)", price: 29926 },
      { label: "113 (102+11)", price: 33756 },
      { label: "118 (106+12)", price: 34980 },
      { label: "144 (130+14)", price: 42466 },
      { label: "170 (154+16)", price: 50400 },
      { label: "240 (217+23)", price: 71173 },
      { label: "278 (251+27)", price: 83253 },
      { label: "284 (257+27)", price: 84373 },
      { label: "296 (256+40)", price: 87770 },
      { label: "300 (271+29)", price: 89280 },
      { label: "355 (309+46)", price: 105260 },
      { label: "384 (336+48)", price: 114170 },
      { label: "401 (363+38)", price: 119189 },
      { label: "408 (367+41)", price: 120737 },
      { label: "429 (386+43)", price: 126581 },
      { label: "568 (503+65)", price: 164697 },
      { label: "601 (533+68)", price: 175127 },
      { label: "632 (561+71)", price: 183837 },
      { label: "1.220 (1.075+145)", price: 356087 },
      { label: "1.342 (1.194+148)", price: 391694 },
      { label: "1.443 (1.277+166)", price: 418164 },
      { label: "1.613 (1.431+182)", price: 468564 },
      { label: "1.704 (1.509+195)", price: 494091 },
      { label: "2.010 (1.708+302)", price: 550940 },
      { label: "3.055 (2.652+403)", price: 854807 },
      { label: "4.020 (3.416+604)", price: 1101880 },
      { label: "4.830 (4.003+827)", price: 1314950 },
      { label: "6.030 (5.124+906)", price: 1652820 },
      { label: "6.840 (5.711+1.129)", price: 1865890 },
      { label: "9.660 (8.006+1.654)", price: 2629900 },
      { label: "10.050 (8.540+1.510)", price: 2754700 },
    ],
  },
  {
    slug: "free-fire",
    name: "Free Fire",
    currency: "Diamonds",
    offers: [
      { label: "5", price: 942 },
      { label: "10", price: 1884 },
      { label: "15", price: 2826 },
      { label: "20", price: 3768 },
      { label: "25", price: 4710 },
      { label: "30", price: 5652 },
      { label: "50", price: 7153 },
      { label: "55", price: 8095 },
      { label: "60", price: 9037 },
      { label: "70", price: 9743 },
      { label: "80", price: 11627 },
      { label: "100", price: 14306 },
      { label: "120", price: 16896 },
      { label: "140", price: 19485 },
      { label: "150", price: 21369 },
      { label: "190", price: 26638 },
      { label: "210", price: 29228 },
      { label: "280", price: 38970 },
      { label: "355", price: 48712 },
      { label: "425", price: 58455 },
      { label: "495", price: 68197 },
      { label: "565", price: 77940 },
      { label: "635", price: 87682 },
      { label: "720", price: 95999 },
      { label: "860", price: 115484 },
      { label: "1.075", price: 144711 },
      { label: "1.440", price: 191998 },
      { label: "2.160", price: 287997 },
      { label: "2.880", price: 383996 },
      { label: "3.600", price: 479995 },
      { label: "4.320", price: 575994 },
      { label: "7.290", price: 920000 },
      { label: "36.500", price: 4794831 },
      { label: "73.100", price: 9675861 },
    ],
  },
  {
    slug: "pubg-mobile",
    name: "PUBG Mobile",
    currency: "UC",
    offers: [
      { label: "60", price: 17017 },
      { label: "300 + 25", price: 86656 },
      { label: "600 + 60", price: 173311 },
      { label: "1.500 + 300", price: 433666 },
      { label: "1.800 + 325", price: 520322 },
      { label: "3.000 + 850", price: 867330 },
      { label: "6.000 + 2.100", price: 1734854 },
    ],
  },
  {
    slug: "genshin-impact",
    name: "Genshin Impact",
    currency: "Crystals",
    offers: [
      { label: "60", price: 16800 },
      { label: "300 + 30", price: 81000 },
      { label: "980 + 110", price: 255000 },
      { label: "1.980 + 260", price: 489000 },
      { label: "3.280 + 600", price: 815000 },
      { label: "6.480 + 1.600", price: 1629000 },
    ],
  },
  {
    slug: "roblox",
    name: "Roblox",
    currency: "Produk",
    offers: [
      { label: "200 Robux", price: 87893 },
      { label: "400 Robux", price: 103446 },
      { label: "800 Robux", price: 166176 },
      { label: "2.000 Robux", price: 399254 },
      { label: "4.500 Robux", price: 931240 },
      { label: "10.000 Robux", price: 1836657 },
      { label: "Roblox Gift Card IDR 50K", price: 49388 },
      { label: "Roblox Gift Card IDR 65K", price: 60694 },
      { label: "Roblox Gift Card IDR 300K", price: 296310 },
      { label: "Roblox Gift Card IDR 500K", price: 493875 },
    ],
  },
  {
    slug: "valorant",
    name: "Valorant",
    currency: "VP",
    offers: [
      { label: "475", price: 56000 },
      { label: "1.000", price: 112000 },
      { label: "2.050", price: 224000 },
      { label: "3.650", price: 389000 },
      { label: "5.350", price: 559000 },
      { label: "11.000", price: 1099000 },
    ],
  },
  {
    slug: "call-of-duty-mobile",
    name: "Call of Duty Mobile",
    currency: "CP",
    offers: [
      { label: "31", price: 4505 },
      { label: "63", price: 9009 },
      { label: "128", price: 18018 },
      { label: "321", price: 45045 },
      { label: "645", price: 90090 },
      { label: "800", price: 108108 },
      { label: "1.373", price: 180180 },
      { label: "2.060", price: 270270 },
      { label: "2.750", price: 342342 },
      { label: "3.564", price: 450450 },
      { label: "5.619", price: 657658 },
      { label: "7.656", price: 900901 },
      { label: "15.312", price: 1801802 },
      { label: "38.280", price: 4504505 },
      { label: "76.560", price: 9009009 },
    ],
  },
  {
    slug: "delta-force-mobile",
    name: "Delta Force Mobile",
    currency: "Delta Coins",
    offers: [
      { label: "18", price: 5157 },
      { label: "30", price: 7735 },
      { label: "60", price: 17188 },
      { label: "321 (300+21)", price: 75624 },
      { label: "461 (420+41)", price: 103983 },
      { label: "751 (680+71)", price: 145805 },
      { label: "1.480 (1.280+200)", price: 291321 },
      { label: "1.981 (1.680+301)", price: 364080 },
      { label: "3.950 (3.280+670)", price: 727872 },
      { label: "8.100 (6.480+1.620)", price: 1455743 },
      { label: "16.200 (12.960+3.240)", price: 2911484 },
      { label: "24.300 (19.440+4.860)", price: 4367226 },
    ],
  },
  {
    slug: "blood-strike",
    name: "Blood Strike",
    currency: "Gold",
    offers: [
      { label: "100 + 5", price: 13814 },
      { label: "300 + 20", price: 41441 },
      { label: "500 + 40", price: 69067 },
      { label: "1.000 + 100", price: 138133 },
      { label: "2.000 + 260", price: 276265 },
      { label: "5.000 + 800", price: 690662 },
    ],
  },
];

export function validateCatalogData(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (catalogGames.length !== catalogMetadata.expectedGameCount) {
    errors.push(
      `Expected ${catalogMetadata.expectedGameCount} games, got ${catalogGames.length}`
    );
  }

  const expectedSlugs = [
    "mlbb",
    "free-fire",
    "pubg-mobile",
    "genshin-impact",
    "roblox",
    "valorant",
    "call-of-duty-mobile",
    "delta-force-mobile",
    "blood-strike",
  ];

  const seenSlugs = new Set<string>();

  catalogGames.forEach((game, index) => {
    if (seenSlugs.has(game.slug)) {
      errors.push(`Duplicate game slug found: ${game.slug}`);
    }
    seenSlugs.add(game.slug);

    if (game.slug !== expectedSlugs[index]) {
      errors.push(
        `Game at index ${index} has unexpected slug: ${game.slug} (expected ${expectedSlugs[index]})`
      );
    }

    const expectedCount =
      catalogMetadata.expectedOfferCounts[
        game.slug as keyof typeof catalogMetadata.expectedOfferCounts
      ];
    if (game.offers.length !== expectedCount) {
      errors.push(
        `Game ${game.slug} expected ${expectedCount} offers, got ${game.offers.length}`
      );
    }

    const seenLabels = new Set<string>();
    game.offers.forEach((offer, oIndex) => {
      if (typeof offer.label !== "string" || offer.label.trim() === "") {
        errors.push(`Game ${game.slug} offer ${oIndex} has invalid label`);
      } else {
        if (seenLabels.has(offer.label)) {
          errors.push(`Game ${game.slug} has duplicate offer label: ${offer.label}`);
        }
        seenLabels.add(offer.label);
      }

      if (
        typeof offer.price !== "number" ||
        isNaN(offer.price) ||
        !Number.isInteger(offer.price) ||
        offer.price <= 0
      ) {
        errors.push(
          `Game ${game.slug} offer ${oIndex} (${offer.label}) has invalid price (must be positive integer): ${offer.price}`
        );
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
