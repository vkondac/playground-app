import { useState, useEffect } from 'react';
import type { Planet } from '~/types/planet';
import { fetchPlanet } from '~/services/planetService';

interface PlanetProps {
  id: number;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-semibold text-gray-700">{label}: </span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}

export function PlanetDetails({ id }: PlanetProps) {
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlanet() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPlanet(id);
        setPlanet(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch planet');
      } finally {
        setLoading(false);
      }
    }

    loadPlanet();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p>Loading planet details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!planet) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p>No planet data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{planet.name}</h2>
      <div className="space-y-3">
        <InfoRow label="Rotation Period" value={planet.rotation_period} />
        <InfoRow label="Orbital Period" value={planet.orbital_period} />
        <InfoRow label="Diameter" value={planet.diameter} />
        <InfoRow label="Climate" value={planet.climate} />
        <InfoRow label="Gravity" value={planet.gravity} />
        <InfoRow label="Terrain" value={planet.terrain} />
        <InfoRow label="Surface Water" value={planet.surface_water} />
        <InfoRow label="Population" value={planet.population} />
        <div>
          <h3 className="font-semibold text-gray-700">Residents</h3>
          <p className="text-gray-600">{planet.residents.length} resident(s)</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Films</h3>
          <p className="text-gray-600">{planet.films.length} film(s)</p>
        </div>
      </div>
    </div>
  );
} 