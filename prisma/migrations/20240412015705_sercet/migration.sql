/*
  Warnings:

  - A unique constraint covering the columns `[secret]` on the table `Key` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Url_id_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Key_secret_key" ON "Key"("secret");
