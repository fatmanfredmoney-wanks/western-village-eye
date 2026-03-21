#!/usr/bin/env tsx
/**
 * Sanity Migration Script: Import Volume 1, Edition 1
 * 
 * This script creates:
 * - Volume 1 document
 * - 9 Article documents
 * - Edition 1 document with references to all articles
 * 
 * Before running:
 * 1. Go to https://www.sanity.io/manage/personal/project/osrppxu6
 * 2. Go to Settings > API > Tokens
 * 3. Create a new token with "Editor" or "Admin" permissions
 * 4. Set the token as an environment variable:
 *    export SANITY_API_TOKEN="your-token-here"
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { join } from "path";

// Configuration
const projectId = "osrppxu6";
const dataset = "production";
const apiVersion = "2024-01-01";

const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("❌ Missing SANITY_API_TOKEN environment variable");
  console.error("\nPlease create a token:");
  console.error("1. Go to https://www.sanity.io/manage/personal/project/osrppxu6");
  console.error("2. Settings > API > Tokens");
  console.error("3. Create new token with Editor/Admin permissions");
  console.error("4. Run: export SANITY_API_TOKEN=\"your-token-here\"");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

// Article data in order
const articles = [
  {
    title: "Skeleton",
    slug: "skeleton",
    excerpt: "Throwing out basic starter ideas for The Western Village Eye.",
    content: `The Vail Daily is leftist and it is the only news source in the valley. What's worse is that it tries to present itself as objective. A friend called it the Fail Daily but it isn't a failure, it's very successful and that's part of the problem.

We want to offer an alternative opinion. I don't want my home town turning into a socialist or communist shit hole.

Things to Include in Each Edition:

- Intro for Edition 1
- Opinions on Valley Living
- Opinions on current events (in the valley, Colorado, USA, world)
- Eagle County history
- Where the best huevos rancheros are
- Great restaurants
- Movies to watch
- Shows to watch
- Books to read
- Crypto education
- Money education
- Freedom education/thoughts
- Gun education
- Highlight positive people and organizations in the valley
- Art talk and display
- Sponsors
- The future: makerspace, tech, DIY, privacy`,
  },
  {
    title: "Intro",
    slug: "intro",
    excerpt: "A little background from the editor, born and raised in the Vail Valley.",
    content: `A little background, but not too much. I grew up in the Vail Valley. (Or Eagle Valley but I prefer the way Vail Valley sounds.) Born and raised. I left the Valley for some years after graduating from University. I'm back now I've got some complaints.

Why are so many people voting left? Why is there so many god damn socialist and communists here? Why is everyone so fucking weak now? A bunch of whiners.

The town has grown incredibly since I grew up. Eagle and Gypsum are insane these days. It hurts one's heart to see but I know as long as it's a great place to live you can't stop its growth. It has its pros and cons.

I want it to grow into a freedom loving place with a high standard of living.`,
  },
  {
    title: "Opinions",
    slug: "opinions-iran-war",
    excerpt: "Thoughts on the current war in Iran and geopolitical strategy.",
    content: `I don't know what to think about the current war in Iran. I've heard, read, and seen so many different takes on it I am having trouble coming to any conclusions about it. It seems reliably true that the Supreme Leader, the Ayatollah, was a brutal dictator who killed and tortured many of his citizens for unjust reasons. It seems he was unpopular but I can't tell how unpopular. Do I believe that's the real reason why Trump decided to attack Iran with missiles alongside Israel? No I don't. I think makes a lot of sense in terms of geopolitical strategy, and empire. Iran has lots of oil, and a lot of that oil supposedly goes to China. Weakening one of China's main suppliers of oil helps U.S.A.

Then there's the Israel question. I hope it's not true but it seems like Israel and its intelligence apparatus have infiltrated government of USA at the highest levels. It's possible that they heavily influenced Trump into making the decision. Iran is the main enemy of Israel in the Middle East, if they are removed not much can stop Israel from expanding in the region.

The Saudi's gave Trump a couple billion dollars or something to the tune of and they also want/would benefit from the destruction of Iran.

Now for some less mainstream takes. The religious aspect. Just about everything that happens in the Middle East is religious somehow. Many people on social media think that the war is biblical. Whether its the Jews, the Zionists in particular, enacting their version of crusade or Ji-Had, or the Christians creating an end of world situations in order to cause Jesus to return and save the world, or possibly a Muslim Ji-had to take back Mecca from the Infidels. Even crazier sounding is the popular theory online that the Ashkenazi Jews, who supposedly aren't genealogical Jews but converts from the Khazar empire, want to create Pax Judaica as part of their grand scheme of a one world government.`,
  },
  {
    title: "Valley Living",
    slug: "valley-living-housing-crisis",
    excerpt: "The housing crisis in the Valley - an alternative perspective.",
    content: `Yes houses are expensive in the Valley. Cost of living is expensive in the Valley. Why does this surprise anyone? It's a relatively small area in high demand. I have driven through the Miller Ranch neighborhood many times and it always surprises me how these "struggling" people and families have new fancy expensive cars in their deed restricted houses. Anyone has the right to move here, but no one is entitled to a life of luxury. Do you really think the government can solve this?

Here's an idea: build a bunch of "affordable houses" using tax payer money so that more "locals" can live and work here. What will happen? The population of workers increases. What else will happen? Wages will remain the same or go down as the labor supply increases. Here's another idea: Don't build "affordable" housing, the number of workers in the valley goes down or remains the same, and wages go up as demand for workers increases. So what is the problem you want to solve with the Regional Housing Authority? Building "affordable housing" (which still isn't affordable hence the "") will not make living in the Valley more affordable for blue collar workers. It will increase traffic and increase environmental strain and damage to the Valley ecosystem. The Valley will continue to grow and so will the gap between the "rich" and "poor."`,
  },
  {
    title: "Huevos Rancheros in the Valley",
    slug: "huevos-rancheros",
    excerpt: "A culinary investigation into the best huevos rancheros in the Valley.",
    content: `In my opinion, and I am aware no one is asking, the best tasting Huevos Rancheros in the Valley that I have tried as of March 2026 are at Cafe 163. The only problem is that the portion is small is price is a little high.

The second best Huevos Rancheros in the Valley that I tried is at Route 6 Cafe. The only problem is that now you can only get them there on weekends.

The third best Huevos Rancheros that I tried in the Valley is probably at Fiesta Jalisco. The problem here is that the Huevos Rancheros are just normal but if order it with carne asada, the carne asada is soooo delicious.

Runner up would be Fiesta's, who have a great bang for your buck Huevos Rancheros but consistency is lacking, sometimes amazing, sometimes not so much.`,
  },
  {
    title: "Books to Read",
    slug: "books-to-read",
    excerpt: "For those who still know how: Snow Crash, Antifragile, and Blood in the Streets.",
    content: `1. Snow Crash by Neal Stephenson

2. Antifragile: Things That Gain from Disorder by Nassim Nicholas Taleb

3. Blood in the Streets: Investment Profits in a World Gone Mad by James Dale Davidson and William Rees-Mogg`,
  },
  {
    title: "Movies Worth Your Time",
    slug: "movies-worth-your-time",
    excerpt: "Three films worth watching: The Matrix, Ghost in the Shell, and Perfume.",
    content: `1. The Matrix (the first one)

2. Ghost in the Shell

3. Perfume`,
  },
  {
    title: "Shows Worth Your Time",
    slug: "shows-worth-your-time",
    excerpt: "Three series worth binge-watching: Slow Horses, Cowboy Bebop, The Sopranos.",
    content: `1. Slow Horses

2. Cowboy Bebop (original version)

3. The Sopranos`,
  },
  {
    title: "Crypto 101",
    slug: "crypto-101",
    excerpt: "A brief introduction to Bitcoin, mining, and the difference between crypto and fiat.",
    content: `Bitcoin first.

How does it work?
Why is it unique?
How to store it?

Resources:
- What is BTC: https://www.youtube.com/watch?v=Js6qesKGzp8
- BTC Mining: https://www.youtube.com/watch?v=mrtSAgcpack
- What is Fiat: https://www.youtube.com/watch?v=7n6Dwrt0y1Y

A Brief Introduction to Bitcoin:

To understand Bitcoin, it helps to first understand money and how it works today. Most of the money people use today—like dollars, euros, or yen—is fiat money. Fiat currency is money issued and controlled by governments and central banks. Its value comes from government authority (monopoly on violence) and public trust, and governments along with central banks can create more of it whenever they choose. Because new money can be printed, the supply is not fixed and inflation can occur over time.

Bitcoin was created as an alternative to this system. Bitcoin is a digital currency that operates without banks or governments. Instead of a central authority controlling it, Bitcoin runs on a decentralized network of computers around the world. This network records transactions in a digital public ledger called the blockchain.

Transactions are verified through a process called Bitcoin mining. In mining, powerful computers compete to solve complex cryptographic puzzles. The first computer to solve the puzzle confirms a new "block" of transactions and adds it to the blockchain. As a reward for securing the network, the miner receives newly created bitcoin plus transaction fees.

Unlike fiat currencies, Bitcoin has a limited supply. The system is designed so that only 21 million bitcoins will ever exist, making it scarce.

In summary:
- Fiat money: Government-issued money with an expandable supply.
- Bitcoin: A decentralized digital currency with no central authority.
- Mining: The process that secures the network and creates new bitcoins.
- Blockchain: The digital public ledger that records all Bitcoin transactions.`,
  },
];

// Helper function to convert text to Portable Text blocks
function textToPortableText(text: string) {
  const paragraphs = text.split("\n\n").filter((p) => p.trim());
  return paragraphs.map((paragraph) => ({
    _type: "block" as const,
    children: [
      {
        _type: "span" as const,
        text: paragraph,
      },
    ],
  }));
}

async function main() {
  console.log("🚀 Starting Sanity migration for Volume 1, Edition 1...\n");

  try {
    // Step 1: Create or find Volume 1
    console.log("📚 Creating Volume 1...");
    let volume = await client.fetch('*[_type == "volume" && volumeNumber == 1][0]');
    
    if (volume) {
      console.log("   ✓ Volume 1 already exists");
    } else {
      volume = await client.create({
        _type: "volume",
        volumeNumber: 1,
        year: "2026",
        description: "First volume of The Western Village Eye",
      });
      console.log("   ✓ Volume 1 created");
    }

    // Step 2: Create articles
    console.log("\n📰 Creating articles...");
    const articleIds = [];
    
    for (const articleData of articles) {
      const existingArticle = await client.fetch(
        '*[_type == "article" && slug.current == $slug][0]',
        { slug: articleData.slug }
      );

      if (existingArticle) {
        console.log(`   ⚠️  Article "${articleData.title}" already exists, skipping`);
      } else {
        const article = await client.create({
          _type: "article",
          title: articleData.title,
          author: "Decent Stick",
          slug: {
            _type: "slug",
            current: articleData.slug,
          },
          excerpt: articleData.excerpt,
          content: textToPortableText(articleData.content),
        });
        articleIds.push(article._id);
        console.log(`   ✓ Created: ${articleData.title}`);
      }
    }

    // Step 3: Create Edition 1
    console.log("\n📖 Creating Edition 1...");
    const existingEdition = await client.fetch(
      '*[_type == "edition" && slug.current == "volume-1-edition-1"][0]'
    );

    if (existingEdition) {
      console.log("   ⚠️  Edition 1 already exists, skipping");
    } else {
      await client.create({
        _type: "edition",
        editionNumber: 1,
        volume: {
          _type: "reference",
          _ref: volume._id,
        },
        publishedDate: "2026-03-13",
        slug: {
          _type: "slug",
          current: "volume-1-edition-1",
        },
        articles: articleIds.map((id) => ({
          _type: "reference",
          _ref: id,
        })),
      });
      console.log("   ✓ Edition 1 created with all articles");
    }

    console.log("\n✅ Migration complete!");
    console.log("\nNext steps:");
    console.log("1. Upload cover image manually in Sanity Studio");
    console.log("2. Go to https://www.sanity.io/manage/personal/project/osrppxu6");
    console.log("3. Navigate to Edition 1 and add the cover image");
    
  } catch (error) {
    console.error("\n❌ Error during migration:", error);
    process.exit(1);
  }
}

main();
