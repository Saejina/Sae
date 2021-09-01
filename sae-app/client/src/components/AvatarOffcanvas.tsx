import React, { useState } from 'react';
import clsx from 'clsx';
import { Container, Image, Offcanvas, Nav } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import Divider from './Divider';
import refresh from '../utils';
import removeToken from '../middleware/removeToken';
import isDark from '../middleware/isDark';

export function AvatarOffcanvas({ image, username }: AvatarModalProps): JSX.Element {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleDisconnect = () => removeToken() && refresh();

    return (
        <div className="flex items-center">
            <button onClick={show ? handleClose : handleShow}>
                <Image src={image} alt="PP" roundedCircle fluid className="h-14" />
            </button>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                scroll={true}
                backdrop={true}
                className={clsx(isDark() ? 'bg-dark text-light' : 'bg-light text-dark')}
            >
                <Offcanvas.Header closeButton closeVariant={isDark() ? 'white' : undefined}>
                    Bonjour {username} !
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container className="flex flex-col items-center">
                        <Image src={image} alt="PP" roundedCircle fluid className="h-32 mx-6" />
                        <Divider size="xs" color={isDark() ? 'lighter' : 'dark'} className="my-4" />
                        <Nav className="flex-col w-full space-y-2">
                            <Nav.Item>
                                <Button
                                    color="primary"
                                    disabled
                                    className={clsx('w-full', isDark() ? 'text-light' : 'text-dark')}
                                >
                                    Coming soon...
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    className="w-full"
                                    onClick={handleDisconnect}
                                >
                                    Deconnexion
                                </Button>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export interface AvatarModalProps {
    image: string;
    username: string;
    theme?: 'light' | 'dark';
}

export default AvatarOffcanvas;
