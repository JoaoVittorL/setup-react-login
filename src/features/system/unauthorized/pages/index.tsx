import { SystemMessage } from '@/shared/components/system-message';

export function Unauthorized() {
  return (
    <SystemMessage
      status={403}
      title="Acesso não autorizado"
      message="Você não tem permissão para acessar essa página."
    />
  );
}
