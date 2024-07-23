import { taskStatus } from '../task.model';

export class getTaskFilterDto {
  search?: string;
  status?: taskStatus;
}
