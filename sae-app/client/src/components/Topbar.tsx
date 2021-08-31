import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import LoginModal from './LoginModal';
import isLoggedIn from '../middleware/isLoggedIn';
import removeToken from '../middleware/removeToken';

export function Topbar(): JSX.Element {
    const [show, setShow] = useState(false);
    const handleShow = () => (!isLoggedIn() ? setShow(true) : removeToken() && window.location.reload(false));
    const handleClose = () => setShow(false);
    const btnLabel = isLoggedIn() ? 'Logout' : 'Login';
    return (
        <div className="flex border-b border-light bg-darker w-full h-16 justify-between items-center">
            <div className="w-full h-full flex items-center justify-center w-1/30 min-w-max ml-2">
                <a href="/" className="text-decoration-none link-dark">
                    <span className="text-primary text-2xl font-bold">Saejina</span>
                </a>
            </div>
            <div className="mr-2">
                <Button color="primary" onClick={handleShow}>
                    {btnLabel}
                </Button>
                <LoginModal show={show} onHide={handleClose} backdropClassName="bg-error" setShow={setShow} />
            </div>
        </div>
    );
}

export default Topbar;
