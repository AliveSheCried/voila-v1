/*
  Warnings:

  - You are about to drop the column `bank_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_amount` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_category` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_classification` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_currency` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_date` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_description` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `banks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[account_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[access_token]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_expires` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_token` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_expires` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `refreshed_at` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `provider_id` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `amount_in_minor` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beneficiary_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_source_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_type` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_bank_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "bank_id",
ADD COLUMN     "account_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "provider_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "access_expires" DATE NOT NULL,
ADD COLUMN     "access_token" TEXT NOT NULL,
ADD COLUMN     "refresh_expires" DATE NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "refreshed_at" SET NOT NULL,
ALTER COLUMN "refreshed_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "provider_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "transaction_amount",
DROP COLUMN "transaction_category",
DROP COLUMN "transaction_classification",
DROP COLUMN "transaction_currency",
DROP COLUMN "transaction_date",
DROP COLUMN "transaction_description",
ADD COLUMN     "amount_in_minor" DECIMAL(15,6) NOT NULL,
ADD COLUMN     "beneficiary_id" TEXT NOT NULL,
ADD COLUMN     "context_code" TEXT,
ADD COLUMN     "created_at" DATE NOT NULL,
ADD COLUMN     "currency" VARCHAR(3) NOT NULL,
ADD COLUMN     "executed_at" DATE,
ADD COLUMN     "payment_id" TEXT,
ADD COLUMN     "payment_source_id" TEXT NOT NULL,
ADD COLUMN     "payout_id" TEXT,
ADD COLUMN     "reference" TEXT,
ADD COLUMN     "remitterId" TEXT,
ADD COLUMN     "remitter_id" TEXT,
ADD COLUMN     "settled_at" DATE,
ADD COLUMN     "status" VARCHAR(30) NOT NULL,
ADD COLUMN     "transaction_type" VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_id" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "banks";

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "country" TEXT,
    "tax_identifier" TEXT,
    "registration_number" TEXT,
    "website" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "industry" TEXT,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_user_type" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_type" TEXT NOT NULL,

    CONSTRAINT "user_user_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_type" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiaries" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "account_holder_name" TEXT NOT NULL,

    CONSTRAINT "beneficiaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts_identifiers" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "account_number" TEXT,
    "iban" VARCHAR(34),
    "swift" VARCHAR(11),
    "branch_number" VARCHAR(30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "beneficiary_id" TEXT NOT NULL,
    "payment_source_id" TEXT NOT NULL,

    CONSTRAINT "accounts_identifiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_sources" (
    "id" TEXT NOT NULL,
    "account_holder_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "remitters" (
    "id" TEXT NOT NULL,
    "account_holder_name" TEXT NOT NULL,

    CONSTRAINT "remitters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers" (
    "id" SERIAL NOT NULL,
    "provider_id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "logo_url" TEXT,
    "display_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_phone_key" ON "customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_type_type_key" ON "user_type"("type");

-- CreateIndex
CREATE UNIQUE INDEX "beneficiaries_id_key" ON "beneficiaries"("id");

-- CreateIndex
CREATE UNIQUE INDEX "providers_provider_id_key" ON "providers"("provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_account_id_key" ON "accounts"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_access_token_key" ON "tokens"("access_token");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_user_type" ADD CONSTRAINT "user_user_type_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_user_type" ADD CONSTRAINT "user_user_type_user_type_fkey" FOREIGN KEY ("user_type") REFERENCES "user_type"("type") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("provider_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_beneficiary_id_fkey" FOREIGN KEY ("beneficiary_id") REFERENCES "beneficiaries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payment_source_id_fkey" FOREIGN KEY ("payment_source_id") REFERENCES "payment_sources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_remitter_id_fkey" FOREIGN KEY ("remitter_id") REFERENCES "remitters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts_identifiers" ADD CONSTRAINT "accounts_identifiers_beneficiary_id_fkey" FOREIGN KEY ("beneficiary_id") REFERENCES "beneficiaries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accounts_identifiers" ADD CONSTRAINT "accounts_identifiers_payment_source_id_fkey" FOREIGN KEY ("payment_source_id") REFERENCES "payment_sources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("provider_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
