import React from 'react';

// Note you could also change this to an IMPLICIT return
const Header = (props) => {
    return (
        <header className="top">
            <h1>Catch
            <span className="ofThe">
                <span className="of">of</span>
                <span className="the">the</span>
            </span>
            Day</h1>
            <h3 className="tagline">
                <span>{props.tagline}</span>
            </h3>
        </header>
    )
}

export default Header;
