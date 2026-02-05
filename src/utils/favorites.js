export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const toggleFavorite = (id) => {
  const favorites = getFavorites();

  if (favorites.includes(id)) {
    const updated = favorites.filter((favId) => favId !== id);
    saveFavorites(updated);
    return updated;
  } else {
    const updated = [...favorites, id];
    saveFavorites(updated);
    return updated;
  }
};
