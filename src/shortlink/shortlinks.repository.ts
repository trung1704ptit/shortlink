import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateShortLinkDto } from './dto/create-shortlink.dto';
import { GetTasksFilterDto } from './dto/get-shortlinks-filter.dto';
import { ShortLinkStatus } from './shortlinks-status.enum';
import { ShortLink } from './shortlink.entity';

const shortid = require('shortid');

@EntityRepository(ShortLink)
export class ShortLinkRepository extends Repository<ShortLink> {
  async createShortLink(createShortLinkDto: CreateShortLinkDto, user: User): Promise<ShortLink> {
    const { originalLink } = createShortLinkDto;
    console.log(shortid)
    const urlId = shortid.generate();
    console.log(urlId)
    const shortUrl = `https://techshare247.com/${urlId}`;
    const task = this.create({
      originalLink,
      shortlink: shortUrl,
      status: ShortLinkStatus.OPEN,
      createdAt: new Date(),
      user,
    });

    await this.save(task);
    return task;
  }

  async getTaskById(id: string, user: User): Promise<ShortLink> {
    const found = await this.findOne({ id, user });
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return found;
  }

  async getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<ShortLink[]> {
    const query = this.createQueryBuilder('task');
    query.where({ user });
    const { status, search } = filterDto;

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
