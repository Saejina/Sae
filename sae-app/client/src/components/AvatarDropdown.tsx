import React from 'react';
import { Dropdown, Image, Nav, NavDropdown, NavDropdownProps } from 'react-bootstrap';

export function AvatarNavDropdown({image, username}: AvatarNavDropdownProps) {
    return (
            <Dropdown title={username} id="nav-dropdown">
                <Dropdown.Toggle>{username}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <NavDropdown.Item >Menu Item</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >Menu Item</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >Menu Item</NavDropdown.Item>
                    </Dropdown.Menu>
            </Dropdown>
    )
}

export interface AvatarNavDropdownProps {
    image: string;
    username: string;
}

export default AvatarNavDropdown;
