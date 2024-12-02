-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dump" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hash" TEXT NOT NULL DEFAULT '',
    "author" TEXT NOT NULL
);
INSERT INTO "new_Dump" ("author", "id") SELECT "author", "id" FROM "Dump";
DROP TABLE "Dump";
ALTER TABLE "new_Dump" RENAME TO "Dump";
CREATE UNIQUE INDEX "Dump_id_key" ON "Dump"("id");
CREATE UNIQUE INDEX "Dump_hash_key" ON "Dump"("hash");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
