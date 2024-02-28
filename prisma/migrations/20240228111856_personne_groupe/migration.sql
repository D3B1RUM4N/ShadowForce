-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Personne" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneNumber" TEXT NOT NULL,
    "lastName" TEXT,
    "firstName" TEXT,
    "job" TEXT,
    "groupe" TEXT NOT NULL DEFAULT 'civile'
);
INSERT INTO "new_Personne" ("firstName", "id", "job", "lastName", "phoneNumber") SELECT "firstName", "id", "job", "lastName", "phoneNumber" FROM "Personne";
DROP TABLE "Personne";
ALTER TABLE "new_Personne" RENAME TO "Personne";
CREATE UNIQUE INDEX "Personne_phoneNumber_key" ON "Personne"("phoneNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
