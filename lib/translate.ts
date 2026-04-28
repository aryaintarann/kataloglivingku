export async function translateToEn(text: string): Promise<string> {
  if (!text || !text.trim()) return text;
  const truncated = text.slice(0, 800);
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(truncated)}&langpair=id|en`;
  try {
    const res = await fetch(url, { next: { revalidate: false } });
    if (!res.ok) return text;
    const data = await res.json();
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText as string;
    }
  } catch {
    // fallback to original
  }
  return text;
}

export async function translateArrayToEn(items: string[]): Promise<string[]> {
  return Promise.all(items.map(translateToEn));
}
