/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `List` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "List" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "List_user_id_key" ON "List"("user_id");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
