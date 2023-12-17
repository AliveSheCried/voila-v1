// Get all merchant accounts
// const merchantAccounts = async (_, __, { token, dataSources }) => {
//   try {
//     const responseData =
//       await dataSources.tlMerchantAccountAPI.getMerchantAccounts(token);

//     //Check if data exists
//     if (!responseData.items || !Array.isArray(responseData.items)) {
//       throw new Error("No data found or data format not as expected!");
//     }

//     //Convert received data to schema object using reducer;
//     const merchantAccounts = responseData.items.reduce((acc, current) => [
//       acc,
//       current,
//     ]);

//     return merchantAccounts;
//   } catch (error) {
//     console.log(error);
//     // Throw the error so that it can be caught and handled by Apollo Server
//     throw error;
//   }
// };

// export { merchantAccounts };

const merchantAccounts = async (_, __, { token, dataSources }) => {
  try {
    const responseData =
      await dataSources.tlMerchantAccountAPI.getMerchantAccounts(token);

    console.log("Response data:", responseData); // Add this to debug

    // Check if responseData is defined and has an 'items' property that is an array
    if (!responseData || !Array.isArray(responseData.items)) {
      throw new Error("No data found or data format not as expected!");
    }

    // Correct the use of reducer to flatten the array
    const merchantAccounts = responseData.items.reduce(
      (acc, current) => [...acc, current],
      []
    );

    return merchantAccounts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { merchantAccounts };
