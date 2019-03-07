import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers'

class Fish extends React.Component {
    
    // Why is this static?
    // Because we're declaring it for ALL INSTANCES of Fish
    // It lives on the mumma compontent and is kind of only declared once
    static propTypes = {
        details: propTypes.shape({
            image: propTypes.string,
            name: propTypes.string,
            desc: propTypes.string,
            status: propTypes.string,
            price: propTypes.number,
        }),
        addToOrder: propTypes.func
    }

    handleClick = () => {
    	this.props.addToOrder(this.props.index)
    }

    render() {
        const { image, name, desc, price, status } = this.props.details;
        const notAvailable = status === "unavailable";
        return (
        	<li className="menu-fish">
        		<img src={image} alt={name}/>
        		<h3 className="fish-name">
        			{name}
        			<span className="price">{formatPrice(price)}</span>
        		</h3>
        		<p>{desc}</p>
        		<button disabled={notAvailable} onClick={this.handleClick}>{notAvailable ? "Sold Out" : "Add to Cart" }</button>
        	</li>
        );
    }
}

export default Fish;
