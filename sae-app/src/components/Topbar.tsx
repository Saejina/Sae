import React from 'react';

export function Topbar(): JSX.Element {
    return (
        <div className="flex border-b border-light bg-darker w-full h-16 justify-between items-center">
            <div className="w-full h-full flex items-center justify-center w-1/30 min-w-max ml-2">
                <a href="/" className="text-decoration-none link-dark">
                    <span className="text-primary text-2xl font-bold">Saejina</span>
                </a>
            </div>
            <div className="h-14 w-14">
                <img
                    src="https://thumbs.dreamstime.com/b/pink-fairytale-bird-paradise-elegant-plumage-flying-flapping-wings-179418217.jpg"
                    className="object-contain rounded-full"
                />
            </div>
        </div>
    );
}

export default Topbar;
