import React, {FC, ReactNode, useCallback, useEffect,} from 'react';
import {createPortal} from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';

const modalRoot = document.getElementById('modal-root') as Element;

interface IModalProps {
  children: ReactNode;
  onClose?: () => void | undefined | {};
  title: string;
}

const Modal: FC<IModalProps> = ({
  children,
  onClose,
  title,
}) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ('Escape' !== event.code) return;

    if (undefined !== onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => document.removeEventListener(
      'keydown',
      handleKeyDown,
    );
  }, [handleKeyDown]);

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div
        className={`${styles.modal} pb-30 pl-10 pr-10 pt-15`}
        /** @ts-ignore */
        onKeyDown={handleKeyDown}
      >
        <div className={styles.title}>
          <div
              className="text text_type_main-large"
              data-testid="modal-title"
          >
            {title}
          </div>
          <button
            className={styles.closeBtn}
            data-testid="modal-close-button"
            onClick={onClose}
            type="button"
          >
            <CloseIcon type="primary"/>
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </ModalOverlay>,
    modalRoot,
  );
};

export default Modal;
