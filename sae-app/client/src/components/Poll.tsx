import React, { useState } from 'react';
import clsx from 'clsx';
import { Button, Offcanvas, OffcanvasProps } from 'react-bootstrap';
import isDark from '../middleware/isDark';
import PollForm from '../forms/PollForm';

function PollOffCanvas({ className, ...props }: OffcanvasProps): JSX.Element {
    return (
        <Offcanvas
            placement="end"
            scroll={true}
            backdrop={true}
            className={clsx(isDark() ? 'bg-dark text-light' : 'bg-light text-dark', className)}
            {...props}
        >
            <Offcanvas.Header closeButton closeVariant={isDark() ? 'white' : undefined}>
                Créer un sondage
            </Offcanvas.Header>
            <Offcanvas.Body>
                <PollForm></PollForm>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export function Poll({ className }: PollProps): JSX.Element {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <div className={className}>
            <PollOffCanvas show={show} onHide={handleClose} className="w-1/2"></PollOffCanvas>
            <Button variant={isDark() ? 'primary' : 'warning'} onClick={handleShow}>
                Créer un sondage
            </Button>
        </div>
    );
}

export interface PollProps {
    className?: string;
}

export default Poll;
