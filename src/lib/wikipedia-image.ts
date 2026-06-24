import { db } from "@/db";
import { vehicleImageCache } from "@/db/schema";
import { eq, and } from "drizzle-orm";

async function fetchWikipediaImage(query: string, lang = "ru"): Promise<string | null> {
  try {
    const searchUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const firstResult = searchData.query?.search?.[0];
    if (!firstResult) return null;

    const title = firstResult.title;
    const imgUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=original&titles=${encodeURIComponent(title)}&format=json&origin=*`;
    const imgRes = await fetch(imgUrl);
    if (!imgRes.ok) return null;
    const imgData = await imgRes.json();
    
    const pages = imgData.query?.pages || {};
    const pageId = Object.keys(pages)[0];
    if (pageId && pages[pageId]?.original?.source) {
      return pages[pageId].original.source;
    }
  } catch (error) {
    console.error(`Failed to fetch Wikipedia image for ${query} (lang: ${lang}):`, error);
  }
  return null;
}

export async function getCarImageUrl(make: string, model: string): Promise<string | null> {
  const cleanMake = make.trim().toLowerCase();
  const cleanModel = model.trim().toLowerCase();

  // 1. Check database cache
  try {
    const [cached] = await db
      .select()
      .from(vehicleImageCache)
      .where(
        and(
          eq(vehicleImageCache.make, cleanMake),
          eq(vehicleImageCache.model, cleanModel)
        )
      )
      .limit(1);

    if (cached) {
      return cached.imageUrl || null;
    }
  } catch (dbError) {
    console.error("Failed to read vehicle image cache from DB:", dbError);
  }

  // 2. Query Wikipedia (first in Russian, then in English)
  const searchQuery = `${make} ${model}`;
  let imageUrl = await fetchWikipediaImage(searchQuery, "ru");
  
  if (!imageUrl) {
    imageUrl = await fetchWikipediaImage(searchQuery, "en");
  }

  // If still not found, try searching with make and model together as a broader search
  if (!imageUrl && model.toLowerCase().includes(make.toLowerCase())) {
    imageUrl = await fetchWikipediaImage(model, "ru");
    if (!imageUrl) {
      imageUrl = await fetchWikipediaImage(model, "en");
    }
  }

  // If no image found, fallback to DeLorean DMC-12 as a cool easter egg / default vehicle photo
  if (!imageUrl) {
    try {
      imageUrl = await fetchWikipediaImage("DeLorean DMC-12", "en");
    } catch (fallbackError) {
      console.error("Failed to fetch DeLorean fallback image:", fallbackError);
    }
  }

  // Save string (empty if not found) to prevent repeated failed requests
  const urlToSave = imageUrl || "";

  // 3. Write to database cache
  try {
    await db.insert(vehicleImageCache).values({
      make: cleanMake,
      model: cleanModel,
      imageUrl: urlToSave,
    });
  } catch (dbError) {
    console.error("Failed to save vehicle image URL to cache DB:", dbError);
  }

  return imageUrl || null;
}
