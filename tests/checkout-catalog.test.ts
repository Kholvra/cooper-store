import { describe, it, expect } from 'vitest';
import { games, getOffersForGame, getGame, formatIdr } from '../src/app/_components/checkout-catalog';

describe('Checkout Catalog', () => {
  it('has exactly 9 approved games in correct order with correct IDs', () => {
    expect(games.length).toBe(9);
    const expectedIds = [
      'mlbb',
      'free-fire',
      'pubg-mobile',
      'genshin-impact',
      'roblox',
      'valorant',
      'call-of-duty-mobile',
      'delta-force-mobile',
      'blood-strike'
    ];
    games.forEach((g, idx) => {
      expect(g.id).toBe(expectedIds[idx]);
      expect(getGame(g.id)).toBe(g);
    });
  });

  it('has exact per-game offer counts matching canonical source', () => {
    expect(getOffersForGame('mlbb').length).toBe(43);
    expect(getOffersForGame('free-fire').length).toBe(34);
    expect(getOffersForGame('pubg-mobile').length).toBe(7);
    expect(getOffersForGame('genshin-impact').length).toBe(6);
    expect(getOffersForGame('roblox').length).toBe(10); // 6 robux + 4 gift cards = 10
    expect(getOffersForGame('valorant').length).toBe(6);
    expect(getOffersForGame('call-of-duty-mobile').length).toBe(15);
    expect(getOffersForGame('delta-force-mobile').length).toBe(12);
    expect(getOffersForGame('blood-strike').length).toBe(6);
  });

  it('verifies Roblox kind is voucher and others are top-up', () => {
    for (const o of getOffersForGame('roblox')) {
      expect(o.kind).toBe('voucher');
    }
    const otherGameIds = games.map(g => g.id).filter(id => id !== 'roblox');
    for (const id of otherGameIds) {
      for (const o of getOffersForGame(id)) {
        expect(o.kind).toBe('top-up');
      }
    }
  });

  it('verifies unique offer IDs and positive integer prices', () => {
    const ids = new Set<string>();
    for (const g of games) {
      for (const o of getOffersForGame(g.id)) {
        expect(ids.has(o.id)).toBe(false);
        ids.add(o.id);
        expect(typeof o.priceIdr).toBe('number');
        expect(o.priceIdr).toBeGreaterThan(0);
        expect(Number.isInteger(o.priceIdr)).toBe(true);
      }
    }
  });

  it('parses MLBB offer IDs and rejects every amount 633-1219', () => {
    const mlbbOffers = getOffersForGame('mlbb');
    for (const o of mlbbOffers) {
      const match = o.id.match(/^mlbb-(\d+)/);
      if (match) {
        const amt = parseInt(match[1]!, 10);
        expect(amt < 633 || amt > 1219).toBe(true);
      }
    }
  });

  it('verifies exact label and price sentinels for all nine games', () => {
    expect(getOffersForGame('mlbb')[0]).toEqual(expect.objectContaining({ label: '5 (5+0) Diamond', priceIdr: 1650 }));
    expect(getOffersForGame('mlbb')[42]).toEqual(expect.objectContaining({ label: '10.050 (8.540+1.510) Diamond', priceIdr: 2754700 }));

    expect(getOffersForGame('free-fire')[0]).toEqual(expect.objectContaining({ label: '5 Diamond', priceIdr: 942 }));
    expect(getOffersForGame('free-fire')[33]).toEqual(expect.objectContaining({ label: '73.100 Diamond', priceIdr: 9675861 }));

    expect(getOffersForGame('pubg-mobile')[0]).toEqual(expect.objectContaining({ label: '60 UC', priceIdr: 17017 }));
    expect(getOffersForGame('pubg-mobile')[6]).toEqual(expect.objectContaining({ label: '6.000 + 2.100 UC', priceIdr: 1734854 }));

    expect(getOffersForGame('genshin-impact')[0]).toEqual(expect.objectContaining({ label: '60 Crystals', priceIdr: 16800 }));
    expect(getOffersForGame('genshin-impact')[5]).toEqual(expect.objectContaining({ label: '6.480 + 1.600 Crystals', priceIdr: 1629000 }));

    expect(getOffersForGame('roblox')[0]).toEqual(expect.objectContaining({ label: '200 Robux', priceIdr: 87893 }));
    expect(getOffersForGame('roblox')[9]).toEqual(expect.objectContaining({ label: 'Roblox Gift Card IDR 500K', priceIdr: 493875 }));

    expect(getOffersForGame('valorant')[0]).toEqual(expect.objectContaining({ label: '475 VP', priceIdr: 56000 }));
    expect(getOffersForGame('valorant')[5]).toEqual(expect.objectContaining({ label: '11.000 VP', priceIdr: 1099000 }));

    expect(getOffersForGame('call-of-duty-mobile')[0]).toEqual(expect.objectContaining({ label: '31 CP', priceIdr: 4505 }));
    expect(getOffersForGame('call-of-duty-mobile')[14]).toEqual(expect.objectContaining({ label: '76.560 CP', priceIdr: 9009009 }));

    expect(getOffersForGame('delta-force-mobile')[0]).toEqual(expect.objectContaining({ label: '18 Delta Coins', priceIdr: 5157 }));
    expect(getOffersForGame('delta-force-mobile')[11]).toEqual(expect.objectContaining({ label: '24.300 (19.440+4.860) Delta Coins', priceIdr: 4367226 }));

    expect(getOffersForGame('blood-strike')[0]).toEqual(expect.objectContaining({ label: '100 + 5 Gold', priceIdr: 13814 }));
    expect(getOffersForGame('blood-strike')[5]).toEqual(expect.objectContaining({ label: '5.000 + 800 Gold', priceIdr: 690662 }));
  });

  it('formats IDR correctly', () => {
    expect(formatIdr(1650)).toBe('Rp 1.650');
    expect(formatIdr(1000000)).toBe('Rp 1.000.000');
  });
});
