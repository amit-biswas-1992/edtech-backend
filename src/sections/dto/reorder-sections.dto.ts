import { IsArray, IsInt, IsUUID, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SectionOrderItem {
  @ApiProperty({ example: 'uuid-of-section' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  order: number;
}

export class ReorderSectionsDto {
  @ApiProperty({ type: [SectionOrderItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionOrderItem)
  sections: SectionOrderItem[];
}
