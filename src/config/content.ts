import type { ImageMetadata } from "astro";
import { siteConfig } from "./site";

import mark from "../assets/images/mark.svg";
import noren from "../assets/images/IMG_1475.JPG";
import menuUnagi from "../assets/images/IMG_1479.JPG";
import menuSoba from "../assets/images/IMG_1478.JPG";
import menuCourse from "../assets/images/IMG_1480.JPG";
import menuTakeout from "../assets/images/IMG_1481.JPG";
import interiorTatamiA from "../assets/images/IMG_1472.JPG";
import interiorTatamiB from "../assets/images/IMG_1473.JPG";
import interiorCounter from "../assets/images/IMG_1474.JPG";
import interiorTableA from "../assets/images/IMG_1476.JPG";
import interiorTableB from "../assets/images/IMG_1477.JPG";

type NavItem = { label: string; href: string };
export type Price = { label?: string; value: string; note?: string };
export type MenuItem = { name: string; prices: Price[]; description?: string };
export type MenuGroup = {
  id: string;
  title: string;
  titleEn: string;
  image: ImageMetadata;
  imageAlt: string;
  items: MenuItem[];
};

export const content = {
  header: {
    logo: {
      src: mark,
      alt: siteConfig.name,
      href: "#top",
    },
    nav: [
      { label: "お品書き", href: "#menu" },
      { label: "店内", href: "#interior" },
      { label: "店舗情報", href: "#info" },
      { label: "アクセス", href: "#access" },
    ] satisfies NavItem[],
  },
  hero: {
    image: noren,
    imageAlt: "麻布家の暖簾。筆文字の「う」",
    eyebrow: "うなぎと鶏と蕎麦",
    title: "麻布家",
    lead: "宮崎神宮の門前。九州産うなぎと、宮崎県産ひのひかり。",
  },
  menu: {
    en: "Menu",
    ja: "お品書き",
    lead: "重、丼、膳、蕎麦、弁当。うなぎを、それぞれの形で。",
    note: "九州産のうなぎを使用。お米は宮崎県産のひのひかり。お米の量はお気軽にお申し付けください。",
    groups: [
      {
        id: "unagi",
        title: "うなぎ",
        titleEn: "Unagi",
        image: menuUnagi,
        imageAlt: "地焼きうなぎ重、特上うなぎ重、うなぎ楽焼膳、うなぎ丼",
        items: [
          {
            name: "地焼きうなぎ重",
            prices: [
              { label: "特上", value: "3,750円" },
              { label: "上", value: "3,300円" },
            ],
          },
          {
            name: "特上うなぎ重",
            prices: [{ value: "3,750円" }],
          },
          {
            name: "うなぎ楽焼膳",
            prices: [{ value: "3,400円" }],
            description: "焼き上げたうなぎを楽焼の器で蒸し上げる一膳。",
          },
          {
            name: "うなぎ丼",
            prices: [
              { label: "特上", value: "2,750円" },
              { label: "上", value: "2,300円" },
            ],
          },
        ],
      },
      {
        id: "soba",
        title: "蕎麦",
        titleEn: "Soba",
        image: menuSoba,
        imageAlt: "うなぎ重もり蕎麦、特大海老天ぷらもり蕎麦、つけ鶏蕎麦うなぎ飯、鶏なんばん蕎麦うなぎ飯",
        items: [
          {
            name: "うなぎ重もり蕎麦",
            prices: [
              { label: "特上", value: "3,100円" },
              { label: "上", value: "2,600円" },
            ],
          },
          {
            name: "特大海老天ぷらもり蕎麦",
            prices: [{ value: "2,200円", note: "海老2尾" }],
          },
          {
            name: "つけ鶏蕎麦うなぎ飯",
            prices: [{ value: "1,900円" }],
          },
          {
            name: "鶏なんばん蕎麦うなぎ飯",
            prices: [{ value: "1,900円" }],
          },
        ],
      },
      {
        id: "course",
        title: "御膳・会席",
        titleEn: "Course",
        image: menuCourse,
        imageAlt: "麻布家鰻御膳と麻布家贅沢会席",
        items: [
          {
            name: "麻布家鰻御膳",
            prices: [{ value: "5,000円" }],
            description: "上質な九州産のうなぎを、調理の技術をいかした鰻御膳。",
          },
          {
            name: "麻布家贅沢会席",
            prices: [{ value: "5,000円〜6,000円" }],
            description:
              "宮崎産地鶏と九州産うなぎを堪能する特別会席。お造りは鳥刺し、うなぎご飯または蕎麦をお好みで。",
          },
        ],
      },
      {
        id: "takeout",
        title: "お持ち帰り",
        titleEn: "Takeout",
        image: menuTakeout,
        imageAlt: "うなぎ弁当、蒲焼、白焼き、巻き玉子、地鶏、生そば",
        items: [
          {
            name: "特上うなぎ重 呉汁付き",
            prices: [{ value: "3,800円", note: "うなぎ6カット" }],
          },
          {
            name: "うなぎ重 呉汁付き",
            prices: [{ value: "2,900円", note: "うなぎ4カット" }],
          },
          {
            name: "特盛うなぎ弁当",
            prices: [{ value: "3,500円", note: "うなぎ6カット" }],
          },
          {
            name: "うなぎ弁当",
            prices: [{ value: "2,600円", note: "うなぎ4カット" }],
          },
          {
            name: "うなぎ白焼き",
            prices: [{ value: "2,400円" }],
          },
          {
            name: "うなぎ蒲焼",
            prices: [{ value: "2,500円" }],
          },
          {
            name: "特大うなぎ巻き玉子",
            prices: [{ value: "1,800円" }],
          },
          {
            name: "地鶏もも炭火焼き",
            prices: [{ value: "1,500円" }],
          },
          {
            name: "生そば 2人前",
            prices: [{ value: "1,200円" }],
          },
        ],
      },
    ] as MenuGroup[],
  },
  interior: {
    en: "Interior",
    ja: "店内",
    photos: [
      { src: noren, alt: "筆文字の暖簾" },
      { src: interiorCounter, alt: "カウンター席" },
      { src: interiorTatamiA, alt: "座敷席" },
      { src: interiorTatamiB, alt: "座敷席" },
      { src: interiorTableA, alt: "テーブル席" },
      { src: interiorTableB, alt: "テーブル席" },
    ],
  },
};
