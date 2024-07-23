import { IsNotEmpty } from 'class-validator';

export class createTaskDto {
  @IsNotEmpty()
  title: string;

  description: string;
}
