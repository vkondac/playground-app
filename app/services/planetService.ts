import type { Planet } from '~/types/planet';

const BASE_URL = 'https://swapi.info/api';

export async function fetchPlanet(id: number): Promise<Planet> {
  const response = await fetch(`${BASE_URL}/planets/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch planet with id ${id}`);
  }
  return response.json();
} 