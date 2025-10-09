import React, { createContext, useContext } from 'react';
import { ModalConfig, useModal } from '../hooks/use-modal';
import Modal from '../components/modal';

interface ModalContextType {
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext deve ser usado dentro de ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { isOpen, config, loading, openModal, closeModal } = useModal();
  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal isOpen={isOpen} config={config} loading={loading} onClose={closeModal} />
    </ModalContext.Provider>
  );
};
