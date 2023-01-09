/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Post` table. All the data in the column will be lost.

*/

CREATE EXTENSION IF NOT EXISTS pg_trgm schema extensions;
CREATE EXTENSION IF NOT EXISTS btree_gin schema extensions;

-- DropIndex
DROP INDEX "public"."Post_userId_categories_createdAt_idx";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "deletedAt",
ADD COLUMN     "textsearchable_index_col" tsvector DEFAULT ''::tsvector,
ALTER COLUMN "content" DROP NOT NULL;

create or replace function update_table_fts() returns trigger as $$
begin
  NEW.textsearchable_index_col := to_tsvector('english',
    NEW.title
  );

  RETURN NEW;
end; $$ language plpgsql security definer set search_path = public, pg_temp;

drop trigger if exists "update_fts" on "public"."Post";
create trigger "update_fts"
  before insert or update on "public"."Post"
  for each row
  execute function update_table_fts();

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "profileImage" TEXT;

-- CreateIndex
CREATE INDEX "Post_textsearchable_index_col_idx" ON "public"."Post" USING GIN ("textsearchable_index_col");

-- CreateIndex
CREATE INDEX "Post_userId_isModerated_categories_createdAt_idx" ON "public"."Post"("userId", "isModerated", "categories", "createdAt" DESC);
