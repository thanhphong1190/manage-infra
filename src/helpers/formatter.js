import React from "react";
import _ from "lodash";
import numeral from "numeral";
import moment from "moment";

export const noFormatter = (cell, row, rowIndex, formatExtraData) => {
  const pageIndex = _.get(formatExtraData, "page") || 1;
  return (pageIndex - 1) * 10 + rowIndex + 1;
};

export const currencyFormatter = (cell, row, rowIndex, formatExtraData) => {
  return numeral(cell).format("0,0") + "đ";
};

export const toCurrencyFormat = (number) => {
  return numeral(number || 0).format("0,0") + "đ";
};

export const dateFormatter = (cell, row, rowIndex, formatExtraData) => {
  if (!cell) return "";
  return moment(cell).format("DD/MM/YYYY");
};