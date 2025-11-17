export async function getUserAchievements(userId: number | string) {
  try {
    const response = await fetch(`http://localhost:3000/logros/usuario/${userId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}
