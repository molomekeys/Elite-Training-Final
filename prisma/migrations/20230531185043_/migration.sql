/*
  Warnings:

  - The primary key for the `Offer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Offer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- CreateTable
CREATE TABLE "StripePricing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price_coach" INTEGER NOT NULL,
    "price_client" INTEGER NOT NULL,
    "product_id" TEXT NOT NULL,
    "room_id" INTEGER NOT NULL,
    CONSTRAINT "StripePricing_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "AvailableRoom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AvailableRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "room_name" TEXT NOT NULL,
    "related_price" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Offer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" BIGINT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "coachPrice" INTEGER NOT NULL,
    "clientPrice" INTEGER NOT NULL,
    CONSTRAINT "Offer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Offer" ("clientPrice", "coachPrice", "id", "productId", "weekNumber") SELECT "clientPrice", "coachPrice", "id", "productId", "weekNumber" FROM "Offer";
DROP TABLE "Offer";
ALTER TABLE "new_Offer" RENAME TO "Offer";
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
