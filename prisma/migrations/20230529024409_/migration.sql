-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" BIGINT NOT NULL PRIMARY KEY,
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
CREATE TABLE "new_Coach" (
    "id" BIGINT NOT NULL PRIMARY KEY DEFAULT 1,
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
