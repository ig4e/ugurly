/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_slug_key" ON "Url"("slug");
