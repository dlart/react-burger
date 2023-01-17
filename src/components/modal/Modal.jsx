import React, {useCallback, useEffect} from 'react';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import {createPortal} from 'react-dom';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modal-root");

export default function Modal(props) {
    const {
        children,
        title,
        onClose,
    } = props;

    const handleKeyDown = useCallback((e) => {
        if ('Escape' !== e.code) return;
        onClose();
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return createPortal(
        <ModalOverlay onClose={onClose}>
            <div className={`${styles.modal} pb-30 pl-10 pr-10 pt-15`} onKeyDown={() => console.log('OK')}>
                <div className={styles.modalTitle}>
                    <div className="text text_type_main-large">
                        {title}
                    </div>
                    <button
                        className={styles.closeBtn}
                        onClick={onClose}
                        type="button"
                    >
                        <CloseIcon type="primary" />
                    </button>
                </div>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        </ModalOverlay>,
        modalRoot,
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};