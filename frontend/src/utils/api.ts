// Helper function to get the correct API base URL
export const getApiBaseUrl = (): string => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1337/graphql';
  return apiUrl.replace('/graphql', '');
};

// Helper function to get full image URL
export const getImageUrl = (imagePath?: string): string => {
  if (!imagePath) return 'https://via.placeholder.com/400x400?text=No+Image';
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // Otherwise, prepend API base URL
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${imagePath}`;
};
