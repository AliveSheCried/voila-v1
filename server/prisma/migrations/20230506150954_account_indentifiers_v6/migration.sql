/*
  Warnings:

  - Added the required column `beneficiary_id` to the `account_identifiers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_source_id` to the `account_identifiers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account_identifiers" ADD COLUMN     "beneficiary_id" TEXT NOT NULL,
ADD COLUMN     "payment_source_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "account_identifiers" ADD CONSTRAINT "account_identifiers_beneficiary_id_fkey" FOREIGN KEY ("beneficiary_id") REFERENCES "beneficiaries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "account_identifiers" ADD CONSTRAINT "account_identifiers_payment_source_id_fkey" FOREIGN KEY ("payment_source_id") REFERENCES "payment_sources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
