import React, { useReducer, useEffect, useState } from 'react';
import Axios from 'axios';
import { TextField, Checkbox, createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { Button } from 'react-bootstrap';
import ServerDropdown from '../components/ServerDropdown';
import ChannelDropdown from '../components/ChannelDropdown';
import ItemsTable from '../components/ItemsTable';
import isDark from '../middleware/isDark';

const theme = createTheme({
    palette: {
        primary: { main: '#1f51ff' },
    },
});

type State = {
    channelId: string;
    question: string;
    currentOption: string;
    options: string[];
    time?: string;
    isButtonDisabled: boolean;
    isOptionDisabled: boolean;
    isTimeUsed: boolean;
    helperText: string;
    isError: boolean;
};

const initialState: State = {
    channelId: '',
    question: '',
    currentOption: '',
    options: [],
    isButtonDisabled: true,
    isOptionDisabled: true,
    isTimeUsed: false,
    helperText: '',
    isError: false,
};

type Action =
    | { type: 'setChannelId'; payload: any }
    | { type: 'setQuestion'; payload: string }
    | { type: 'setCurrentOption'; payload: string }
    | { type: 'addOption'; payload: string }
    | { type: 'removeOption'; payload: number }
    | { type: 'setTime'; payload: string }
    | { type: 'setIsButtonDisabled'; payload: boolean }
    | { type: 'setIsOptionDisabled'; payload: boolean }
    | { type: 'setIsTimeUsed'; payload: boolean }
    | { type: 'success'; payload: string }
    | { type: 'fail'; payload: string }
    | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setChannelId':
            return {
                ...state,
                channelId: action.payload.id,
            };
        case 'setQuestion':
            return {
                ...state,
                question: action.payload,
            };
        case 'setCurrentOption':
            return {
                ...state,
                currentOption: action.payload,
            };
        case 'addOption':
            return {
                ...state,
                options: state.options.concat(action.payload),
            };
        case 'removeOption':
            state.options.splice(action.payload, 1);
            return {
                ...state,
            };
        case 'setTime':
            return {
                ...state,
                time: action.payload,
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload,
            };
        case 'setIsOptionDisabled':
            return {
                ...state,
                isOptionDisabled: action.payload,
            };
        case 'setIsTimeUsed':
            return {
                ...state,
                isTimeUsed: action.payload,
            };
        case 'success':
            return {
                ...state,
                helperText: action.payload,
                isError: false,
            };
        case 'fail':
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

export function PollForm(): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [server, setServer] = useState({ id: '', name: '', serverPic: '' });

    useEffect(() => {
        if (state.question.trim() && state.channelId.trim() && state.options.length > 0) {
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
        if (state.currentOption.trim()) {
            dispatch({
                type: 'setIsOptionDisabled',
                payload: false,
            });
        } else {
            dispatch({
                type: 'setIsOptionDisabled',
                payload: true,
            });
        }
    }, [state.question, state.channelId, state.options, state.currentOption]);

    const handleCreation = () => {
        const params = {
            channelId: state.channelId,
            options: state.options,
            question: state.question,
            serverId: server.id,
            time: state.time,
        };
        Axios.post(process.env.REACT_APP_API_ADDRESS + '/commands/poll', { params: params })
            .then(() => {
                dispatch({
                    type: 'success',
                    payload: 'Sondage créé',
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: 'fail',
                    payload: 'Une erreur est survenue',
                });
            });
    };
    const handleOptionAdd = () => {
        dispatch({
            type: 'addOption',
            payload: state.currentOption,
        });
    };
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isOptionDisabled || handleOptionAdd();
        }
    };
    const handleQuestionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setQuestion',
            payload: event.target.value,
        });
    };
    const handleCurrentOptionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setCurrentOption',
            payload: event.target.value,
        });
    };
    const handleChannelIdChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setChannelId',
            payload: event,
        });
    };
    const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setTime',
            payload: event.target.value,
        });
    };
    const handleIsTimeUsedChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setIsTimeUsed',
            payload: event.target.checked,
        });
    };
    const handleRemoveOption: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        console.log(event);
        dispatch({
            type: 'removeOption',
            payload: Number(event.target.parentElement?.id),
        });
    };
    return (
        <ThemeProvider theme={theme}>
            <form className={'flex-col space-y-4'}>
                <ServerDropdown setServer={setServer} className={'text-dark'} />
                {server.id !== '' && (
                    <ChannelDropdown server={server} setChannel={handleChannelIdChange} className={'text-dark'} />
                )}
                <TextField
                    error={state.isError}
                    fullWidth
                    id="question"
                    type="question"
                    label="Question"
                    placeholder="Havok est il le meilleur des devs ? :)"
                    margin="normal"
                    onChange={handleQuestionChange}
                    className={isDark() ? 'text-light border-light' : 'text-dark border-danger'}
                />
                <div className="grid grid-cols-8 items-center space-x-4">
                    <TextField
                        error={state.isError}
                        id="option"
                        type="option"
                        label="Option"
                        placeholder="Oui ! UwU"
                        margin="normal"
                        onChange={handleCurrentOptionChange}
                        onKeyPress={handleKeyPress}
                        className={'col-span-7'}
                    />
                    <Button
                        variant="warning"
                        onClick={handleOptionAdd}
                        disabled={state.isOptionDisabled}
                        className={'col-span-1 flex-grow'}
                    >
                        <ControlPointIcon />
                    </Button>
                </div>
                <ItemsTable
                    items={state.options.map((option) => {
                        return { text: option, onClick: handleRemoveOption };
                    })}
                />
                <div className="flex items-end space-x-4">
                    <TextField
                        error={state.isError}
                        id="duration"
                        type="duration"
                        label="Temps"
                        placeholder="1h 23min 45s"
                        margin="normal"
                        helperText={state.helperText}
                        disabled={!state.isTimeUsed}
                        onChange={handleTimeChange}
                    />
                    <div className="flex items-center">
                        <Checkbox
                            checked={state.isTimeUsed}
                            onChange={handleIsTimeUsedChange}
                            className="text-warning"
                            name="Spécifier un temps"
                        />
                        <div className="text-dark pb-1">Spécifier un temps</div>
                    </div>
                </div>
                <Button
                    variant="success"
                    size="lg"
                    className={'flex-grow w-full'}
                    onClick={handleCreation}
                    disabled={state.isButtonDisabled}
                >
                    Créer
                </Button>
            </form>
        </ThemeProvider>
    );
}

export default PollForm;
