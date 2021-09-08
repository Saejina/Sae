import React from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import { Image } from 'react-bootstrap';
import useDiscordServers from '../hooks/useDiscordServers';

function ServerTemplate({ name, serverPic }: ServerTemplateProps) {
    const cleared = name.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        '',
    );

    const initials = cleared.split(' ').map((word) => word[0]);
    return (
        <div className="flex flex-row items-center">
            <div
                className={clsx(
                    'flex items-center justify-center w-6 h-6 rounded-full',
                    !serverPic && 'bg-dark text-light text-sm',
                )}
            >
                {serverPic ? <Image src={serverPic} roundedCircle fluid /> : <div>{initials}</div>}
            </div>
            <div className="ml-2">{name}</div>
        </div>
    );
}

interface ServerTemplateProps {
    name: string;
    serverPic?: string;
}

function ServerDropdown({ className }: ServerDropdownProps): JSX.Element {
    const discordServers = useDiscordServers();
    const newopts = discordServers ? discordServers.map((server: ServerTemplateProps) => {
        return { value: server, label: ServerTemplate(server) };
    }) : [];

    return (
        <div className={clsx(className, 'w-64')}>
            <Select options={newopts} isSearchable={false} />
        </div>
    );
}

export interface ServerDropdownProps {
    className?: string;
}

export default ServerDropdown;
