import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {

    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func,
    };

    renderOrder = (fishKey) => {
    	const fish = this.props.fishes[fishKey];
    	const count = this.props.order[fishKey];

        if (!fish || !count) {
            // Note that this doesn't take a <CSSTransition> tag
            // Beccause you can't wrap a <CSSTransition> around null
            return null;
        };

        const transitionOptions = {
            classNames: "order",
            key: fishKey,
            timeout: {
                enter: 250,
                exit: 250
            }
        };

    	const unavailable = fish.status === 'unavailable';
    	if (unavailable) {
    		return (
                // This tag takes a few arguments
                // Note it's nested within the <TransitionGroup> tags
                // Note classNames (plural) is used here
                <CSSTransition {...transitionOptions}>
                    <li key={fishKey}>
                        Sorry, {fish ? fish.name : 'this fish'} is no longer available
                    </li>
                </CSSTransition>
            )
    	} else {
    		return (
    			<CSSTransition {...transitionOptions}>
                    <li key={fishKey}>
        				<span>
                            <TransitionGroup component="span" className="count">
                                {/* Note that key={count} here – this helps ensure there are two of the item: */}
                                {/* For the previous value and the current value */}
                                <CSSTransition classNames="count" key={count} timeout={{enter: 500, exit: 500}}>
                                    <span>{count}</span>
                                </CSSTransition>
                            </TransitionGroup>
                            lbs {fish.name}
                            {formatPrice(count * fish.price)}
                            <button onClick={ () => this.props.deleteOrderItem(fishKey) }>&times;</button>
                        </span>
        			</li>
                </CSSTransition>
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
                <TransitionGroup component="ul" className="order">
                	{fishKeys.map(fishKey => this.renderOrder(fishKey) )}
                </TransitionGroup>
                <p>{fishKeys.length > 0 ? formatPrice(this.calculateTotal(fishKeys)) : '' }</p>
            </div>
        );
    }
}

export default Order;
