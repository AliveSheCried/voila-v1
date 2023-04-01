/*
  Warnings:

  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_user_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_user_type" DROP CONSTRAINT "user_user_type_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_user_type" DROP CONSTRAINT "user_user_type_user_type_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_customer_id_fkey";

-- DropTable
DROP TABLE "customer";

-- DropTable
DROP TABLE "user_type";

-- DropTable
DROP TABLE "user_user_type";

-- CreateTable
CREATE TABLE "customers" (
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

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_user_types" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_type" TEXT NOT NULL,

    CONSTRAINT "user_user_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_types" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_phone_key" ON "customers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_types_type_key" ON "user_types"("type");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_user_types" ADD CONSTRAINT "user_user_types_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_user_types" ADD CONSTRAINT "user_user_types_user_type_fkey" FOREIGN KEY ("user_type") REFERENCES "user_types"("type") ON DELETE NO ACTION ON UPDATE NO ACTION;
