//function to find the account_identifiers key in the transaction - TL returns this element in different places depending on the transaction type
function findAccountIdentifier(apiData, identifierType) {
  if (!apiData) return;

  const accountTypes = ["beneficiary", "payment_source", "remitter"];
  for (const accountType of accountTypes) {
    if (apiData[accountType]) {
      const accountIdentifiers = apiData[accountType].account_identifiers;
      if (accountIdentifiers) {
        for (const identifier of accountIdentifiers) {
          if (identifier.type === identifierType) {
            return identifier;
          }
        }
      }
    }
  }
}

//Helper function to map transaction data from the API to the structure require to insert into the database
//Function will need to return transaction data, beneficiary / remitter / payment source data, and account identifier data
export async function processTransactionData(apiData, id, prisma) {
  ////////Find internal account id for the merchant account
  const account = await prisma.accounts.findFirst({
    where: {
      account_id: id,
    },
  });

  const accountId = account.id;

  ///////TL API data structure supports sort code and IBAN type account identifiers; functions below determine which is present and return the data
  //Sort code
  const sortCodeAccountNumberIdentifier = findAccountIdentifier(
    apiData,
    "sort_code_account_number"
  );
  //iban
  const ibanIdentifier = findAccountIdentifier(apiData, "iban");

  ///////Check whether accountIdentifier data exists in database
  const existingAccountIdentifierData =
    await prisma.account_identifiers.findFirst({
      where: {
        OR: [
          {
            account_number: sortCodeAccountNumberIdentifier?.account_number,
            branch_number: sortCodeAccountNumberIdentifier?.sort_code,
          },
          {
            iban: ibanIdentifier?.iban,
          },
        ],
      },
    });

  /////Function that checks if beneficiary / remitter / payment source data exists in the database; if yes, use this to update the transaction; if no, create a new record and use this to update the transaction
  //Variables to store the type of account identifier and the id of the existing account identifier type
  const accountType = apiData.type;
  let beneficiaryId;
  let remitterId;
  let paymentSourceId;

  if (existingAccountIdentifierData) {
    //Check if the account identifier type exists in the database; if yes, simply update the transaction with the existing id for that account identifier type
    if (
      accountType === "beneficiary" &&
      existingAccountIdentifierData.beneficiary_id
    ) {
      // Update the transaction with the existing beneficiary_id
      beneficiaryId = existingAccountIdentifierData.beneficiary_id;
    } else if (
      accountType === "remitter" &&
      existingAccountIdentifierData.remitter_id
    ) {
      // Update the transaction with the existing remitter_id
      remitterId = existingAccountIdentifierData.remitter_id;
    } else if (
      accountType === "payment_source" &&
      existingAccountIdentifierData.payment_source_id
    ) {
      // Update the transaction with the existing payment_source_id
      paymentSourceId = existingAccountIdentifierData.payment_source_id;

      // Create a new record for the given account type and update the transaction and existing account identifier with the new id
    } else {
      if (accountType === "beneficiary") {
        const beneficiary = {
          id: uuid_v4(),
          type: apiData.beneficiary.type,
          account_holder_name: apiData.beneficiary.account_holder_name,
        };
        const createdBeneficiary = await prisma.beneficiaries.create({
          data: beneficiary,
        });
        //to be assigned to transactionData
        beneficiaryId = createdBeneficiary.id;

        //update matching row in account_identifiers table to include new beneficiary_id
        await prisma.account_identifiers.update({
          where: {
            id: existingAccountIdentifierData.id,
          },
          data: {
            beneficiary_id: createdBeneficiary.id,
          },
        });
      } else if (accountType === "remitter") {
        const remitter = {
          id: uuid_v4(),
          account_holder_name: apiData.remitter.account_holder_name,
        };
        const createdRemitter = await prisma.remitters.create({
          data: remitter,
        });
        //to be assigned to transactionData
        remitterId = createdRemitter.id;

        //update matching row in account_identifiers table to include new remitter_id
        await prisma.account_identifiers.update({
          where: {
            id: existingAccountIdentifierData.id,
          },
          data: {
            remitter_id: createdRemitter.id,
          },
        });
      } else if (accountType === "payment_source") {
        const paymentSource = {
          id: uuid_v4(),
          account_holder_name: apiData.payment_source.account_holder_name,
          created_at: new Date(),
          updated_at: new Date(),
        };
        const createdPaymentSource = await prisma.payment_sources.create({
          data: paymentSource,
        });
        //to be assigned to transactionData
        paymentSourceId = createdPaymentSource.id;

        //update matching row in account_identifiers table to include new payment_source_id
        await prisma.account_identifiers.update({
          where: {
            id: existingAccountIdentifierData.id,
          },
          data: {
            payment_source_id: createdPaymentSource.id,
          },
        });
      }
    }
    //create new type if ends here
  } else {
    // Handle the case where the account identifiers do not exist in the database
    //Create a new record for the account type beneficiary / remitter / payment source assigning the ids to variables above to be mapped to transactionData; also create a new record in the account_identifiers table
    if (accountType === "beneficiary") {
      const beneficiary = {
        id: uuid_v4(),
        type: apiData.beneficiary.type,
        account_holder_name: apiData.beneficiary.account_holder_name,
      };
      const createdBeneficiary = await prisma.beneficiaries.create({
        data: beneficiary,
      });
      //to be assigned to transactionData
      beneficiaryId = createdBeneficiary.id;
      //create new row in account_identifiers table
      await prisma.account_identifiers.create({
        data: {
          id: uuid_v4(),
          parent_account_id: accountId,
          type: apiData[accountType].account_identifiers.type,
          account_number:
            sortCodeAccountNumberIdentifier?.account_number || null,
          branch_number: sortCodeAccountNumberIdentifier?.sort_code || null,
          iban: ibanIdentifier?.iban || null,
          created_at: new Date(),
          updated_at: new Date(),
          beneficiary_id: createdBeneficiary.id,
        },
      });
    } else if (accountType === "remitter") {
      const remitter = {
        id: uuid_v4(),
        account_holder_name: apiData.remitter.account_holder_name,
      };
      const createdRemitter = await prisma.remitters.create({
        data: remitter,
      });
      //to be assigned to transactionData
      remitterId = createdRemitter.id;
      //create new row in account_identifiers table
      await prisma.account_identifiers.create({
        data: {
          id: uuid_v4(),
          parent_account_id: accountId,
          type: apiData[accountType].account_identifiers.type,
          account_number:
            sortCodeAccountNumberIdentifier?.account_number || null,
          branch_number: sortCodeAccountNumberIdentifier?.sort_code || null,
          iban: ibanIdentifier?.iban || null,
          created_at: new Date(),
          updated_at: new Date(),
          remitter_id: createdRemitter.id,
        },
      });
    } else if (accountType === "payment_source") {
      const paymentSource = {
        id: uuid_v4(),
        account_holder_name: apiData.payment_source.account_holder_name,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const createdPaymentSource = await prisma.payment_sources.create({
        data: paymentSource,
      });
      //to be assigned to transactionData
      paymentSourceId = createdPaymentSource.id;
      //create new row in account_identifiers table
      await prisma.account_identifiers.create({
        data: {
          id: uuid_v4(),
          parent_account_id: accountId,
          type: apiData[accountType].account_identifiers.type,
          account_number:
            sortCodeAccountNumberIdentifier?.account_number || null,
          branch_number: sortCodeAccountNumberIdentifier?.sort_code || null,
          iban: ibanIdentifier?.iban || null,
          created_at: new Date(),
          updated_at: new Date(),
          payment_source_id: createdPaymentSource.id,
        },
      });
    }
  } //if ends here

  const transactionData = {
    id: uuid_v4(),
    asset_id: "533ed8dd-e28e-4526-87ab-158b51b22c16", //hardcoded for now; review later
    transaction_id: apiData.id,
    currency: apiData.currency,
    amount_in_minor: apiData.amount_in_minor,
    status: apiData.status,
    created_at: apiData.created_at,
    executed_at: apiData.executed_at,
    settled_at: apiData.settled_at || null,
    transaction_type: apiData.type,
    reference:
      apiData.beneficiary.reference || apiData.remitter.reference || null,
    context_code: apiData.context_code,
    payout_id: apiData.payout_id,
    payment_id: apiData.payment_id,
    beneficiary_id: beneficiaryId || null,
    remitter_id: remitterId || null,
    payment_source_id: paymentSourceId || null,
  };

  return {
    transactionData,
  };
}
