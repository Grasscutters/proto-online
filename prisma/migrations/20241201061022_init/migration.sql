-- CreateTable
CREATE TABLE "Dump" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Dump_id_key" ON "Dump"("id");
