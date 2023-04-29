/*
  Warnings:

  - You are about to drop the column `beneficiary_id` on the `account_identifiers` table. All the data in the column will be lost.
  - You are about to drop the column `payment_source_id` on the `account_identifiers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "account_identifiers" DROP CONSTRAINT "account_identifiers_beneficiary_id_fkey";

-- DropForeignKey
ALTER TABLE "account_identifiers" DROP CONSTRAINT "account_identifiers_payment_source_id_fkey";

-- AlterTable
ALTER TABLE "account_identifiers" DROP COLUMN "beneficiary_id",
DROP COLUMN "payment_source_id",
ADD COLUMN     "beneficiariesId" TEXT,
ADD COLUMN     "payment_sourcesId" TEXT;

-- AddForeignKey
ALTER TABLE "account_identifiers" ADD CONSTRAINT "account_identifiers_beneficiariesId_fkey" FOREIGN KEY ("beneficiariesId") REFERENCES "beneficiaries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_identifiers" ADD CONSTRAINT "account_identifiers_payment_sourcesId_fkey" FOREIGN KEY ("payment_sourcesId") REFERENCES "payment_sources"("id") ON DELETE SET NULL ON UPDATE CASCADE;
