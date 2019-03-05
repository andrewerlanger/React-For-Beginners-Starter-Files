import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import samples from '../sample-fishes';
import base from '../base';

class App extends React.Component {

    // This is setting an empty state
    state = {
        fishes: {},
        order: {},
    };

    // This is called the moment the app fully mounts on the page
    componentDidMount() {
        // This is just making the following line of code more readable
        // I have no idea why we need to put it inside of those curly braces...
        const { params } = this.props.match;

        // Reinstate our localStorage with getIteam (which takes a key)
        const localStorageRef = localStorage.getItem(params.storeId)

        // setState for order if localStorageRef exists
        // Note we need to convert the JSON string back into an object with JSON.parse()
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        
        // This is calling syncState on our base, which takes two arguments
        // 1. The directory in firebase we want to sync with
        // 2. An object with a couple of settings
        // Note this.ref is different to the references created with React.createRef()
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes',
        });
    };

    componentDidUpdate() {
        // This takes a key and a value
        // Key: store name
        // Value: order object for that store
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    };
    
    // This is triggered when the App component is no longer showing
    // Prevents against memory leaks
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

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

    editFish = (fishKey, updatedFish) => {
        // Step 1: make a copy of the existing state
        const fishes = { ...this.state.fishes }
        
        // Step 2: update copy with state change
        fishes[fishKey] = updatedFish

        // Step 3: update actual state with setState
        this.setState({ fishes });
    }

    deleteFish = (fishKey) => {
        const fishes = { ...this.state.fishes }
        fishes[fishKey] = null;
        this.setState({ fishes });
    }

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
    }

    deleteOrderItem = (orderKey) => {
        const order = { ...this.state.order }
        
        // We can use this syntax instead of setting it to null
        // This is because we're not mirroring the data on firebase
        delete order[orderKey];
        
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
                <Order 
                    order={this.state.order} 
                    fishes={this.state.fishes} 
                    deleteOrderItem={this.deleteOrderItem}
                />
                <Inventory 
                    addFish={this.addFish} 
                    editFish={this.editFish}
                    deleteFish={this.deleteFish} 
                    loadSampleFishes={this.loadSampleFishes} 
                    fishes={this.state.fishes} 
                />
            </div>
        );
    }
}

export default App;
