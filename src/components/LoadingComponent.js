import React, { Component } from 'react';

export default class Loading extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: 'Loading'
        }
    }

    // loading animation
    componentDidMount() {
        const stopper = this.state.text + '...'

        this.interval = window.setInterval(() => {
            // reset text if three dots, otherwise add a dot
            this.state.text === stopper
                ? this.setState({ text: 'Loading' })
                : this.setState((currentState) => {
                    return {
                        text: currentState.text + '.'
                    }
                })
        }, 300)
    }

    // need to unmount to stop running otherwise the setInterval will keep running in the background even after its done
    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        return <p>{this.state.text}</p>
    }
}