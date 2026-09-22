import { content } from "../config/content";
import { siteConfig } from "../config/site";

const yenNumbers = (value: string): number[] =>
  [...value.matchAll(/[\d,]+/g)].map((match) => Number(match[0].replaceAll(",", "")));

const offerFromPrice = (price: { label?: string; value: string; note?: string }) => {
  const nums = yenNumbers(price.value);
  if (nums.length === 0) return null;

  const name = [price.label, price.note].filter(Boolean).join(" ");

  if (nums.length > 1 || price.value.includes("〜")) {
    return {
      "@type": "AggregateOffer",
      priceCurrency: "JPY",
      lowPrice: String(Math.min(...nums)),
      highPrice: String(Math.max(...nums)),
      name: name || undefined,
    };
  }

  return {
    "@type": "Offer",
    priceCurrency: "JPY",
    price: String(nums[0]),
    name: name || undefined,
  };
};

export const buildRestaurantJsonLd = (canonical: string, ogImage: string) => {
  const menuSections = content.menu.groups.map((group) => ({
    "@type": "MenuSection",
    name: group.title,
    description: group.imageAlt,
    hasMenuItem: group.items.map((item) => {
      const offers = item.prices
        .map(offerFromPrice)
        .filter((offer): offer is NonNullable<typeof offer> => offer !== null);

      return {
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: offers.length === 1 ? offers[0] : offers,
      };
    }),
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${canonical}#website`,
        name: siteConfig.name,
        url: canonical,
        inLanguage: "ja",
        publisher: { "@id": `${canonical}#restaurant` },
      },
      {
        "@type": "Restaurant",
        "@id": `${canonical}#restaurant`,
        name: siteConfig.name,
        alternateName: siteConfig.alternateName,
        description: siteConfig.description,
        url: canonical,
        image: ogImage,
        telephone: siteConfig.shop.tel.intl,
        priceRange: siteConfig.shop.priceRange,
        servesCuisine: ["うなぎ", "蕎麦", "日本料理"],
        acceptsReservations: "True",
        address: {
          "@type": "PostalAddress",
          addressCountry: "JP",
          addressRegion: "宮崎県",
          addressLocality: "宮崎市",
          postalCode: siteConfig.shop.postalCode,
          streetAddress: siteConfig.shop.streetAddress,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.shop.geo.latitude,
          longitude: siteConfig.shop.geo.longitude,
        },
        hasMap: siteConfig.shop.mapUrl,
        sameAs: [siteConfig.sns.instagram],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "11:00",
            closes: "15:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "17:00",
            closes: "20:00",
          },
        ],
        hasMenu: {
          "@type": "Menu",
          "@id": `${canonical}#menu`,
          name: "お品書き",
          hasMenuSection: menuSections,
        },
      },
    ],
  };
};
