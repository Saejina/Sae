import React, { useReducer, useEffect } from 'react';
import Axios from 'axios';
import clsx from 'clsx';

import TextField from '@material-ui/core/TextField';
import { Button } from 'react-bootstrap';
import { ModalProps, Modal, Card } from 'react-bootstrap';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import refresh from '../utils';
import isDark from '../middleware/isDark';

Axios.defaults.withCredentials = true;

const theme = createTheme({
    palette: {
        primary: { main: '#1f51ff' },
    },
});

//state type

type State = {
    username: string;
    password: string;
    isButtonDisabled: boolean;
    helperText: string;
    isError: boolean;
};

const initialState: State = {
    username: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false,
};

type Action =
    | { type: 'setUsername'; payload: string }
    | { type: 'setPassword'; payload: string }
    | { type: 'setIsButtonDisabled'; payload: boolean }
    | { type: 'loginSuccess'; payload: string }
    | { type: 'loginFailed'; payload: string }
    | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                username: action.payload,
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload,
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload,
            };
        case 'loginSuccess':
            return {
                ...state,
                helperText: action.payload,
                isError: false,
            };
        case 'loginFailed':
            return {
                ...state,
                helperText: action.payload,
                isError: true,
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload,
            };
    }
};

export function LoginModal({ show, setShow, ...modalProps }: LoginModalProps): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false,
            });
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true,
            });
        }
    }, [state.username, state.password]);

    const handleLogin = () => {
        Axios.post('http://localhost:5000/login', {
            username: state.username.trim(),
            password: state.password.trim(),
        })
            .then((response) => {
                localStorage.setItem('saejinaToken', response.data.token);
                dispatch({
                    type: 'loginSuccess',
                    payload: response.data.msg,
                });
                setShow(false);
                refresh();
            })
            .catch((err) => {
                dispatch({
                    type: 'loginFailed',
                    payload: err.response ? err.response.data.msg : 'Internal server error',
                });
                console.log(err);
            });
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
        }
    };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setUsername',
            payload: event.target.value,
        });
    };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setPassword',
            payload: event.target.value,
        });
    };
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
                    <form noValidate autoComplete="off">
                        <Card bg="lighter">
                            <Card.Body>
                                <div>
                                    <TextField
                                        error={state.isError}
                                        fullWidth
                                        id="username"
                                        type="username"
                                        label="Username"
                                        placeholder="Username"
                                        margin="normal"
                                        onChange={handleUsernameChange}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <TextField
                                        error={state.isError}
                                        fullWidth
                                        id="password"
                                        type="password"
                                        label="Password"
                                        placeholder="Password"
                                        margin="normal"
                                        helperText={state.helperText}
                                        onChange={handlePasswordChange}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                                <Button
                                    variant="success"
                                    size="lg"
                                    className={'flex-grow w-full'}
                                    onClick={handleLogin}
                                    disabled={state.isButtonDisabled}
                                >
                                    Login
                                </Button>
                            </Card.Body>
                        </Card>
                    </form>
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
