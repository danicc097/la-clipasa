-- CreateEnum
CREATE TYPE "public"."UserAward" AS ENUM ('ARTESANO_MEMIFICADOR');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "awards" "public"."UserAward"[] DEFAULT ARRAY[]::"public"."UserAward"[];
