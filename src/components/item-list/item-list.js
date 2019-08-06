import React, { Component } from 'react';

import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

import './item-list.css';

export default class ItemList extends Component {

    swapiService = new SwapiService();

    state = {
        itemList: null
    };

    componentDidMount() {

        const { getData } = this.props;
        
        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                });
            });
    }

    renderItems(arr) {
        return arr.map((item) => {

            const { id, name } = item;

            const label = this.props.renderItem(item);

            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                    {name}
                </li>
            );
        });
    }

    render() {

        const { peopleList } = this.state;

        if (!peopleList) {
            return <Spinner />;
        }

        const items = this.renderItems(peopleList);

        return (
            <ul className="item-list list-group">
                { items }
            </ul>
        );
    }
}