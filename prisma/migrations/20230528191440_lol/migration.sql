/*
  Warnings:

  - The primary key for the `Offer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Offer` table. The data in that column could be lost. The data in that column will be cast from `String` to `BigInt`.
  - You are about to alter the column `productId` on the `Offer` table. The data in that column could be lost. The data in that column will be cast from `String` to `BigInt`.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `BigInt`.
  - Added the required column `hours` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salle` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_offer` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Offer" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "productId" BIGINT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "coachPrice" INTEGER NOT NULL,
    "clientPrice" INTEGER NOT NULL,
    CONSTRAINT "Offer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Offer" ("clientPrice", "coachPrice", "id", "productId", "weekNumber") SELECT "clientPrice", "coachPrice", "id", "productId", "weekNumber" FROM "Offer";
DROP TABLE "Offer";
ALTER TABLE "new_Offer" RENAME TO "Offer";
CREATE TABLE "new_Product" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "adress" TEXT,
    "phoneNumber" TEXT
);
INSERT INTO "new_Product" ("adress", "id", "name", "phoneNumber") SELECT "adress", "id", "name", "phoneNumber" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Events" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "coach_id" BIGINT NOT NULL,
    "client_id" BIGINT NOT NULL,
    "salle" TEXT NOT NULL,
    "hours" BIGINT NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "type_offer" BIGINT NOT NULL,
    CONSTRAINT "Events_type_offer_fkey" FOREIGN KEY ("type_offer") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Events_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Events_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "Coach" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Events" ("client_id", "coach_id", "end", "id", "start") SELECT "client_id", "coach_id", "end", "id", "start" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
CREATE UNIQUE INDEX "Events_coach_id_key" ON "Events"("coach_id");
CREATE UNIQUE INDEX "Events_client_id_key" ON "Events"("client_id");
CREATE UNIQUE INDEX "Events_type_offer_key" ON "Events"("type_offer");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
