import { Decimal } from '@prisma/client/runtime/library';
import { IsString, IsInt, IsPositive, IsNumber, IsNotEmpty } from 'class-validator';


export class ProdutoCreateDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  codigo_produto!: string;

  @IsString()
  @IsNotEmpty()
  tipo_produto!: string;

  @IsString()
  descricao!: string;

  @IsInt()
  @IsPositive()
  quantidade!: number;

  @IsNumber()
  @IsPositive()
  valor_unitario!: Decimal;

  @IsInt()
  @IsPositive()
  estoque_minimo!: number;

  ativo?: boolean
}
