import React, { Component } from 'react';

import LoadingComponent from './LoadingComponent';
import ChecklistDisplayComponent from './ChecklistDisplayComponent';

export default class ChecklistComponent extends Component {
    // component - a function or a class which optionally accepts input and returns a react element (what it returns is what will be the UI of the component)
    // need to use class component to be able to manage state
    // constructor allows us to create component instance state
    constructor(props) {
        // invokes the constructor of the class we are extending
        super(props)

        this.state = {
            items: [],
            input: '',
            loading: true
        }

        // bind allows you to specify what the this keyword references
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleRemoveItem = this.handleRemoveItem.bind(this)
        this.updateInput = this.updateInput.bind(this)
        console.log('--constructor--')
    }

    // a React thing, called whenever the component is mounted into the DOM (after render)
    // dont need to bind (done by React)
    // AJAX requests
    componentDidMount() {
        console.log('--componentDidMount--')

        // get items, fake AJAX request
        this.fetchItems()
            .then((items) => {
                // setState with obtained items and hide loading
                this.setState({
                    items,
                    loading: false
                })
            })
    }

    // also a React thing, invoked whenever component updates = receive new props / state changes
    componentDidUpdate() {
        console.log('--componentDidUpdate--')
    }

    // also a React thing, invoked whenever component is removed from the DOM
    componentWillUnmount() {
        console.log('--componentWillUnmount--')
    }

    fetchItems() {
        return new Promise((res, rej) => {
            const items = [
                {
                    name: 'Buy Groceries',
                    active: true,
                },
                {
                    name: 'Do Homework',
                    active: true,
                },
                {
                    name: 'Do Laundry',
                    active: true,
                }
            ]
            // wait 2 seconds in order to get the data
            setTimeout(() => res(items), 2000)
        })
    }

    handleAddItem() {
        // with React, you explicitly tell React when you want to rerender and update the view based on the state
        // do this by using setstate
        // currentState is a predefined argument
        this.setState((currentState) => {
            return {
                // dont use .push because we don't want to modify the array directly
                // .concat creates a new array
                items: currentState.items.concat([{
                    name: this.state.input,
                    active: true
                }]),
                // reset input to empty string so it goes away from input field
                input: ''
            }
        })
    }

    handleRemoveItem(name) {
        // update state, merge what function returns with current state
        // we don't know what the this keyword is referencing just by looking at the definition, we need to look at when the function is invoked (look to the left of the dot of when it is invoked, if there is object there, that is what it is referencing). can use .bind in constructor to force the this keyword to be what we want it to be
        this.setState((currentState) => {
            return {
                // only changes this state property since it merges with current state
                items: currentState.items.filter((item) => item.name !== name)
            }
        })
        // cant do something like "this.state.friends = this.state.friends.filter((item) => item.name !== name)", mutating state (big no-no) and React wouldn't know that state changed
    }

    updateInput(e) {
        const value = e.target.value

        // if updating based on previous state, need to use functional setState (arrow function)
        // we don't care so we can just use object setState
        this.setState({
            input: value
        })
    }

    render() {
        console.log('--render--')

        if (this.state.loading === true) {
            return <LoadingComponent />
        }

        // can think of this form as updating state
        return (
            <div>
                <input
                    type='text'
                    className="ghost-input"
                    placeholder='New Item'
                    value={this.state.input}
                    onChange={this.updateInput}
                />

                <div class="row">
                    <div class="column">
                        <button className="list-ghost-button" onClick={this.handleAddItem}>Add Item</button>
                    </div>
                    <div class="column">
                        <button className="list-ghost-button" onClick={() => this.setState({ items: [] })}>Clear List</button>
                    </div>
                </div>

                <ChecklistDisplayComponent
                    list={this.state.items}
                    onRemoveItem={this.handleRemoveItem}
                />
            </div>
        )
    }
}