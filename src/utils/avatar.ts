// utils/avatar.ts
export const getRpmImageUrl = (avatarUrl?: string): string | null => {
  if (!avatarUrl) return null;

  // Si solo guardas el ID en la base de datos
  if (!avatarUrl.includes("https://")) {
    return `https://models.readyplayer.me/${avatarUrl}.png`;
  }

  // Si guardas la URL completa (.glb)
  if (avatarUrl.endsWith(".glb")) {
    return avatarUrl.replace(".glb", ".png");
  }

  // Si ya es un PNG u otro formato válido
  if (avatarUrl.endsWith(".png") || avatarUrl.endsWith(".jpg")) {
    return avatarUrl;
  }

  return null;
};
