import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import LoginModal from './LoginModal';
import AvatarOffcanvas from './AvatarOffcanvas';
import isLoggedIn from '../middleware/isLoggedIn';
import removeToken from '../middleware/removeToken';
import refresh from '../utils';

export function Topbar({ data }: TopbarProps): JSX.Element {
    const [show, setShow] = useState(false);
    const handleShow = () => (!isLoggedIn() ? setShow(true) : removeToken() && refresh());
    const handleClose = () => setShow(false);
    const btnLabel = isLoggedIn() ? 'Logout' : 'Login';
    return (
        <div className="flex border-b border-light bg-darker w-full h-16 justify-between items-center">
            <div className="w-full h-full flex items-center min-w-max ml-2">
                <a href="/" className="text-decoration-none link-dark">
                    <span className="text-primary text-2xl font-bold">Saejina</span>
                </a>
            </div>
            <div className="mr-2">
                {btnLabel === 'Login' ? (
                    <Button color="primary" onClick={handleShow}>
                        {btnLabel}
                    </Button>
                ) : (
                    <AvatarOffcanvas
                        image={
                            data.profilePic ||
                            'https://img1.freepng.fr/20171220/qgw/question-mark-png-5a3a52cf1f4c50.0294601315137717271282.jpg'
                        }
                        username={data.username}
                    />
                )}
                <LoginModal show={show} onHide={handleClose} backdropClassName="bg-error" setShow={setShow} />
            </div>
        </div>
    );
}

export interface TopbarProps {
    data?: any;
}

export default Topbar;
