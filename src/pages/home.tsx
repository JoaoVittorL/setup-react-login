import { Home } from '@/features/home';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet title="Home" />
      <Home />;
    </>
  );
}
