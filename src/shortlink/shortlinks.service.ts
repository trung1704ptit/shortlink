import { Injectable, NotFoundException } from '@nestjs/common';
import { ShortLinkStatus } from './shortlinks-status.enum';
import { CreateTaskDto } from './dto/create-shortlink.dto';
import { GetTasksFilterDto } from './dto/get-shortlinks-filter.dto';
import { TasksRepository } from './shortlinks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortLink } from './shortlink.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<ShortLink> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const found = await this.tasksRepository.delete({ id, user });
    if (found.affected === 0) {
      throw new NotFoundException('Task with ID ${id} not found');
    }
  }

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<ShortLink[]> {
    return this.tasksRepository.getAllTasks(filterDto, user);
  }

  getTaskById(id: string, user: User): Promise<ShortLink> {
    return this.tasksRepository.getTaskById(id, user);
  }

  async updateLinkStatus(
    id: string,
    status: ShortLinkStatus,
    user: User,
  ): Promise<ShortLink> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
