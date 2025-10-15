import { Button } from '@/shared/components/ui/button';
import { useModalContext } from '@/shared/providers/modal-provider';

export function Home() {
  const { openModal } = useModalContext();
  const showDeleteConfirmation = () => {
    openModal({
      type: 'warning',
      title: 'Confirmar Exclusão',
      message: 'Você tem certeza de que deseja excluir este item?',
      confirmText: 'Sim, excluir',
      showCancel: true,
      size: 'sm',
    });
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Button onClick={showDeleteConfirmation}>Excluir Item</Button>
    </div>
  );
}
