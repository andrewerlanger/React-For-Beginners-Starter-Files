import React from 'react';
import PropTypes from 'prop-types';

// Note you could also change this to an IMPLICIT return
// This is a stateless functional component
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


// Because this is a stateless functional component...
// ...we need to define PropTypes outside of the component
// Note that it starts with Header here
Header.propTypes = {
    tagline: PropTypes.string.isRequired
};

export default Header;
