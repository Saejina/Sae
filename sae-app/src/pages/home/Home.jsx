import React from 'react';
import './home.css';
import { Button } from 'react-bootstrap';

export default function Home() {
    return (
        <div className="home">
            <Button variant="primary" target="/users">Click Me!</Button>
        </div>
    );
}
