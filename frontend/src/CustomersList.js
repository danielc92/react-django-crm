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
    handleDelete() {
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
                <section className="section">
                    <table className="table">
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
                      
                                    <tr key={customer.pk}
                                    >
                                        <td>{customer.first_name}</td>
                                        <td>{customer.last_name}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.description}</td>
                                        <td><button onClick={(e)=> this.handleDelete(e, customer.pk)} className="button is-link">Update</button>
                                        <a href={'/customer/' + customer.pk} className="button is-danger">Delete</a></td>
                                    </tr>
                            })}
                        </tbody>

                    </table>
                    <button className="button is-primary" onClick={this.nextPage}>Next</button>
                </section>
            </React.Fragment>
        )
    }
}
