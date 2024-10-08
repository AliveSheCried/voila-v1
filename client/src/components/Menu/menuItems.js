export const menuItems = [
  {
    name: "DATA API",
    icon: "",
    level: 1,
    path: "",
    children: [
      {
        name: "Get - accounts",
        icon: "code_blocks",
        level: 2,
        path: "/getDataAccounts",
        children: [],
      },
      {
        name: "Get - direct debits",
        icon: "south_west", //"do_not_disturb_on",
        level: 2,
        path: "/getDataDirectDebits",
        children: [],
      },
      {
        name: "Get - standing orders",
        icon: "south_west", //"chevron_right",
        level: 2,
        path: "/getDataStandingOrders",
        children: [],
      },
      {
        name: "Get - transactions",
        icon: "sort", //"grade  ",
        level: 2,
        path: "/getDataTransactions",
        children: [],
      },
      {
        name: "Get - account balance",
        icon: "savings",
        level: 2,
        path: "/getDataAccountBalance",
        children: [],
      },
    ],
  },
  {
    name: "PAYMENT API",
    icon: "",
    level: 1,
    path: "",
    children: [
      {
        name: "Get - merchant accounts",
        icon: "code_blocks", //"dataset",
        level: 2,
        path: "/getMerchantAccounts",
        children: [],
      },
      // {
      //   name: "Get - merchant account",
      //   icon: "data_usage",
      //   level: 2,
      //   path: "/getMerchantAccount",
      //   children: [],
      // },
      {
        name: "Get - transactions",
        icon: "sort",
        level: 2,
        path: "/getTransactions",
        children: [],
      },
      {
        name: "Create - payout",
        icon: "north_east",
        level: 2,
        path: "/payout",
        children: [],
      },
      {
        name: "Get - payout details",
        icon: "south_west",
        level: 2,
        path: "/getPayoutDetails",
        children: [],
      },
    ],
  },
  {
    name: "USER CREATED PAYMENT",
    icon: "",
    level: 1,
    path: "",
    children: [
      {
        name: "Shopping cart",
        icon: "shopping_cart",
        level: 2,
        path: "/cart",
        children: [],
      },
    ],
  },
];
