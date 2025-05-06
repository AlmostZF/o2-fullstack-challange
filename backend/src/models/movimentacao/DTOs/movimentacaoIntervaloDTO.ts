import { IsNotEmpty, IsString } from "class-validator";

export class MovimentacaoIntervaloDto {
    @IsString()
    @IsNotEmpty()
    dataInicio!: string;
    
    @IsString()
    @IsNotEmpty()
    dataFim!: string;
}