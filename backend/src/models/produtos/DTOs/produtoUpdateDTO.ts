import { IsString, IsInt, IsPositive, IsNumber, IsNotEmpty } from 'class-validator';


export class ProdutoUpdateDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  descricao!: string;

  @IsInt()
  @IsPositive()
  quantidade!: number;

  @IsNumber()
  @IsPositive()
  valor_unitario!: number;

  @IsInt()
  @IsPositive()
  estoque_minimo!: number;

  ativo?: boolean
}
