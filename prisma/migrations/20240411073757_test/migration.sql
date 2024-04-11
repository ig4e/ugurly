/*
  Warnings:

  - A unique constraint covering the columns `[id,slug]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Url_slug_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Url_id_slug_key" ON "Url"("id", "slug");
