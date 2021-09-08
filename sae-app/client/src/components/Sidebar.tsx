import React from 'react';
import clsx from 'clsx';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import AssignmentLateOutlinedIcon from '@material-ui/icons/AssignmentLateOutlined';
import { Tooltip, OverlayTrigger, Nav } from 'react-bootstrap';
import isDark from '../middleware/isDark';
import usePermissions from '../hooks/usePermissions';

const sidebarItems = [
    { title: 'Home', path: '/', Icon: HomeOutlinedIcon },
    { title: 'Users', path: '/users', Icon: PeopleAltOutlinedIcon },
    { title: 'Commands', path: '/commands', Icon: AssignmentOutlinedIcon },
    { title: 'Permissions', path: '/permissions', Icon: AssignmentLateOutlinedIcon, permission: 'administrator' },
];

function Sidebar({ active, className }: SidebarProps): JSX.Element {
    const permissions = usePermissions();
    return (
        <div
            className={clsx(
                className,
                'flex flex-col flex-shrink-0 w-1/30 min-w-min h-screen border-r',
                isDark() ? 'bg-darker border-light' : 'bg-light border-danger',
            )}
        >
            <Nav defaultActiveKey="/" className="flex flex-col items-center justify-center">
                {sidebarItems.map(({ title, path, Icon, permission }, index) => {
                    if (!permission || (permissions && permissions.includes(permission)))
                        return (
                            <OverlayTrigger
                                key={'right-tooltip-' + index}
                                placement={'right'}
                                overlay={
                                    <Tooltip id={`tooltip-right-${index}`} className="ml-1">
                                        {title}
                                    </Tooltip>
                                }
                            >
                                <Nav.Link
                                    key={index}
                                    eventKey={'link-' + index}
                                    href={path}
                                    className={clsx(
                                        'border-b w-full h-16 flex items-center justify-center',
                                        isDark() ? 'border-light' : 'border-danger',
                                    )}
                                >
                                    <Icon
                                        className={
                                            active === path
                                                ? isDark()
                                                    ? 'text-secondary'
                                                    : 'text-warning'
                                                : isDark()
                                                ? 'text-primary'
                                                : 'text-success'
                                        }
                                    />
                                </Nav.Link>
                            </OverlayTrigger>
                        );
                    else return <div key={'private-' + index}></div>;
                })}
            </Nav>
        </div>
    );
}

export interface SidebarProps {
    active: string;
    className?: string;
}

export default Sidebar;
