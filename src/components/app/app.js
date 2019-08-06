import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';

import Row from "../row";
import ItemDetails, { Record } from "../item-details";
import SwapiService from "../../services/swapi-service";

import ItemList from '../item-list';
import PeoplePage from '../people-page';

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
      hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
      console.log('componentDidCatch()');
      this.setState({hasError: true});
  }


    render() {

      if (this.state.hasError) {
          return <ErrorIndicator />
      }

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const { getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            getAllPeople,
            getAllPlanets } = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage} >

        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />

      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>

        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );

    return (

      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          { planet }

          <div className="row mb2 button-row">
            <button className="toggle-planet btn btn-warning btn-lg">
              Toggle Random planet
            </button>
          
          </div>

          <PeoplePage />

          <div className="row mb2">
            <div className="xol-md-6">

              <ItemList
                onItemSelected={this.onPersonselected}
                getData={this.swapiService.getAllPeople}
                renderItem={(item) => (<span>{item.name}<button>!</button></span>)}>

                { ({name}) => <span>{name}</span> }
              </ItemList>

              <ItemList
                onItemSelected={this.onPersonselected}
                getData={this.swapiService.getAllPlanets}
                enderItem="{(item) => item.name}">

                { ({name}) => <span>{name}</span> }
              </ItemList>

            </div>
          </div>
        </div>
      </ErrorBoundry>
    );
  }
}