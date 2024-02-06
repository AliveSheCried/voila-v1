// utils/formatCurrency.js
export const formatCurrency = (
  currency,
  availableBalance = 0,
  currentBalance = 0
) => {
  const availableBalanceInMajor = Number(availableBalance) / 100;
  const currentBalanceInMajor = Number(currentBalance) / 100;

  const format = (amount) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);

  return {
    formattedAvailableBalance: format(availableBalanceInMajor),
    formattedCurrentBalance: format(currentBalanceInMajor),
  };
};
