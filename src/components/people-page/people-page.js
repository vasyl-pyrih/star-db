import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import PersonDetails from '../person-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from "../error-indicator";

import './people-page.css';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 11,
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const itemList = (
      <ItemList
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}
            renderItem={(name, gender, birthYear) => `${name} (${gender}, ${birthYear})`} />
    );

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={personDetails} />
    );
  }
}