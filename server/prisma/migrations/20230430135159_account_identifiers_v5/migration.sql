/*
  Warnings:

  - A unique constraint covering the columns `[parent_account_id,type]` on the table `account_identifiers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "account_identifiers_parent_account_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "account_identifiers_parent_account_id_type_key" ON "account_identifiers"("parent_account_id", "type");
