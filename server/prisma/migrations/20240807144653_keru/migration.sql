-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 123456,
    MODIFY `random` INTEGER NOT NULL DEFAULT 10;
