-- DropIndex
DROP INDEX "Tag_name_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,  -- Ingen NOT NULL
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "link" TEXT NOT NULL
);

INSERT INTO "new_Project" ("description", "id", "link", "public", "publishedAt", "status", "title")
SELECT "description", "id", "link", "public", "publishedAt", "status", "title" FROM "Project";

-- Fyll inn content for de eksisterende radene
UPDATE "new_Project" SET "content" = '' WHERE "content" IS NULL;

DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
