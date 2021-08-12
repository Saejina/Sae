import React from 'react';
import PropTypes from 'prop-types';
import {
    NotificationsNone, Settings, BrightnessHigh, Brightness3,
} from '@material-ui/icons/';
import './topbar.css';

export default function Topbar({ darkMode = false }) {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft" />
                <div className="topRight">
                    <div className="topbarIcons">
                        {!darkMode && (
                            <div className="topbarIcon">
                                <Brightness3 />
                            </div>
                        )}
                        {darkMode && (
                            <div className="topbarIcon">
                                <BrightnessHigh />
                            </div>
                        )}
                        <div className="topbarIcon">
                            <NotificationsNone />
                        </div>
                        <div className="topbarIcon">
                            <Settings />
                        </div>
                    </div>
                    <img src="https://randomwordgenerator.com/img/picture-generator/52e1d2414d53b10ff3d8992cc12c30771037dbf85254784b772778d5924e_640.jpg" alt="avatar" className="topAvatar" />
                </div>
            </div>
        </div>
    );
}

Topbar.defaultProps = {
    darkMode: false,
};

Topbar.propTypes = {
    darkMode: PropTypes.bool,
};
