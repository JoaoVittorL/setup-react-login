import { SystemMessage } from '@/shared/components/system-message';

export function NotFound() {
  return (
    <SystemMessage
      status={404}
      title="Página não encontrada"
      message="A página que você está procurando não foi encontrada."
    />
  );
}
