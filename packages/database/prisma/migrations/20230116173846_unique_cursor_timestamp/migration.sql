/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "id" SET DEFAULT extensions.uuid_generate_v4();

-- CreateIndex
CREATE UNIQUE INDEX "Post_createdAt_key" ON "public"."Post"("createdAt");
