/*
  Warnings:

  - You are about to drop the column `subscription` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionDuration` on the `User` table. All the data in the column will be lost.
  - Added the required column `isSubscribed` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscription",
DROP COLUMN "subscriptionDuration",
ADD COLUMN     "isSubscribed" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
