export interface GameAssetConfig {
  slug: string;
  name: string;
  logo: string;
  item: string;
  banner?: string;
}

export const gameAssetsMap: Record<string, GameAssetConfig> = {
  mlbb: {
    slug: "mlbb",
    name: "Mobile Legends: Bang Bang",
    logo: "/games/mlbb%20logo.jpg",
    item: "/games/mlbb%20diamond.jpg",
  },
  "free-fire": {
    slug: "free-fire",
    name: "Free Fire",
    logo: "/games/Freefire%20logo.jpg",
    item: "/games/Freefire%20diamond.jpg",
  },
  "pubg-mobile": {
    slug: "pubg-mobile",
    name: "PUBG Mobile",
    logo: "/games/Pubg%20mobile%20logo.jpg",
    item: "/games/Pubg%20mobile%20item.jpg",
  },
  "genshin-impact": {
    slug: "genshin-impact",
    name: "Genshin Impact",
    logo: "/games/Genshin%20Impact%20logo.jpg",
    item: "/games/Genshin%20Impact%20item.jpg",
  },
  roblox: {
    slug: "roblox",
    name: "Roblox",
    logo: "/games/Roblox%20img.jpg",
    item: "/games/roblox%20item.jpg",
  },
  valorant: {
    slug: "valorant",
    name: "Valorant",
    logo: "/games/valorant%20logo.jpg",
    item: "/games/Valorant%20item.jpg",
  },
  "call-of-duty-mobile": {
    slug: "call-of-duty-mobile",
    name: "Call of Duty Mobile",
    logo: "/games/Call%20of%20duty%20logo.jpg",
    item: "/games/Call%20of%20duty%20item.jpg",
  },
  "delta-force-mobile": {
    slug: "delta-force-mobile",
    name: "Delta Force Mobile",
    logo: "/games/Delta%20force%20logo.jpg",
    item: "/games/Delta%20force%20item.jpg",
  },
  "blood-strike": {
    slug: "blood-strike",
    name: "Blood Strike",
    logo: "/games/Blood%20Strike%20logo.jpg",
    item: "/games/Blood%20Strike%20Item.jpg",
  },
};

export function getGameAsset(slug: string): GameAssetConfig {
  return (
    gameAssetsMap[slug] || {
      slug,
      name: slug,
      logo: "/favicon.ico",
      item: "/favicon.ico",
    }
  );
}
