-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "coach_Id" BIGINT,
    "user_Id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Client_coach_Id_fkey" FOREIGN KEY ("coach_Id") REFERENCES "Coach" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Client_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("coach_Id", "created_at", "id", "user_Id") SELECT "coach_Id", "created_at", "id", "user_Id" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_user_Id_key" ON "Client"("user_Id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
