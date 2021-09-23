import React, { useEffect, useReducer } from 'react';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Button, Card } from 'react-bootstrap';
import refresh from '../utils';

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

function LoginForm({ setShow }: LoginFormProps): JSX.Element {
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
        Axios.post(process.env.REACT_APP_API_ADDRESS + '/login', {
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
                            autoFocus
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
    );
}

export interface LoginFormProps {
    setShow: Function;
}

export default LoginForm;
