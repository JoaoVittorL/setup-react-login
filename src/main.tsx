import { createRoot } from 'react-dom/client';

import { App } from './_app';
import { enableMSW } from './core/application/api/mocks';

enableMSW().then(() => {
  createRoot(document.getElementById('root')!).render(<App />);
});
