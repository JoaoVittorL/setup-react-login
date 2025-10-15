import React, { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { ModalConfig } from '../hooks/use-modal';

interface ModalProps {
  isOpen: boolean;
  config: ModalConfig;
  loading: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, config, loading, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const typeConfig = {
    info: {
      icon: Info,
      iconColor: 'text-blue-500',
      borderColor: 'border-blue-200',
      bgColor: 'bg-blue-50',
    },
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-500',
      borderColor: 'border-green-200',
      bgColor: 'bg-green-50',
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      borderColor: 'border-yellow-200',
      bgColor: 'bg-yellow-50',
    },
    error: {
      icon: XCircle,
      iconColor: 'text-red-500',
      borderColor: 'border-red-200',
      bgColor: 'bg-red-50',
    },
    custom: {
      icon: null,
      iconColor: '',
      bgColor: 'bg-white-500',
    },
  };

  const currentType = typeConfig[config.type || 'info'];
  const IconComponent = currentType.icon;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && config.closableByOverlay) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm duration-200 animate-in fade-in"
      onClick={handleOverlayClick}
    >
      <div
        className={`relative w-full ${sizeClasses[config.size || 'md']} bg-white-500 max-h-[90vh] space-y-2 overflow-hidden rounded-2xl border p-4 shadow-2xl duration-300 animate-in zoom-in-95 slide-in-from-bottom-8 dark:bg-sidebar`}
      >
        {(config.title || config.showClose) && (
          <div className="flex items-center justify-between border-b">
            <div className="flex items-center space-x-3 py-2">
              {IconComponent && (
                <div className={`rounded-full p-2 ${currentType.bgColor}`}>
                  <IconComponent className={`h-6 w-6 ${currentType.iconColor}`} />
                </div>
              )}
              {config.title && (
                <h2 className="dark:text-white-500 text-xl font-semibold text-gray-900">{config.title}</h2>
              )}
            </div>

            {config.showClose && (
              <button onClick={onClose} className="rounded-full p-2 text-gray-500" disabled={loading}>
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto">
          {config.customContent
            ? config.customContent
            : config.message && <p className="leading-relaxed text-gray-700">{config.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
