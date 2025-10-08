import axios from "axios";

const clevelandBase = "https://openaccess-api.clevelandart.org/api/artworks/";

/**
 * Fetch artworks from Art Institute of Chicago (AIC)
 */
export const getChicagoArtworks = async (query = "", limit = 25, page = 1) => {
  const params = {
    page,
    limit,
    fields: "id,title,artist_title,date_display,image_id",
  };

  let url = "https://api.artic.edu/api/v1/artworks";

  // Use search endpoint only when query exists
  if (query) {
    url = "https://api.artic.edu/api/v1/artworks/search";
    params.q = query;
  }

  const { data } = await axios.get(url, { params });

  const artArray = query ? data.data : data.data;

  return artArray.map((art) => ({
    id: `aic-${art.id}`,
    title: art.title,
    artist: art.artist_title || "Unknown",
    year: art.date_display || "N/A",
    image: art.image_id
      ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
      : "https://via.placeholder.com/300x300?text=No+Image",
    source: "Art Institute of Chicago",
  }));
};

/**
 * Fetch artworks from Cleveland Museum of Art
 */
export const getClevelandArtworks = async (
  query = "",
  limit = 25,
  page = 1,
) => {
  const skip = (page - 1) * limit;
  const params = { limit, skip, has_image: 1 };
  if (query) params.q = query;

  const { data } = await axios.get(clevelandBase, { params });

  return data.data.map((art) => ({
    id: `cma-${art.id}`,
    title: art.title,
    artist: art.creators?.[0]?.description || "Unknown",
    year: art.creation_date || "N/A",
    image:
      art.images?.web?.url ||
      "https://via.placeholder.com/300x300?text=No+Image",
    source: "Cleveland Museum of Art",
  }));
};

/**
 * Fetch combined results from both museums
 */
export const getAllArtworks = async (query = "", page = 1, totalLimit = 50) => {
  // Split evenly across both sources
  const limitPerMuseum = Math.floor(totalLimit / 2);

  const [chicago, cleveland] = await Promise.all([
    getChicagoArtworks(query, limitPerMuseum, page),
    getClevelandArtworks(query, limitPerMuseum, page),
  ]);

  return [...chicago, ...cleveland];
};

export const getChicagoArtworkById = async (id) => {
  const numericId = id.replace("aic-", "");
  const { data } = await axios.get(
    `https://api.artic.edu/api/v1/artworks/${numericId}`,
  );
  const art = data.data;

  return {
    id: `aic-${art.id}`,
    title: art.title,
    artist: art.artist_title || "Unknown",
    year: art.date_display || "N/A",
    description: art.thumbnail?.alt_text || "No description available.",
    image: art.image_id
      ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
      : "https://via.placeholder.com/800x800?text=No+Image",
    source: "Art Institute of Chicago",
  };
};

export const getClevelandArtworkById = async (id) => {
  const numericId = id.replace("cma-", "");
  const { data } = await axios.get(
    `https://openaccess-api.clevelandart.org/api/artworks/${numericId}`,
  );
  const art = data.data;

  return {
    id: `cma-${art.id}`,
    title: art.title,
    artist: art.creators?.[0]?.description || "Unknown",
    year: art.creation_date || "N/A",
    description: art.description || "No description available.",
    image:
      art.images?.web?.url ||
      "https://via.placeholder.com/800x800?text=No+Image",
    source: "Cleveland Museum of Art",
    credit: art.creditline || "",
    culture: art.culture?.[0] || "",
    technique: art.technique || "",
    link: art.url || "",
  };
};

export const getArtworkById = async (id) => {
  if (id.startsWith("aic-")) return getChicagoArtworkById(id);
  if (id.startsWith("cma-")) return getClevelandArtworkById(id);
  throw new Error("Invalid artwork ID format.");
};
