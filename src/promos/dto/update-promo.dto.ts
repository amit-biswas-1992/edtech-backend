import { PartialType } from '@nestjs/swagger';
import { CreatePromoDto } from './create-promo.dto.js';

export class UpdatePromoDto extends PartialType(CreatePromoDto) {}
