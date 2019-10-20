import React, { Component } from 'react';
import axios from 'axios';

export default class WeatherComponent extends Component {
    constructor(props) {
        super(props);

        this.onChangeZip = this.onChangeZip.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            zip: 0,
            url: '',
            weather: '',
            error: '',
        }
    }

    onChangeZip(e) {
        this.setState({
            zip: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const forcastQuery = {
            zip: this.state.zip,
            url: this.state.url
        }

        console.log(forcastQuery);

        axios.post('http://localhost:5000/weather/')
            .then(res => {
                console.log(res.data)
                this.setState({
                    weather: res.data.weather,
                    error: res.data.error,
                })
                console.log(this.state)
            });
    }

    componentDidMount() {
        axios.post('http://localhost:5000/weather/')
            .then(res => {
                console.log(res.data)
                this.setState({
                    weather: res.data.weather,
                    error: res.data.error,
                })
                console.log(this.state)
            });
    }

    render() {
        let forcast = <p>{this.state.weather}</p>
        if (this.state.weather === null) {
            forcast = <p>{this.state.error}</p>
        }

        return (
            <div>
                {/* <fieldset></fieldset>
                    <form onSubmit={this.onSubmit}>
                        <input name="zip" 
                            type="text"
                            autoComplete="off"
                            className="ghost-input"
                            placeholder="Enter a Zip Code"
                            onChange={this.onChangeZip}
                            required
                            />
                        <input type="submit"
                            className="ghost-button"
                            value="Get Weather"
                            />
                    </form>
                    {forcast}
                </fieldset> */}
                <p className="weather-text">{forcast}</p>
                <button type="button" className="weather-ghost-button" onClick={this.onSubmit}>Refresh Weather</button>
            </div>
        )
    }
}