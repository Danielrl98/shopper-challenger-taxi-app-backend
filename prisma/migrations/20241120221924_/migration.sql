/*
  Warnings:

  - You are about to drop the column `cars` on the `Drivers` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `Drivers` table. All the data in the column will be lost.
  - Added the required column `car` to the `Drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax` to the `Drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drivers" DROP COLUMN "cars",
DROP COLUMN "rate",
ADD COLUMN     "car" TEXT NOT NULL,
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL;
