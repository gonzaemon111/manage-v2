-- CreateTable
CREATE TABLE `Domain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `isCanceled` BOOLEAN NOT NULL DEFAULT false,
    `memo` LONGTEXT NULL,
    `nextUpdatedAt` VARCHAR(191) NULL,
    `provider` VARCHAR(191) NOT NULL,
    `accountName` VARCHAR(191) NOT NULL,

    INDEX `Domain_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
