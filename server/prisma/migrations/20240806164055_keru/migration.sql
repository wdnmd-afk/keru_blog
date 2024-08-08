/*
  Warnings:

  - The primary key for the `userdetail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 123456,
    MODIFY `random` INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE `userdetail` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
