import React, {FC} from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay: FC<{children: any, onClose: any}> = ({children, onClose}) => {
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
