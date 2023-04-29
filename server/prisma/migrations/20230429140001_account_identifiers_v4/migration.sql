-- DropForeignKey
ALTER TABLE "account_identifiers" DROP CONSTRAINT "account_identifiers_parent_account_id_fkey";

-- AddForeignKey
ALTER TABLE "account_identifiers" ADD CONSTRAINT "account_identifiers_parent_account_id_fkey" FOREIGN KEY ("parent_account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
