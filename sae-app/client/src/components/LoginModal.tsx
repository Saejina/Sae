import React from 'react';
import Axios from 'axios';
import clsx from 'clsx';
import { ModalProps, Modal } from 'react-bootstrap';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import isDark from '../middleware/isDark';
import LoginForm from '../forms/LoginForm';

Axios.defaults.withCredentials = true;

const theme = createTheme({
    palette: {
        primary: { main: '#1f51ff' },
    },
});

export function LoginModal({ show, setShow, ...modalProps }: LoginModalProps): JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <Modal show={show} {...modalProps} contentClassName="bg-darker">
                <Modal.Header
                    closeButton
                    closeVariant={isDark() ? 'white' : undefined}
                    className={clsx(isDark() ? 'bg-darker text-light border-light' : 'bg-light text-dark border-dark')}
                >
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body className={clsx(isDark() ? 'bg-darker' : 'bg-light')}>
                    <LoginForm setShow={setShow} />
                </Modal.Body>
            </Modal>
        </ThemeProvider>
    );
}

export interface LoginModalProps extends ModalProps {
    show: boolean;
    setShow: Function;
}

export default LoginModal;
