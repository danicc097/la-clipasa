-- DropIndex
DROP INDEX "public"."Post_userId_categories_createdAt_idx";

-- CreateIndex
CREATE INDEX "Post_userId_categories_createdAt_idx" ON "public"."Post"("userId", "categories", "createdAt" DESC);
