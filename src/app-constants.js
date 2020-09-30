// Define app constants

export const HTTP_STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
};

export const PAGE_SIZE = 10;

export const TIME_PERIOD = [
  {
    value: "12-2019 (01-12-2019)",
    label: "12-2019 (01-12-2019)",
    name: "timePeriod",
  },
  {
    value: "11-2019 (01-11-2019)",
    label: "11-2019 (01-11-2019)",
    name: "timePeriod",
  },
  {
    value: "10-2019 (01-10-2019)",
    label: "11-2019 (01-11-2019)",
    name: "timePeriod",
  },
];

export const SIDE_BAR = [
  {
    id: "home",
    key: "home",
    icon: "fa fa-book",
    text: "Home",
  },
  {
    id: "manage-contract",
    key: "manage-contract",
    icon: "fa fa-files-o",
    text: "Quản lý hợp đồng",
  },
  {
    id: "manage-partner",
    key: "manage-partner",
    icon: "fa fa-user",
    text: "Quản lý đối tác",
  },
  {
    id: "manage-ground-price",
    key: "manage-ground-price",
    icon: "fa fa-user-plus",
    text: "Quản lý khung giá mb",
  },
  {
    id: "manage-category",
    key: "manage-category",
    icon: "fa fa-user-plus",
    text: "Quản lý hạng mục",
  },
  {
    id: "manage-user",
    key: "manage-user",
    icon: "fa fa-user-plus",
    text: "Quản lý người dùng",
  },
  {
    id: "manage-station",
    key: "manage-station",
    icon: "fa fa-user-plus",
    text: "Quản lý trạm",
  },
  {
    id: "settings",
    key: "settings",
    icon: "fa fa-cogs",
    text: "Tùy chỉnh",
  },
];

export const PHONE_REGEX = /^[+|0][0-9]{9,15}$/;
export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const INIT_PROVINCE_OPTION = {
  id: 3,
  name: "province_id",
  value: 3,
  label: "Đà Nẵng",
};

export const INIT_DISTRICT_OPTION = {
  id: 1,
  name: "district_id",
  value: 1,
  label: "Hải Châu 1",
};

export const INIT_WARD_OPTION = {
  id: 1,
  name: "ward_id",
  value: 1,
  label: "Thạch thang",
};

export const INIT_AREA600_OPTION = {
  id: 1,
  name: "area600_id",
  value: 1,
  label: "Nội thị 1",
};
