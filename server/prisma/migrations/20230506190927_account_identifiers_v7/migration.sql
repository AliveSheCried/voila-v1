-- AlterTable
ALTER TABLE "account_identifiers" ALTER COLUMN "beneficiary_id" DROP NOT NULL,
ALTER COLUMN "payment_source_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "beneficiary_id" DROP NOT NULL,
ALTER COLUMN "payment_source_id" DROP NOT NULL;
