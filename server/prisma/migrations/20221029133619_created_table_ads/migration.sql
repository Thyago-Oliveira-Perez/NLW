-- CreateTable
CREATE TABLE "Ads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gamesId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "yearsPlaying" INTEGER NOT NULL,
    "discord" TEXT NOT NULL,
    "weekDays" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "useVoiceChannel" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ads_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
