-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "moderationComment" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "id" SET DEFAULT extensions.uuid_generate_v4();
