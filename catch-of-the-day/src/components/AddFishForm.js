import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {

    // Note that you don't seem to need const...
    // ...when creating a property inside of a component
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    // Note this is defined in lowerCamelCase
    static propTypes = {
        addFish: PropTypes.func
    };

    createFish = (event) => {
        // Step 1: prevent form from submitting
        event.preventDefault();

        // Step 2: create fish object
        const fish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        }
        this.props.addFish(fish);

        // Now reset the form
        event.currentTarget.reset();

    }

    render() {
        return (
            <form className="fish-edit" onSubmit={this.createFish}>
                <input name="name" ref={this.nameRef} type="text" placeholder="Name"/>
                <input name="price" ref={this.priceRef} type="text" placeholder="Price"/>
                <select name="status" ref={this.statusRef}>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea name="desc" ref={this.descRef} placeholder="Desc"/>
                <input name="image" ref={this.imageRef} type="text" placeholder="Image"/>
                <button type="submit">+ Add Fish</button>
            </form>
        );
    }
}

export default AddFishForm;
