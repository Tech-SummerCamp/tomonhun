/*
  Warnings:

  - A unique constraint covering the columns `[favoriteId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoriteId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_favoriteId_key" ON "User"("favoriteId");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_userId_key" ON "favorite"("userId");
