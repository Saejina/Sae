import React from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import { Tooltip, OverlayTrigger, Nav } from 'react-bootstrap';

const sidebarItems = [
    { title: 'Home', path: '/', Icon: HomeOutlinedIcon },
    { title: 'Users', path: '/users', Icon: PeopleAltOutlinedIcon },
    { title: 'Commands', path: '/commands', Icon: AssignmentOutlinedIcon },
];

function Sidebar({ active }: SidebarProps): JSX.Element {
    return (
        <div className="flex flex-col flex-shrink-0 bg-darker w-1/30 min-w-min h-screen border-r border-light">
            <Nav defaultActiveKey="/" className="flex flex-col items-center justify-center">
                {sidebarItems.map(({ title, path, Icon }, index) => {
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
                                className="border-b w-full h-16 border-light flex items-center justify-center"
                            >
                                <Icon className={active === path ? 'text-secondary' : 'text-primary'} />
                            </Nav.Link>
                        </OverlayTrigger>
                    );
                })}
            </Nav>
        </div>
    );
}

export interface SidebarProps {
    active: string;
}

export default Sidebar;
