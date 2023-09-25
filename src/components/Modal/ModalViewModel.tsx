import { useCallback } from 'react';

export const useModal = (onClose: () => void) => {

  const handleCloseModal = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return {
    handleCloseModal,
    handleOverlayClick
  };
};
