/*
  Warnings:

  - The primary key for the `Coach` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Coach` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `ClientProfil` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `client_id` on the `ClientProfil` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `ClientProfil` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `client_id` on the `Events` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `coach_id` on the `Events` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `Events` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - Added the required column `phone_number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coach" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "numero_siren" TEXT NOT NULL,
    "licence_sportif" BLOB,
    "coach_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Coach_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Coach" ("coach_id", "created_at", "id", "licence_sportif", "numero_siren") SELECT "coach_id", "created_at", "id", "licence_sportif", "numero_siren" FROM "Coach";
DROP TABLE "Coach";
ALTER TABLE "new_Coach" RENAME TO "Coach";
CREATE UNIQUE INDEX "Coach_coach_id_key" ON "Coach"("coach_id");
CREATE TABLE "new_ClientProfil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "age" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    CONSTRAINT "ClientProfil_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClientProfil" ("age", "client_id", "id", "weight") SELECT "age", "client_id", "id", "weight" FROM "ClientProfil";
DROP TABLE "ClientProfil";
ALTER TABLE "new_ClientProfil" RENAME TO "ClientProfil";
CREATE UNIQUE INDEX "ClientProfil_client_id_key" ON "ClientProfil"("client_id");
CREATE TABLE "new_Events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "coach_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "salle" TEXT NOT NULL,
    "hours" BIGINT NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "type_offer" BIGINT NOT NULL,
    CONSTRAINT "Events_type_offer_fkey" FOREIGN KEY ("type_offer") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Events_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Events_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "Coach" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Events" ("client_id", "coach_id", "end", "hours", "id", "isPaid", "salle", "start", "type_offer") SELECT "client_id", "coach_id", "end", "hours", "id", "isPaid", "salle", "start", "type_offer" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
CREATE UNIQUE INDEX "Events_coach_id_key" ON "Events"("coach_id");
CREATE UNIQUE INDEX "Events_client_id_key" ON "Events"("client_id");
CREATE UNIQUE INDEX "Events_type_offer_key" ON "Events"("type_offer");
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coach_Id" TEXT,
    "user_Id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Client_coach_Id_fkey" FOREIGN KEY ("coach_Id") REFERENCES "Coach" ("coach_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Client_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("coach_Id", "created_at", "id", "user_Id") SELECT "coach_Id", "created_at", "id", "user_Id" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_user_Id_key" ON "Client"("user_Id");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "isPaidCustomer" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("email", "id", "image", "isPaidCustomer", "name", "password", "role") SELECT "email", "id", "image", "isPaidCustomer", "name", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
