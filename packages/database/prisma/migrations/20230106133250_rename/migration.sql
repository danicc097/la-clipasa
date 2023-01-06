/*
  Warnings:

  - You are about to drop the column `isSubscriber` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dummyField]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dummyField` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "isSubscriber",
ADD COLUMN     "dummyField" TEXT,
ADD COLUMN     "renameIsSubscriber" BOOLEAN NOT NULL DEFAULT false;

update "User" set "dummyField" = 'dummy-default';

ALTER TABLE "public"."User" ALTER COLUMN "dummyField" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_dummyField_key" ON "public"."User"("dummyField");
