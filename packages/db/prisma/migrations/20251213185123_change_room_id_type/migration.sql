/*
  Warnings:

  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_roomUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `roomId` on the `Chat` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_roomUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_roomId_fkey";

-- DropForeignKey
ALTER TABLE "_roomUser" DROP CONSTRAINT "_roomUser_A_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "roomId",
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_roomUser" DROP CONSTRAINT "_roomUser_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
ADD CONSTRAINT "_roomUser_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roomUser" ADD CONSTRAINT "_roomUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
