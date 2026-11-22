/*
  Warnings:

  - Added the required column `userId` to the `Burger` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Burger" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "desc" TEXT NOT NULL,
    "cheeseId" INTEGER NOT NULL,
    "pattyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Burger_cheeseId_fkey" FOREIGN KEY ("cheeseId") REFERENCES "Cheese" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Burger_pattyId_fkey" FOREIGN KEY ("pattyId") REFERENCES "Patty" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Burger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Burger" ("cheeseId", "desc", "id", "nome", "pattyId", "preco") SELECT "cheeseId", "desc", "id", "nome", "pattyId", "preco" FROM "Burger";
DROP TABLE "Burger";
ALTER TABLE "new_Burger" RENAME TO "Burger";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
