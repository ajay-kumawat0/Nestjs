import { IsEnum, IsOptional, IsString } from 'class-validator';
import { taskStatus } from '../task.model';

export class getTaskFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(taskStatus)
  status?: taskStatus;
}
