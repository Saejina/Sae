import React from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import useDiscordChannels from '../hooks/useDiscordChannels';

function ChannelTemplate({ name, category = '' }: ChannelTemplateProps) {
    return (
        <div className="flex justify-between">
            <div>#{name}</div>
            <div className="pl-96">{category}</div>
        </div>
    );
}

interface ChannelTemplateProps {
    id: string;
    name: string;
    category?: string;
}

export function ChannelDropdown({ server, setChannel, className }: ChannelDropdownProps): JSX.Element {
    const channels = useDiscordChannels(server.id);
    const handleChange = (value: any) => {
        setChannel(value.value);
    };
    const options = channels
        ? channels.map((channel: ChannelTemplateProps) => {
              return { value: channel, label: ChannelTemplate(channel) };
          })
        : [];
    return (
        <div className={clsx(className)}>
            <Select
                onChange={handleChange}
                isLoading={!!!channels}
                isDisabled={!!!server}
                options={options}
                isSearchable={false}
            />
        </div>
    );
}

export interface ChannelDropdownProps {
    className?: string;
    server: any;
    setChannel: Function;
}

export default ChannelDropdown;
