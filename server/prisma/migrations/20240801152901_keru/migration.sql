-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL DEFAULT 123456,
    ADD COLUMN `random` INTEGER NOT NULL DEFAULT 10;