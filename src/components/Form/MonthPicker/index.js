import React from "react";
import { FormGroup, Label } from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";
import Picker from 'react-month-picker';
import 'react-month-picker/css/month-picker.css';
import moment from "moment";
import { PICKER_LANG } from '../../../app-constants';

const MonthBox = ({ value, onClick }) => {
  const _handleClick = (e) => {
    onClick && onClick(e)
  }
  return (
    <div onClick={_handleClick} className="month-box-style">
      {value}
    </div>
  )
}

class MonthPicker extends React.PureComponent {
  constructor (props) {
    super(props);
    this.pickAMonth = React.createRef();
  }
  render () {
    const { monthValue, onPick, label } = this.props;
    return (
      <FormGroup>
        <Label>{label}</Label>
        <Picker
          ref={this.pickAMonth}
          years={{min: {year: 2000, month: 1}, max: {year: 2100, month: 12}}}
          value={monthValue}
          lang={PICKER_LANG.months}
          onChange={this.handleChange}
          onDismiss={onPick}
        >
          <MonthBox value={this.makeText(monthValue)} onClick={this.handleClickMonthBox} />
        </Picker>
      </FormGroup>
    );
  }

  makeText = m => {
    if (m && m.year && m.month) return `${m.month < 10 ? ('0' + m.month) : m.month}/${m.year}`;
    return '?'
  }

  handleClickMonthBox = (e) => {
    this.pickAMonth.current.show();
  }

  handleChange = (year, month) => {
    const monthValue = { year, month };
    this.props.onPick(monthValue);
    setTimeout(() => this.pickAMonth.current.dismiss(), 0);
  }
}

MonthPicker.propTypes = {
  label: PropTypes.string,
  monthValue: PropTypes.object,
  onPick: PropTypes.func,
};

MonthPicker.defaultProps = {
  label: "",
  monthValue: { year: moment().year(), month: moment().month() },
  onPick: ({ month, year }) => {
  },
};

export default MonthPicker;
