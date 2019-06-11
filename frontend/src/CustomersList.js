import React, { Component } from 'react';
import CustomersService from './CustomersService';

const customersService = new CustomersService();


export default class CustomersList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            customers : [],
            nextPageURL : ''
        }
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // Sets the initial state by calling getCustomers() method 
    componentDidMount() {
        var self = this;
        customersService.getCustomers().then(response => {
            self.setState({customers: response.data, nextPageURL: response.nextLink})
        });
    }

    // Can be called to delete a customer and adjust the state accordingly
    handleDelete(e, pk) {
        var self = this;
        customersService.deleteCustomer({pk : pk}).then(()=>{
            var newArray = self.state.customers.filter(function(obj) {
                return obj.pk !== pk;
            });
            self.setState({customers: newArray})
        });
    }


    // Sets the state for the next page customer data, as well as the next Page url
    nextPage() {
        var self = this;
        customersService.getCustomersByURL(this.state.nextPageURL).then(response => {
            self.setState({customers: response.data, nextPageURL: response.nextLink})
        });
    }


    render() {
        return (
            <React.Fragment>
                <h3>Customer List</h3>
                    <table className="table is-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.customers.map(customer=>{
                      
                                   return <tr key={customer.pk}
                                    >
                                        <td>{customer.pk}</td>
                                        <td>{customer.first_name}</td>
                                        <td>{customer.last_name}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.description}</td>
                                        <td><p className="buttons">
                                            <button className="button is-small" onClick={(e)=> this.handleDelete(e, customer.pk)}>Delete</button>
                                            <a href={'/customer/' + String(customer.pk)} className="button is-small">Update</a>
                                            </p>
                                        </td>
                                    </tr>
                            })}
                        </tbody>

                    </table>
                    <button className="button is-primary is-outlined" onClick={this.nextPage}>Next</button>
            </React.Fragment>
        )
    }
}
