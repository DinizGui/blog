-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(220) NOT NULL,
    `slug` VARCHAR(220) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `category` VARCHAR(60) NOT NULL,
    `tags` JSON NOT NULL,
    `coverImage` VARCHAR(500) NOT NULL,
    `readTime` INTEGER NOT NULL DEFAULT 3,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `authorName` VARCHAR(120) NOT NULL DEFAULT 'Guilherme Diniz',
    `authorAvatar` VARCHAR(500) NOT NULL DEFAULT 'https://api.dicebear.com/9.x/notionists/svg?seed=devjunior&backgroundColor=b6e3f4',
    `authorBio` VARCHAR(500) NOT NULL DEFAULT 'Dev junior aprendendo todo dia, anotando o que aprendo aqui.',
    `publishedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Post_slug_key`(`slug`),
    INDEX `Post_category_idx`(`category`),
    INDEX `Post_publishedAt_idx`(`publishedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
