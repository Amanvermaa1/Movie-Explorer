export const getFavorites = () => {
  const stored = localStorage.getItem("favorites");
  const favorites = stored ? JSON.parse(stored) : [];
  // Ensure all IDs are numbers
  return favorites.map(id => Number(id));
};

export const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const toggleFavorite = (id) => {
  const numericId = Number(id);
  const favorites = getFavorites();

  if (favorites.includes(numericId)) {
    const updated = favorites.filter((favId) => favId !== numericId);
    saveFavorites(updated);
    return updated;
  } else {
    const updated = [...favorites, numericId];
    saveFavorites(updated);
    return updated;
  }
};
