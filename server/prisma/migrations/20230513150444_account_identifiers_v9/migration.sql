-- DropForeignKey
ALTER TABLE "account_identifiers" DROP CONSTRAINT "account_identifiers_parent_account_id_fkey";

-- AlterTable
ALTER TABLE "account_identifiers" ALTER COLUMN "parent_account_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "account_identifiers" ADD CONSTRAINT "account_identifiers_parent_account_id_fkey" FOREIGN KEY ("parent_account_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
