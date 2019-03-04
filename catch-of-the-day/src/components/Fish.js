import React from 'react';
import { formatPrice } from '../helpers'

class Fish extends React.Component {
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
