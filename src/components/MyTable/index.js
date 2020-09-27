import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import PropTypes from "prop-types";
import classnames from "classnames";
import './style.scss';

const MyTable = props => {
  const {
    columns,
    data,
    page,
    sizePerPage,
    onTableChange,
    totalSize,
    cellEditProps,
    defaultSorted,
    keyField,
    stickyLastColumn,
    isNoPagination
  } = props;
  let _data = data.map((item, index) => {
    return {
      _id: index,
      ...item,
    }
  });
  return (
    <BootstrapTable
      remote
      keyField={ keyField }
      data={ _data }
      columns={ columns }
      defaultSorted={ defaultSorted }
      filter={ filterFactory() }
      pagination={ isNoPagination ? null : paginationFactory({ page, sizePerPage, totalSize }) }
      cellEdit={ cellEditFactory(cellEditProps) }
      onTableChange={ onTableChange }
      wrapperClasses={classnames("table-responsive", {
        "sticky-last-column": !!stickyLastColumn
      })}
    />
  );
};

MyTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  page: PropTypes.number,
  totalSize: PropTypes.number,
  sizePerPage: PropTypes.number,
  onTableChange: PropTypes.func.isRequired,
  defaultSorted: PropTypes.array,
  cellEditProps: PropTypes.object,
  keyField: PropTypes.string,
  stickyLastColumn: PropTypes.bool,
  isNoPagination: PropTypes.bool,
};

MyTable.defaultProps = {
  columns: [],
  data: [],
  page: 0,
  totalSize: 0,
  sizePerPage: 0,
  onTableChange: () => {},
  defaultSorted: [],
  cellEditProps: {},
  keyField: "_id",
  stickyLastColumn: true,
  isNoPagination: false
};

export default MyTable;
