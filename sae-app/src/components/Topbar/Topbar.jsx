import React from 'react';
import Logo from '../Logo/Logo';
import './topbar.css';
import {NotificationsNone, Settings, BrightnessHigh, Brightness3} from '@material-ui/icons/';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
        </div>
        <div className="topRight">
          <div className="topbarIcons">
            <div className="topbarIcon">
              <Brightness3 />
            </div>
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
