import React, {FC} from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
    onClose?: () => void;
}

/** @ts-ignore */
const ModalOverlay: FC<IModalOverlayProps> = ({children, onClose}) => {
  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        if(e.target !== e.currentTarget) return;
        if (undefined !== onClose) {
            onClose();
        }
      }}
    >
      {children}
    </div>
  );
}

export default ModalOverlay;
