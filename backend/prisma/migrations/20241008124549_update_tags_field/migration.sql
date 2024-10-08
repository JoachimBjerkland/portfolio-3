-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "link" TEXT NOT NULL
);
