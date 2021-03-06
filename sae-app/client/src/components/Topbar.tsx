import React, { useState } from 'react';
import clsx from 'clsx';
import { Button, Spinner } from 'react-bootstrap';
import { Brightness4, Brightness7 } from '@material-ui/icons';
import LoginModal from './LoginModal';
import AvatarOffcanvas from './AvatarOffcanvas';
import isLoggedIn from '../middleware/isLoggedIn';
import removeToken from '../middleware/removeToken';
import getMode from '../middleware/getMode';
import refresh from '../utils';
import isDark from '../middleware/isDark';
import changeMode from '../middleware/changeMode';

export function Topbar({ data, className }: TopbarProps): JSX.Element {
    const [show, setShow] = useState(false);
    const btnLabel = isLoggedIn() ? 'Logout' : 'Login';
    const colorTheme = getMode();

    const handleShow = () => (!isLoggedIn() ? setShow(true) : removeToken() && refresh());
    const handleClose = () => setShow(false);
    const handleChangeMode = () => {
        changeMode();
    };

    return (
        <div
            className={clsx(
                className,
                'flex border-b  w-full h-16 justify-between items-center absolute',
                isDark() ? 'bg-darker border-light text-light' : 'bg-light border-danger text-dark',
            )}
        >
            <div className="w-full h-full flex items-center min-w-max ml-2">
                <a href="/" className="text-decoration-none link-dark">
                    <span className={clsx(' text-2xl font-bold', isDark() ? 'text-primary' : 'text-success')}>
                        Saejina
                    </span>
                </a>
            </div>
            <div className="mr-2 flex flex-row items-center space-x-4">
                <button onClick={handleChangeMode}>
                    {colorTheme === 'light' ? (
                        <Brightness4 className="text-dark" />
                    ) : (
                        <Brightness7 className="text-lighter" />
                    )}
                </button>
                {btnLabel === 'Login' ? (
                    <Button color={isDark() ? 'primary' : 'success'} onClick={handleShow}>
                        {btnLabel}
                    </Button>
                ) : data.profilePic ? (
                    <AvatarOffcanvas image={data.profilePic} username={data.username} />
                ) : (
                    <Spinner animation="border" />
                )}
                <LoginModal show={show} onHide={handleClose} backdropClassName="bg-error" setShow={setShow} />
            </div>
        </div>
    );
}

export interface TopbarProps {
    data?: any;
    className?: string;
}

export default Topbar;
