-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_produto` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tipo_produto` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `valor_unitario` DECIMAL(65, 30) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_modificacao` DATETIME(3) NOT NULL,
    `estoque_minimo` INTEGER NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Produto_codigo_produto_key`(`codigo_produto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movimentacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produto_id` INTEGER NOT NULL,
    `tipo_movimentacao` ENUM('entrada', 'saida') NOT NULL,
    `quantidade_movimentada` INTEGER NOT NULL,
    `data_movimentacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `observacao` VARCHAR(191) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_modificacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estoque` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produto_id` INTEGER NOT NULL,
    `quantidade_total` INTEGER NOT NULL,
    `estoque_minimo` INTEGER NOT NULL,
    `data_modificacao` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Estoque_produto_id_key`(`produto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Movimentacao` ADD CONSTRAINT `Movimentacao_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estoque` ADD CONSTRAINT `Estoque_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
