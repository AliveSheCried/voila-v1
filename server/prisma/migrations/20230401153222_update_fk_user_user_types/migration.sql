/*
  Warnings:

  - You are about to drop the column `user_type` on the `user_user_types` table. All the data in the column will be lost.
  - Added the required column `user_type_id` to the `user_user_types` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_user_types" DROP CONSTRAINT "user_user_types_user_type_fkey";

-- AlterTable
ALTER TABLE "user_user_types" DROP COLUMN "user_type",
ADD COLUMN     "user_type_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "user_user_types" ADD CONSTRAINT "user_user_types_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "user_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
