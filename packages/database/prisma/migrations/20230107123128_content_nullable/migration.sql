-- AlterTable
ALTER TABLE "public"."Post" ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "textsearchable_index_col" DROP DEFAULT;
