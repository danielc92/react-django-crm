import React, { Component } from 'react';
import CustomersService from './CustomersService';

const customersService = new CustomersService();


export default class CustomersList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            customers = [],
            nextPageURL = ''
        }
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        var self = this;
        customersService.getCustomers().then(response => {
            self.setState({customers: response.data, nextPageURL: response.nextLink})
        });
    }

    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
}
