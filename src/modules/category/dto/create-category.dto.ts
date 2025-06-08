import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'category title',
        example: 'new',
      })
      @IsString()
      title: string;
}
