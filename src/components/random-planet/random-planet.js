import React, { Component } from 'react';

import SwapiService from "../../services/swapi-service";
import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator";

import './random-planet.css';


export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };

    constructor()  {
        super();
        console.log('constructor()');
    };

    componentDidMount() {
        console.log('componentDidMount()'); // викл. після першої появи. компонента на стор.
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        console.log('componentWillUnmount()'); // викл. перед видал. компонента із сторінки
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    };

    updatePlanet = (planet) => {
        console.log('updatePlanet()')
        const id = Math.floor(Math.random()*25) + 3;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false
        })
    };

    render() {

        console.log('render()')

        const { planet, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <PlanetView planet={planet}/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                { errorMessage }
                { spinner }
                { content }
            </div>

        );
    }
}

const PlanetView = ({ planet }) => {

    const { id, name, population,  rotationPeriod, diameter } = planet;

    return (
        <React.Fragment>
             <img className="planet-image"
                     src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="planet" />
             <div>
                <h4>{ name }</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{ population }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{ rotationPeriod }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{ diameter }</span>
                    </li>
                </ul>
                </div>
        </React.Fragment>
    )
};
