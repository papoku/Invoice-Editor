import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { updateInvoiceList } from '../actions/index';


// material ui styling for inputs in this component, uses muitheme as argument
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableRow: {
    padding: '1px 1px 1px 1px',
  },
  row:{
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    }
  },
  menu: {
    fontSize: 14,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: '1px',
    //padding: '2px 0px 2px 0px',
  },
  input: {
    height: '.1em',
    fontSize: 14,
    width: 80,
    margin: '0px',
    padding: '12px',
  }
});


class InvoiceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      taxRate: []
    }
  }

  componentWillReceiveProps(nextProps) {
    // keep track of parent props to update local state
    if (nextProps.tableData !== this.props.tableData) {
      this.setState({
        data: nextProps.tableData,
        taxRate: this.getInitialTaxRateState(nextProps.tableData.length)
      });
    }

    // textfield updated, call the parent update handler
    if (nextProps.table !== this.props.table) {
      this.props.handleTableUpdate();
    }

  }

  // create seperate state for vat% selector
  getInitialTaxRateState(length) {
    //console.log('length',length);
    let taxState = {};
    for (let i = 0; i < length; i++) {
      taxState[i] = 0;
    }
    return taxState;
  }

  // text change handler for each of the text boxes
  handleTextChange = (name, index, uniqueId) => (event) => {
    const { id, value } = event.target;
    // proper way not to mutate the states
    let row = { ...this.state.data[id ? id : index] };
    let currentState = { ...this.state.taxRate };
    let newData = {};

    // checkpoint for account (select vat%) text box
    if (name === "account") {
      row.vat = value;
      row.unitPriceWithVat = ((row.amount * row.vat) / 100).toFixed(2);
      row.amountWithVat = (row.unitPriceWithVat * row.qty).toFixed(2);
      newData = { ...this.state.data, [index]: row };
      currentState[index] = row.vat;
      this.props.updateInvoiceList({ name: 'vat', value, uniqueId }, row);
    }
    else {
      row[name] = value;
      newData = { ...this.state.data, [id]: row };
    }

    // map the object into array again to update state
    const array = Object.keys(newData).map(i => newData[i]);
    this.setState({
      data: array,
      taxRate: currentState
    });

  }

  // Update database on textfiled lost focus
  handleOnBlur = (name, uniqueId) => (event) => {
    const { id, value } = event.target;
    let row = { ...this.state.data[id] };
    if (row.unitPrice > 0 && row.qty > 0) {
      switch (name) {
        case "unitPrice":
          row.amount = (value * row.qty).toFixed(2);
          break;
        case "qty":
          row.amount = (value * row.unitPrice).toFixed(2);
          break;
        default:
      }
    }

    // update if the field value changes, else no
    if (this.props.tableData[id][name] !== value) {
      this.props.updateInvoiceList({ name, value, uniqueId }, row);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead color="primary">
            <TableRow >
              <TableCell align="center">name</TableCell>
              <TableCell align="center">Number</TableCell>
              <TableCell align="center">UnitPrice</TableCell>
              <TableCell align="center">Unit Price*</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Vat (%)</TableCell>
              <TableCell align="center">Amount*</TableCell>
              <TableCell align="center">Account</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data && this.state.data.map((row, index) => (
              <TableRow key={index} hover={true} className={classes.row}>
                <TableCell className={classes.tableRow} component="th" scope="row">
                  <TextField
                    id={index.toString()}
                    className={classes.textField}
                    value={row.name}
                    onChange={this.handleTextChange('name')}
                    onBlur={this.handleOnBlur('name', row.id)}
                    margin="none"
                    variant="outlined"
                    InputProps={{ classes: { input: classes.input } }}
                  />
                </TableCell>
                <TableCell className={classes.tableRow} align="left">
                  <TextField
                    id={index.toString()}
                    className={classes.textField}
                    value={row.number}
                    onChange={this.handleTextChange('number')}
                    onBlur={this.handleOnBlur('number', row.id)}
                    margin="none"
                    variant="outlined"
                    InputProps={{ classes: { input: classes.input } }}
                  />
                </TableCell>
                <TableCell className={classes.tableRow} align="left">
                  <TextField
                    id={index.toString()}
                    className={classes.textField}
                    value={row.unitPrice}
                    onChange={this.handleTextChange('unitPrice')}
                    onBlur={this.handleOnBlur('unitPrice', row.id)}
                    margin="none"
                    variant="outlined"
                    InputProps={{ classes: { input: classes.input } }}
                  />
                </TableCell>
                <TableCell className={classes.tableRow} align="left">
                  <TextField
                    id={index.toString()}
                    className={classes.textField}
                    value={row.unitPriceWithVat}
                    onChange={this.handleTextChange('unitPriceWithVat')}
                    onBlur={this.handleOnBlur('unitPriceWithVat', row.id)}
                    margin="none"
                    variant="outlined"
                    InputProps={{ classes: { input: classes.input } }}
                  />
                </TableCell>
                <TableCell className={classes.tableRow} align="left">
                  <TextField
                    id={index.toString()}
                    className={classes.textField}
                    value={row.qty}
                    onChange={this.handleTextChange('qty')}
                    onBlur={this.handleOnBlur('qty', row.id)}
                    margin="none"
                    variant="outlined"
                    InputProps={{ classes: { input: classes.input } }}
                  />
                </TableCell>
                <TableCell className={classes.tableRow} align="left">
                  <TextField
                    id={index.toString()}
                    className={classes.textField}
                    value={row.amount}
                    onChange={this.handleTextChange('amount')}
                    onBlur={this.handleOnBlur('amount', row.id)}
                    margin="none"
                    variant="outlined"
                    InputProps={{ classes: { input: classes.input } }}
                  />
                </TableCell>
                <TableCell className={classes.tableRow} align="left">
                  <TextField
                    id={index.toString()}
                    className={classes.textField}
                    value={row.vat}
                    onChange={this.handleTextChange('vat')}
                    onBlur={this.handleOnBlur('vat', row.id)}
                    margin="none"
                    variant="outlined"
                    InputProps={{ classes: { input: classes.input } }}
                  />
                </TableCell>
                <TableCell className={classes.tableRow} align="left">
                  <TextField
                    id={index.toString()}
                    className={classes.textField}
                    value={row.amountWithVat}
                    onChange={this.handleTextChange('amountWithVat')}
                    onBlur={this.handleOnBlur('amountWithVat', row.id)}
                    margin="none"
                    variant="outlined"
                    InputProps={{ classes: { input: classes.input } }}
                  />
                </TableCell>
                <TableCell className={classes.tableRow} align="left">
                  <TextField
                    id={index.toString()}
                    className={classes.textField}
                    select
                    value={this.state.taxRate[index] ? this.state.taxRate[index] : row.vat}
                    onChange={this.handleTextChange('account', index, row.id)}
                    margin="none"
                    variant="outlined"
                    InputProps={{ classes: { input: classes.input } }}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      }
                    }}
                  >
                    {row.account && row.account.map((option, index) => (
                      <MenuItem className={classes.menu} key={index} value={option.value}>
                        {option.taxRate}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}


function mapStateToProps(state) {
  return {
    table: state.updatedRow.data
  };
}

/*Prop types should be added here for better debugging, avoided now */

export default connect(mapStateToProps, { updateInvoiceList })(withStyles(styles)(InvoiceTable));