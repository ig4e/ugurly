/*
  Warnings:

  - You are about to drop the column `name` on the `Url` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Url" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT,
    "url" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT,
    CONSTRAINT "Url_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Url" ("createdAt", "createdById", "id", "password", "updatedAt", "url") SELECT "createdAt", "createdById", "id", "password", "updatedAt", "url" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
CREATE INDEX "Url_slug_idx" ON "Url"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
