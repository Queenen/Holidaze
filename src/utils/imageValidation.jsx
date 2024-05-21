const fallbackImage =
  "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&fit=crop&h=900&q=80&w=1600";

export const getValidImageUrl = async (url) => {
  // Check for an empty URL and return the fallback image immediately
  if (!url) {
    return fallbackImage;
  }

  // Function to validate an image URL
  const validateImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  // Validate the image URL
  const isValid = await validateImageUrl(url);

  // Return the valid URL or fallback image
  return isValid ? url : fallbackImage;
};
