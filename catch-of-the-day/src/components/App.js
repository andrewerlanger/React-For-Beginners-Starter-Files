import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {

    // This is setting an empty state
    state = {
        fishes: {},
        order: {},
    };

    // This is a method for updating the state
    // It will be passed down components via props
    addFish = (fish) => {
        // Step 1: make a copy of the existing state
        // Note the dots just spread the data somehow
        const fishes = { ...this.state.fishes }

        // Step 2: update copy with state change
        fishes[`fish${Date.now()}`] = fish;

        // Step 3: update actual state with setState
        this.setState({
            fishes: fishes
        });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    {/* Header component within App component */}
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Inventory addFish={this.addFish}/>
            </div>
        );
    }
}

export default App;
