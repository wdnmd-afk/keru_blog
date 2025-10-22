-- AlterTable
ALTER TABLE `htmltemplate` ADD COLUMN `displayHeaderFooter` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `footerHeightMm` INTEGER NULL,
    ADD COLUMN `footerHtml` TEXT NULL,
    ADD COLUMN `headerHeightMm` INTEGER NULL,
    ADD COLUMN `headerHtml` TEXT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 123456,
    MODIFY `random` INTEGER NOT NULL DEFAULT 10;
