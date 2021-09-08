import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Image, Spinner, Modal } from 'react-bootstrap';
import useDiscordData from '../hooks/useDiscordData';
import usePermissions from '../hooks/usePermissions';
import isDark from '../middleware/isDark';
import { createTheme, ThemeProvider } from '@material-ui/core';
import PermissionForm from './PermissionForm';

const theme = createTheme({
    palette: {
        primary: { main: '#f180f8' },
        secondary: { main: '#1f51ff' },
    },
});

export function UserCard({ id, className }: UserCardProps): JSX.Element {
    const discordData = useDiscordData(id);
    const [isLoading, setIsLoading] = useState(true);
    const permissions = usePermissions(discordData.platformId);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        if (discordData) setIsLoading(false);
    }, [discordData, setIsLoading]);

    return (
        <div>
            <button onClick={handleShow} className={className}>
                {isLoading ? (
                    <Spinner animation="border" />
                ) : (
                    <div className="flex flex-col h-24 w-24 space-y-1 p-2">
                        <Image src={discordData.profilePic} roundedCircle fluid />
                        <div className="self-center">{discordData.username}</div>
                    </div>
                )}
            </button>
            <ThemeProvider theme={theme}>
                <Modal show={show} onHide={handleClose} centered contentClassName="bg-darker">
                    <Modal.Header
                        closeButton
                        closeVariant={isDark() ? 'white' : undefined}
                        className={clsx(
                            isDark() ? 'bg-darker text-light border-light' : 'bg-light text-dark border-dark',
                        )}
                    >
                        <Modal.Title>{discordData.username}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={clsx(isDark() ? 'bg-darker text-light' : 'bg-light text-dark')}>
                        {permissions ? (
                            <PermissionForm permissions={permissions} data={discordData} />
                        ) : (
                            <Spinner animation="border" />
                        )}
                    </Modal.Body>
                </Modal>
            </ThemeProvider>
        </div>
    );
}

export interface UserCardProps {
    id: string;
    className?: string;
}

export default UserCard;
