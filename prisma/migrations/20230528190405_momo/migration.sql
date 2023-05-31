/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `coach_Id` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `String` to `BigInt`.
  - You are about to alter the column `id` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `String` to `BigInt`.
  - The primary key for the `Coach` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `licence_coach` on the `Coach` table. All the data in the column will be lost.
  - You are about to drop the column `user_Id` on the `Coach` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Coach` table. The data in that column could be lost. The data in that column will be cast from `String` to `BigInt`.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `coach_id` to the `Coach` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licence_sportif` to the `Coach` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ClientProfil" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "age" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "client_id" BIGINT NOT NULL,
    CONSTRAINT "ClientProfil_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Events" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "coach_id" BIGINT NOT NULL,
    "client_id" BIGINT NOT NULL,
    CONSTRAINT "Events_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Events_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "Coach" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isPaidCustomer" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("email", "id", "image", "name", "password", "role") SELECT "email", "id", "image", "name", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Client" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "coach_Id" BIGINT NOT NULL,
    "user_Id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Client_coach_Id_fkey" FOREIGN KEY ("coach_Id") REFERENCES "Coach" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Client_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("coach_Id", "id", "user_Id") SELECT "coach_Id", "id", "user_Id" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_user_Id_key" ON "Client"("user_Id");
CREATE TABLE "new_Coach" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "numero_siren" TEXT NOT NULL,
    "licence_sportif" BLOB NOT NULL,
    "coach_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Coach_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Coach" ("id", "numero_siren") SELECT "id", "numero_siren" FROM "Coach";
DROP TABLE "Coach";
ALTER TABLE "new_Coach" RENAME TO "Coach";
CREATE UNIQUE INDEX "Coach_coach_id_key" ON "Coach"("coach_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ClientProfil_client_id_key" ON "ClientProfil"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "Events_coach_id_key" ON "Events"("coach_id");

-- CreateIndex
CREATE UNIQUE INDEX "Events_client_id_key" ON "Events"("client_id");
