-- AlterTable
ALTER TABLE "account_identifiers" ADD COLUMN     "remitter_id" TEXT;

-- AddForeignKey
ALTER TABLE "account_identifiers" ADD CONSTRAINT "account_identifiers_remitter_id_fkey" FOREIGN KEY ("remitter_id") REFERENCES "remitters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
