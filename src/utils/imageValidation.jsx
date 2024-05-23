const fallbackImage =
  "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&fit=crop&h=900&q=80&w=1600";

const fetchAndCacheRandomImageUrl = async () => {
  const cachedImage = localStorage.getItem("randomImageUrl");
  const cacheTimestamp = localStorage.getItem("cacheTimestamp");
  const cacheValidityPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  if (
    cachedImage &&
    cacheTimestamp &&
    Date.now() - cacheTimestamp < cacheValidityPeriod
  ) {
    return cachedImage;
  }

  const randomImageUrl = "https://source.unsplash.com/random";
  try {
    const response = await fetch(randomImageUrl, { method: "HEAD" });
    const url = response.url;

    localStorage.setItem("randomImageUrl", url);
    localStorage.setItem("cacheTimestamp", Date.now());

    return url;
  } catch (error) {
    console.error("Error fetching random image:", error);
    return fallbackImage;
  }
};

export const getValidImageUrl = async (url) => {
  if (!url) {
    return await fetchAndCacheRandomImageUrl();
  }

  const validateImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  const isValid = await validateImageUrl(url);

  return isValid ? url : fallbackImage;
};
