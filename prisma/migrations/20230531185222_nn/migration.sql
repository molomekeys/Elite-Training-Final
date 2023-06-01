-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StripePricing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price_coach" INTEGER NOT NULL,
    "price_client" INTEGER NOT NULL,
    "product_id" TEXT NOT NULL,
    "room_id" INTEGER,
    CONSTRAINT "StripePricing_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "AvailableRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_StripePricing" ("id", "price_client", "price_coach", "product_id", "room_id") SELECT "id", "price_client", "price_coach", "product_id", "room_id" FROM "StripePricing";
DROP TABLE "StripePricing";
ALTER TABLE "new_StripePricing" RENAME TO "StripePricing";
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
