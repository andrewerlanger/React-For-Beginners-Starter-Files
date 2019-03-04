import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import samples from '../sample-fishes';

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
    };

    loadSampleFishes = () => {
        this.setState({
            fishes: samples
        });
    }

    addToOrder = (key) => {
        // Step 1: make a copy of the existing state
        const order = { ...this.state.order };

        // Step 2: update copy with state change
        order[key] = order[key] + 1 || 1;

        // Step 3: update actual state with setState
        this.setState({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    {/* Header component within App component */}
                    <Header tagline="Fresh Seafood Market"/>
                    <ul>
                        {Object.keys(this.state.fishes).map((key) =>
                            <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
                        )}
                    </ul>
                </div>
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
            </div>
        );
    }
}

export default App;
