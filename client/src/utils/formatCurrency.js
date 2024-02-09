// utils/formatCurrency.js
export const formatCurrency = (
  currency,
  availableBalance = 0,
  currentBalance = 0,
  transactionAmount = 0
) => {
  const availableBalanceInMajor = Number(availableBalance) / 100;
  const currentBalanceInMajor = Number(currentBalance) / 100;
  const transactionAmountInMajor = Number(transactionAmount) / 100;

  const format = (amount) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency.trim().toUpperCase(),
      minimumFractionDigits: 2,
    }).format(amount);

  // const format = (amount) => {
  //   const result = new Intl.NumberFormat("en-GB", {
  //     style: "currency",
  //     currency: currency.trim().toUpperCase(),
  //     minimumFractionDigits: 2,
  //   }).format(amount);
  //   console.log(`Formatted ${amount}: ${result}`);
  //   return result;
  // };

  return {
    formattedAvailableBalance: format(availableBalanceInMajor),
    formattedCurrentBalance: format(currentBalanceInMajor),
    formattedTransactionAmount: format(transactionAmountInMajor),
  };
};
