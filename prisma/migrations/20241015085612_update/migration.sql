/*
  Warnings:

  - You are about to drop the column `qunatity` on the `order_details` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_details" DROP COLUMN "qunatity",
ADD COLUMN     "quantity" INTEGER NOT NULL;
