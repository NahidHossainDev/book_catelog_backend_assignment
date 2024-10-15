/*
  Warnings:

  - You are about to drop the column `orderDetaislId` on the `orders` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_orderDetaislId_fkey";

-- AlterTable
ALTER TABLE "order_details" ADD COLUMN     "orderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderDetaislId",
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
