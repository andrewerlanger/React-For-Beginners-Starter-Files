import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {

    static propTypes = {
        fish: PropTypes.shape({
            image: propTypes.string,
            name: propTypes.string,
            desc: propTypes.string,
            status: propTypes.string,
            price: propTypes.number,
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func,
    }

    handleChange = (event) => {
        // Step 1: take copy of current fish
        const updatedFish = { 
        	...this.props.fish,
        	[event.currentTarget.name]: event.currentTarget.value
        };

        // Step 2: pass this info to state
        this.props.editFish(this.props.index, updatedFish);
    }

    handleClick = () => {
    	this.props.deleteFish(this.props.index);
    }

    render() {
        const { name, price, status, desc } = this.props.fish;
        return (
            <form className="fish-edit" onSubmit={this.editFish}>
                <input onChange={this.handleChange} name="name" type="text" value={name}/>
                <input onChange={this.handleChange} name="price" type="text" value={price}/>
                <select defaultValue={status} onChange={this.handleChange} name="status">
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea onChange={this.handleChange} name="desc" value={desc}/>
                <input onChange={this.handleChange} name="image" type="text" value="Image"/>
                <button onClick={this.handleClick}>Delete Fish</button>
            </form>
        );
    }
}

export default EditFishForm;
