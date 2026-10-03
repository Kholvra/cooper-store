# Game Top-Up Seed Data

Reference data for the generic **Web Store dan Automasi Top-Up Game** case study.

This file is intended for mock storefront seeding. It is **not** a production catalog, payment integration, game API, or guarantee of current pricing.

## Usage rules

- `priceIdr` is the observed `Dari` price on the referenced Codashop Indonesia catalog page.
- Prices and promotions can change. Re-check the source before using this data in production.
- Use dummy player identifiers in fixtures and demos.
- The checkout remains simulated; do not send real payments or game credits from seed data.
- For MLBB, `amount` is the total Diamond amount, while `baseAmount` and `bonusAmount` preserve the package composition shown by the source.
- For PUBG Mobile, the referenced catalog sells UC vouchers; the source page does not collect a player ID during checkout. A Game ID is used later when redeeming through Midasbuy.

## Normalized seed data

```json
{
  "catalogVersion": 1,
  "currency": "IDR",
  "games": [
    {
      "id": "mlbb",
      "name": "Mobile Legends: Bang Bang",
      "slug": "mobile-legends",
      "currency": {
        "code": "diamond",
        "label": "Diamond",
        "labelPlural": "Diamonds"
      },
      "playerInput": {
        "type": "user-zone",
        "required": true,
        "fields": [
          {
            "key": "userId",
            "label": "User ID",
            "inputMode": "numeric",
            "example": "12345678"
          },
          {
            "key": "zoneId",
            "label": "Zone ID",
            "inputMode": "numeric",
            "example": "1234"
          }
        ],
        "formatHint": "UserID(ZoneID), contoh: 12345678(1234)"
      },
      "paymentMethods": [
        "gopay",
        "dana",
        "qris",
        "bank-transfer",
        "shopeepay",
        "ovo",
        "kredivo",
        "indomaret",
        "indosat",
        "alfamart",
        "credit-card",
        "tri",
        "xl",
        "linkaja",
        "doku-wallet"
      ],
      "products": [
        {
          "id": "mlbb-diamond-5",
          "kind": "currency",
          "label": "5 Diamonds",
          "amount": 5,
          "baseAmount": 5,
          "bonusAmount": 0,
          "priceIdr": 1687
        },
        {
          "id": "mlbb-diamond-12",
          "kind": "currency",
          "label": "12 Diamonds",
          "amount": 12,
          "baseAmount": 11,
          "bonusAmount": 1,
          "priceIdr": 3823
        },
        {
          "id": "mlbb-diamond-19",
          "kind": "currency",
          "label": "19 Diamonds",
          "amount": 19,
          "baseAmount": 17,
          "bonusAmount": 2,
          "priceIdr": 6006
        },
        {
          "id": "mlbb-diamond-28",
          "kind": "currency",
          "label": "28 Diamonds",
          "amount": 28,
          "baseAmount": 25,
          "bonusAmount": 3,
          "priceIdr": 8736
        },
        {
          "id": "mlbb-diamond-44",
          "kind": "currency",
          "label": "44 Diamonds",
          "amount": 44,
          "baseAmount": 40,
          "bonusAmount": 4,
          "priceIdr": 13105
        },
        {
          "id": "mlbb-diamond-59",
          "kind": "currency",
          "label": "59 Diamonds",
          "amount": 59,
          "baseAmount": 53,
          "bonusAmount": 6,
          "priceIdr": 17472
        },
        {
          "id": "mlbb-diamond-85",
          "kind": "currency",
          "label": "85 Diamonds",
          "amount": 85,
          "baseAmount": 77,
          "bonusAmount": 8,
          "priceIdr": 25116
        },
        {
          "id": "mlbb-diamond-170",
          "kind": "currency",
          "label": "170 Diamonds",
          "amount": 170,
          "baseAmount": 154,
          "bonusAmount": 16,
          "priceIdr": 50232
        },
        {
          "id": "mlbb-diamond-240",
          "kind": "currency",
          "label": "240 Diamonds",
          "amount": 240,
          "baseAmount": 217,
          "bonusAmount": 23,
          "priceIdr": 70980
        },
        {
          "id": "mlbb-diamond-296",
          "kind": "currency",
          "label": "296 Diamonds",
          "amount": 296,
          "baseAmount": 256,
          "bonusAmount": 40,
          "priceIdr": 87360
        },
        {
          "id": "mlbb-diamond-408",
          "kind": "currency",
          "label": "408 Diamonds",
          "amount": 408,
          "baseAmount": 367,
          "bonusAmount": 41,
          "priceIdr": 120121
        },
        {
          "id": "mlbb-diamond-568",
          "kind": "currency",
          "label": "568 Diamonds",
          "amount": 568,
          "baseAmount": 503,
          "bonusAmount": 65,
          "priceIdr": 163800
        },
        {
          "id": "mlbb-diamond-875",
          "kind": "currency",
          "label": "875 Diamonds",
          "amount": 875,
          "baseAmount": 774,
          "bonusAmount": 101,
          "priceIdr": 251160
        },
        {
          "id": "mlbb-diamond-2010",
          "kind": "currency",
          "label": "2010 Diamonds",
          "amount": 2010,
          "baseAmount": 1708,
          "bonusAmount": 302,
          "priceIdr": 546000
        },
        {
          "id": "mlbb-diamond-4830",
          "kind": "currency",
          "label": "4830 Diamonds",
          "amount": 4830,
          "baseAmount": 4003,
          "bonusAmount": 827,
          "priceIdr": 1310400
        }
      ]
    },
    {
      "id": "free-fire",
      "name": "Free Fire",
      "slug": "free-fire",
      "currency": {
        "code": "diamond",
        "label": "Diamond",
        "labelPlural": "Diamonds"
      },
      "playerInput": {
        "type": "player-id",
        "required": true,
        "fields": [
          {
            "key": "playerId",
            "label": "Player ID",
            "inputMode": "numeric",
            "example": "1234567890"
          }
        ],
        "formatHint": "Angka Player ID, contoh sumber: 5363266446"
      },
      "paymentMethods": [
        "gopay",
        "dana",
        "qris",
        "bank-transfer",
        "shopeepay",
        "kredivo",
        "indomaret",
        "alfamart",
        "linkaja",
        "doku-wallet"
      ],
      "products": [
        {
          "id": "free-fire-diamond-5",
          "kind": "currency",
          "label": "5 Diamonds",
          "amount": 5,
          "priceIdr": 901
        },
        {
          "id": "free-fire-diamond-12",
          "kind": "currency",
          "label": "12 Diamonds",
          "amount": 12,
          "priceIdr": 1802
        },
        {
          "id": "free-fire-diamond-50",
          "kind": "currency",
          "label": "50 Diamonds",
          "amount": 50,
          "priceIdr": 7207
        },
        {
          "id": "free-fire-diamond-70",
          "kind": "currency",
          "label": "70 Diamonds",
          "amount": 70,
          "priceIdr": 9009
        },
        {
          "id": "free-fire-diamond-140",
          "kind": "currency",
          "label": "140 Diamonds",
          "amount": 140,
          "priceIdr": 18018
        },
        {
          "id": "free-fire-diamond-355",
          "kind": "currency",
          "label": "355 Diamonds",
          "amount": 355,
          "priceIdr": 45045
        },
        {
          "id": "free-fire-diamond-720",
          "kind": "currency",
          "label": "720 Diamonds",
          "amount": 720,
          "priceIdr": 90090
        },
        {
          "id": "free-fire-diamond-1450",
          "kind": "currency",
          "label": "1450 Diamonds",
          "amount": 1450,
          "priceIdr": 180180
        },
        {
          "id": "free-fire-diamond-2180",
          "kind": "currency",
          "label": "2180 Diamonds",
          "amount": 2180,
          "priceIdr": 270270
        },
        {
          "id": "free-fire-diamond-3640",
          "kind": "currency",
          "label": "3640 Diamonds",
          "amount": 3640,
          "priceIdr": 450450
        },
        {
          "id": "free-fire-diamond-7290",
          "kind": "currency",
          "label": "7290 Diamonds",
          "amount": 7290,
          "priceIdr": 900901
        },
        {
          "id": "free-fire-diamond-36500",
          "kind": "currency",
          "label": "36500 Diamonds",
          "amount": 36500,
          "priceIdr": 4504505
        },
        {
          "id": "free-fire-diamond-73100",
          "kind": "currency",
          "label": "73100 Diamonds",
          "amount": 73100,
          "priceIdr": 9009009
        }
      ],
      "relatedProducts": [
        {
          "id": "free-fire-booyah-pass-premium",
          "kind": "pass",
          "label": "Booyah Pass Premium",
          "priceCurrency": "diamond",
          "amount": 399,
          "priceIdr": null
        },
        {
          "id": "free-fire-booyah-pass-premium-plus",
          "kind": "pass",
          "label": "Booyah Pass Premium Plus",
          "priceCurrency": "diamond",
          "amount": 899,
          "priceIdr": null
        }
      ]
    },
    {
      "id": "pubg-mobile",
      "name": "PUBG Mobile",
      "slug": "pubg-mobile",
      "currency": {
        "code": "uc",
        "label": "UC",
        "labelPlural": "UC"
      },
      "playerInput": {
        "type": "game-id",
        "required": false,
        "fields": [
          {
            "key": "gameId",
            "label": "Game ID",
            "inputMode": "numeric",
            "example": "1234567890"
          }
        ],
        "formatHint": "Codashop sells UC vouchers; Game ID is used during Midasbuy redemption."
      },
      "paymentMethods": [
        "gopay",
        "dana",
        "qris",
        "bank-transfer",
        "shopeepay",
        "ovo",
        "kredivo",
        "indomaret",
        "alfamart",
        "credit-card",
        "linkaja",
        "doku-wallet",
        "codacash"
      ],
      "products": [
        {
          "id": "pubg-mobile-uc-60",
          "kind": "voucher",
          "label": "60 UC",
          "amount": 60,
          "priceIdr": 19000
        },
        {
          "id": "pubg-mobile-uc-325",
          "kind": "voucher",
          "label": "325 UC",
          "amount": 325,
          "priceIdr": 95000
        },
        {
          "id": "pubg-mobile-uc-660",
          "kind": "voucher",
          "label": "660 UC",
          "amount": 660,
          "priceIdr": 190000
        },
        {
          "id": "pubg-mobile-uc-1800",
          "kind": "voucher",
          "label": "1800 UC",
          "amount": 1800,
          "priceIdr": 475000
        },
        {
          "id": "pubg-mobile-uc-3850",
          "kind": "voucher",
          "label": "3850 UC",
          "amount": 3850,
          "priceIdr": 950000
        },
        {
          "id": "pubg-mobile-uc-8100",
          "kind": "voucher",
          "label": "8100 UC",
          "amount": 8100,
          "priceIdr": 1900000
        }
      ],
      "relatedProducts": [
        {
          "id": "pubg-mobile-royale-pass-660-uc",
          "kind": "pass-reference",
          "label": "Royale Pass Elite",
          "priceCurrency": "uc",
          "amount": 660,
          "priceIdr": null
        },
        {
          "id": "pubg-mobile-royale-pass-1800-uc",
          "kind": "pass-reference",
          "label": "Royale Pass Elite Plus",
          "priceCurrency": "uc",
          "amount": 1800,
          "priceIdr": null
        }
      ]
    }
  ]
}
```

## Source notes

The package denominations, identifier hints, payment-method labels, and observed prices were collected from these Indonesia catalog pages:

- [Codashop Indonesia — Mobile Legends: Bang Bang](https://www.codashop.com/id-id/mobile-legends)
- [Codashop Indonesia — Free Fire](https://www.codashop.com/id-id/free-fire)
- [Codashop Indonesia — PUBG Mobile UC Redeem Code](https://www.codashop.com/id-id/pubg-mobile-uc-redeem-code)

The source pages are top-up storefront references, not game APIs. Their promotional prices, availability, bonuses, and FAQs can change independently of this repository.
