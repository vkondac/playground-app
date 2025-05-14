import { PlanetDetails } from '~/components/Planet';
import { useParams } from 'react-router';

export default function PlanetRoute() {
  const { id } = useParams();
  return <PlanetDetails id={parseInt(id || '54', 10)} />;
} 