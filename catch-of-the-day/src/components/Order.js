import React from 'react';
import { formatPrice } from '../helpers.js';

class Order extends React.Component {

    renderOrder = (fishKey) => {
    	const fish = this.props.fishes[fishKey];
    	const count = this.props.order[fishKey];

        if (!fish || !count) {
            return null;
        };

    	const unavailable = fish.status === 'unavailable';
    	if (unavailable) {
    		return <li key={fishKey}>Sorry, {fish ? fish.name : 'this fish'} is no longer available</li>
    	} else {
    		return (
    			<li key={fishKey}>
    				{count} lbs {fish.name}
    				{formatPrice(count * fish.price)}
                    <button onClick={ () => this.props.deleteOrderItem(fishKey) }>&times;</button>
    			</li>
    		);
    	}
    };

    calculateTotal = (fishKeys) => {
    	const fishes = this.props.fishes;
    	const order = this.props.order;
    	const total = fishKeys.reduce((total, fishKey) => {
    		const isAvailable = fishes[fishKey] && fishes[fishKey].status === 'available';

    		if (isAvailable) {
    			return (fishes[fishKey].price * order[fishKey]) + total;
    		} else {
    			return total;
    		}
		}, 0);
    	
    	return total;
    };

    render() {

        const fishKeys = Object.keys(this.props.order);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">
                	{fishKeys.map(fishKey => this.renderOrder(fishKey) )}
                </ul>
                <p>{fishKeys.length > 0 ? formatPrice(this.calculateTotal(fishKeys)) : '' }</p>
            </div>
        );
    }
}

export default Order;
