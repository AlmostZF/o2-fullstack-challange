/*
  Warnings:

  - You are about to drop the column `ultima_atualizacao` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade_movimentacao` on the `Movimentacao` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigo_produto]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data_modificacao` to the `Estoque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade_movimentada` to the `Movimentacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo_produto` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Estoque` DROP COLUMN `ultima_atualizacao`,
    ADD COLUMN `data_modificacao` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Movimentacao` DROP COLUMN `quantidade_movimentacao`,
    ADD COLUMN `quantidade_movimentada` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Produto` ADD COLUMN `codigo_produto` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Produto_codigo_produto_key` ON `Produto`(`codigo_produto`);
