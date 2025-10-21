-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 123456,
    MODIFY `random` INTEGER NOT NULL DEFAULT 10;

-- CreateTable
CREATE TABLE `HtmlTemplate` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('A4', 'A5', 'CUSTOM') NOT NULL,
    `content` TEXT NOT NULL,
    `widthMm` INTEGER NULL,
    `heightMm` INTEGER NULL,
    `fields` JSON NULL,
    `remark` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `HtmlTemplate_id_key`(`id`),
    UNIQUE INDEX `HtmlTemplate_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
