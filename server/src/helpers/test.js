try {
  await prisma.accounts.create({
    data: item,
  });
} catch (err) {
  if (err.code === "P2002") {
    // unique constraint violation error
    // handle the error here
  } else if (err.code === "P2003") {
    // data validation error
    // handle the error here
  } else {
    // handle other database-related errors here
  }
}

///
// errorHandling.js
const handleDatabaseError = (error) => {
  if (error.code === "P2000") {
    // Column length
    throw new Error("A unique constraint has been violated");
  } else {
    throw new Error("An error occurred while accessing the database");
  }
};

export { handleDatabaseError };

// resolver.js
import { handleDatabaseError } from "./errorHandling.js";

const queries = {
  // ...
  merchantAccounts: async (_, __, { token, dataSources }) => {
    try {
      await prisma.$transaction(async () => {
        // ...
        for (const item of merchantAccountsDb) {
          await prisma.accounts
            .create({
              data: item,
            })
            .catch((error) => handleDatabaseError(error));
        }
      });
    } catch (error) {
      console.log(error);
    }
    // ...
  },
  // ...
};

export const resolvers = { queries };
