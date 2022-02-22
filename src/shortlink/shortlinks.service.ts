import { Injectable, NotFoundException } from '@nestjs/common';
import { ShortLinkStatus } from './shortlinks-status.enum';
import { CreateShortLinkDto } from './dto/create-shortlink.dto';
import { GetTasksFilterDto } from './dto/get-shortlinks-filter.dto';
import { ShortLinkRepository } from './shortlinks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortLink } from './shortlink.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ShortLinkService {
  constructor(
    @InjectRepository(ShortLinkRepository)
    private shortlinksRepository: ShortLinkRepository,
  ) {}

  createShortLink(createShortLinkDto: CreateShortLinkDto, user: User): Promise<ShortLink> {
    return this.shortlinksRepository.createShortLink(createShortLinkDto, user);
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const found = await this.shortlinksRepository.delete({ id, user });
    if (found.affected === 0) {
      throw new NotFoundException('Task with ID ${id} not found');
    }
  }

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<ShortLink[]> {
    return this.shortlinksRepository.getAllTasks(filterDto, user);
  }

  getTaskById(id: string, user: User): Promise<ShortLink> {
    return this.shortlinksRepository.getTaskById(id, user);
  }

  async updateLinkStatus(
    id: string,
    status: ShortLinkStatus,
    user: User,
  ): Promise<ShortLink> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.shortlinksRepository.save(task);
    return task;
  }
}
