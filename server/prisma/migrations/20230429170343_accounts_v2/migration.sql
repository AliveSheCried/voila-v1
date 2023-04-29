-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "available_balance_in_minor" DECIMAL(15,6) NOT NULL DEFAULT 0,
ADD COLUMN     "current_balance_in_minor" DECIMAL(15,6) NOT NULL DEFAULT 0;
