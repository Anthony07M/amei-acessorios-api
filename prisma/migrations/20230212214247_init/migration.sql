-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NULL DEFAULT 'USER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sales` (
    `id` VARCHAR(191) NOT NULL,
    `addressId` VARCHAR(191) NOT NULL,
    `status` ENUM('SUCCESS', 'DANGER', 'INROUT', 'WARNING') NOT NULL DEFAULT 'WARNING',
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `quantity` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `salesId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_salesId_fkey` FOREIGN KEY (`salesId`) REFERENCES `Sales`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
