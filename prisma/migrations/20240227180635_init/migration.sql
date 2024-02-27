-- CreateTable
CREATE TABLE "Server" (
    "serverID" TEXT NOT NULL PRIMARY KEY,
    "serverName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Personne" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneNumber" TEXT NOT NULL,
    "lastName" TEXT,
    "firstName" TEXT,
    "job" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Personne_phoneNumber_key" ON "Personne"("phoneNumber");
