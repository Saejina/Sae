import React, { useState } from 'react';
import { Container, Image, Offcanvas, Nav } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import Divider from './Divider';
import refresh from '../utils';
import removeToken from '../middleware/removeToken';

export function AvatarOffcanvas({ image, username }: AvatarModalProps): JSX.Element {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleDisconnect = () => removeToken() && refresh();

    return (
        <div>
            <button onClick={show ? handleClose : handleShow}>
                <Image src={image} alt="PP" roundedCircle fluid className="h-14" />
            </button>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                scroll={true}
                backdrop={true}
                className="bg-dark text-light"
            >
                <Offcanvas.Header closeButton closeVariant="white">
                    Bonjour {username} !
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container className="flex flex-col items-center">
                        <Image src={image} alt="PP" roundedCircle fluid className="h-32 mx-6" />
                        <Divider size="xs" color="lighter" className="my-4" />
                        <Nav className="flex-col w-full space-y-2">
                            <Nav.Item>
                                <Button color="primary" disabled className="w-full text-light">
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
}

export default AvatarOffcanvas;
