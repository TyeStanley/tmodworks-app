-- CreateEnum
CREATE TYPE "public"."CheatCategoryType" AS ENUM ('PLAYER', 'INVENTORY', 'STATS', 'ENEMIES', 'WEAPONS', 'GAME', 'PHYSICS', 'TELEPORT', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Game" (
    "id" TEXT NOT NULL,
    "steamAppId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "processName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cheat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cheat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GameCheat" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "cheatId" TEXT NOT NULL,
    "displayName" TEXT,
    "offsets" JSONB NOT NULL,
    "parameters" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameCheat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CheatCategory" (
    "id" TEXT NOT NULL,
    "name" "public"."CheatCategoryType" NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CheatCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_steamAppId_key" ON "public"."Game"("steamAppId");

-- CreateIndex
CREATE UNIQUE INDEX "Cheat_name_key" ON "public"."Cheat"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GameCheat_gameId_cheatId_key" ON "public"."GameCheat"("gameId", "cheatId");

-- CreateIndex
CREATE UNIQUE INDEX "CheatCategory_name_key" ON "public"."CheatCategory"("name");

-- AddForeignKey
ALTER TABLE "public"."Cheat" ADD CONSTRAINT "Cheat_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."CheatCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GameCheat" ADD CONSTRAINT "GameCheat_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GameCheat" ADD CONSTRAINT "GameCheat_cheatId_fkey" FOREIGN KEY ("cheatId") REFERENCES "public"."Cheat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
