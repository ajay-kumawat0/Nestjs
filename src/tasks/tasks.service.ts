import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, taskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './DTO/create-task.dto';
import { getTaskFilterDto } from './DTO/filter-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilter(filterDto: getTaskFilterDto): Task[] {
    const { search, status } = filterDto;

    let tasks = this.getAllTasks();
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const taskData = this.tasks.find((task) => task.id === id);
    if (!taskData) {
      throw new NotFoundException(`Task with id ${id} not available`);
    }

    return taskData;
  }

  createTask(createTaskDto: createTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: taskStatus.IN_PROGRESS,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const taskId = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== taskId.id);
  }

  updateTask(id: string, status: taskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
