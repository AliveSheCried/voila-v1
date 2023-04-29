/*
  Warnings:

  - You are about to drop the column `account_id` on the `account_identifiers` table. All the data in the column will be lost.
  - You are about to drop the column `beneficiariesId` on the `account_identifiers` table. All the data in the column will be lost.
  - You are about to drop the column `payment_sourcesId` on the `account_identifiers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parent_account_id]` on the table `account_identifiers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parent_account_id` to the `account_identifiers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account_identifiers" DROP CONSTRAINT "account_identifiers_account_id_fkey";

-- DropForeignKey
ALTER TABLE "account_identifiers" DROP CONSTRAINT "account_identifiers_beneficiariesId_fkey";

-- DropForeignKey
ALTER TABLE "account_identifiers" DROP CONSTRAINT "account_identifiers_payment_sourcesId_fkey";

-- DropIndex
DROP INDEX "account_identifiers_account_id_key";

-- AlterTable
ALTER TABLE "account_identifiers" DROP COLUMN "account_id",
DROP COLUMN "beneficiariesId",
DROP COLUMN "payment_sourcesId",
ADD COLUMN     "parent_account_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_identifiers_parent_account_id_key" ON "account_identifiers"("parent_account_id");

-- AddForeignKey
ALTER TABLE "account_identifiers" ADD CONSTRAINT "account_identifiers_parent_account_id_fkey" FOREIGN KEY ("parent_account_id") REFERENCES "accounts"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
