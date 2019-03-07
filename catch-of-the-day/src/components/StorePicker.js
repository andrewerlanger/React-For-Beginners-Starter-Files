// This is importing is from package.json
import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers.js';

// The class extends React.Component and includes the render method
class StorePicker extends React.Component {

    static propTypes = {
        history: PropTypes.object,
    };

    myInput = React.createRef();

    // Note we've set this as a PROPERTY as opposed to a FUNCTION
    // Specifically: a propery that's set to an arrow function
    goToStore = (event) => {
        // Step 1: prevent form from submitting
        event.preventDefault();

        // Step 2: get the store name from the input
        const storeName = this.myInput.current.value;

        // Step 3: route to the text provided
        this.props.history.push(`store/${storeName}`);
    };

    // The render method returns HTML
    render() {
        return (
            <form className="store-selector" onClick={this.goToStore}>
                {/* This is what a comment looks like */}
                <h2>Please Enter a Store</h2>
                <input
                    type="text"
                    ref={this.myInput}
                    required
                    placeholder="Store Name"
                    defaultValue={getFunName()}
                />
                <button type="submit">Visit Store -> </button>
            </form>
        )
    };
}

// This allows us to surface it to other files in the app
export default StorePicker;
