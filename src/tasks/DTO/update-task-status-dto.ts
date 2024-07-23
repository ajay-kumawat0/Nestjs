import { IsEnum } from 'class-validator';
import { taskStatus } from '../task.model';

export class updateTaskStatusDto {
  @IsEnum(taskStatus)
  status: taskStatus;
}
