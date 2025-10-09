import { useState, useCallback } from 'react';

export interface ModalConfig {
  type?: 'info' | 'success' | 'warning' | 'error' | 'custom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  showClose?: boolean;
  closableByOverlay?: boolean;
  onCancel?: () => void;
  customContent?: React.ReactNode;
}

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ModalConfig>({});
  const [loading, setLoading] = useState(false);

  const openModal = useCallback((modalConfig: ModalConfig) => {
    setConfig({
      type: 'info',
      size: 'md',
      showCancel: true,
      showClose: true,
      closableByOverlay: true,
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      ...modalConfig,
    });
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setLoading(false);
    if (config.onCancel) {
      config.onCancel();
    }
  }, [config]);

  return {
    isOpen,
    config,
    loading,
    openModal,
    closeModal,
  };
};
