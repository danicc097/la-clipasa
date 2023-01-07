/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Post_userId_categories_createdAt_idx";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "deletedAt",
ADD COLUMN     "textsearchable_index_col" tsvector GENERATED ALWAYS AS (to_tsvector('english', coalesce(title,''))) STORED;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "profileImage" TEXT;

-- CreateIndex
CREATE INDEX "Post_textsearchable_index_col_idx" ON "public"."Post" USING GIN ("textsearchable_index_col");

-- CreateIndex
CREATE INDEX "Post_userId_isModerated_categories_createdAt_idx" ON "public"."Post"("userId", "isModerated", "categories", "createdAt" DESC);
