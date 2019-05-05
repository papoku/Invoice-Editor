import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInvoiceList } from '../actions/index';
import InvoiceTable from './InvoiceTable';

class InvoiceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  componentDidMount = async()=> {
    // fetch table from Json-server (db.json) and update redux store
    await this.props.fetchInvoiceList();
  }

  componentWillReceiveProps(nextProps) {
    // if store updates, update local states
    nextProps.data!==this.state.data && this.setState({ data: nextProps.data });
  }

  //table update handler for text field changes
  handleTableUpdate = () =>{
    this.props.fetchInvoiceList();
  }

  render() {
    return (
        <React.Fragment>
            <InvoiceTable tableData={this.props.data} handleTableUpdate={this.handleTableUpdate.bind(this)}/>
        </React.Fragment> 
    );
  }
}

// map table data from redux store
function mapStateToProps(state) {
    return {
    data: state.table.data
  };
}

/*Prop types should be added here for better debugging, avoided now */

export default connect( mapStateToProps, { fetchInvoiceList })(InvoiceComponent);
