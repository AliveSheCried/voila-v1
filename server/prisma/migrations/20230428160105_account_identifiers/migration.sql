/*
  Warnings:

  - You are about to drop the column `account_number` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `account_type` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `branch_number` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `iban` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `swift` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the `accounts_identifiers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accounts_identifiers" DROP CONSTRAINT "accounts_identifiers_beneficiary_id_fkey";

-- DropForeignKey
ALTER TABLE "accounts_identifiers" DROP CONSTRAINT "accounts_identifiers_payment_source_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "account_number",
DROP COLUMN "account_type",
DROP COLUMN "branch_number",
DROP COLUMN "iban",
DROP COLUMN "swift";

-- DropTable
DROP TABLE "accounts_identifiers";

-- CreateTable
CREATE TABLE "account_identifiers" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "account_number" TEXT,
    "iban" VARCHAR(34),
    "swift" VARCHAR(11),
    "branch_number" VARCHAR(30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "beneficiary_id" TEXT NOT NULL,
    "payment_source_id" TEXT NOT NULL,

    CONSTRAINT "account_identifiers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_identifiers_account_id_key" ON "account_identifiers"("account_id");

-- AddForeignKey
ALTER TABLE "account_identifiers" ADD CONSTRAINT "account_identifiers_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "account_identifiers" ADD CONSTRAINT "account_identifiers_beneficiary_id_fkey" FOREIGN KEY ("beneficiary_id") REFERENCES "beneficiaries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "account_identifiers" ADD CONSTRAINT "account_identifiers_payment_source_id_fkey" FOREIGN KEY ("payment_source_id") REFERENCES "payment_sources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
