-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "id" SET DEFAULT extensions.uuid_generate_v4();
