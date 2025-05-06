/*
  Warnings:

  - Added the required column `codigo_produto` to the `Movimentacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Movimentacao` ADD COLUMN `codigo_produto` VARCHAR(191) NOT NULL;
