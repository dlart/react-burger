import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay(props) {
    const {
        children,
        onClose,
    } = props;

    return (
        <div
            className={styles.modalOverlay}
            onClick={(e) => {
                if(e.target !== e.currentTarget) return;
                onClose();
            }}
        >
            {children}
        </div>
    );
}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};
