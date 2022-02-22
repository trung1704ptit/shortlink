import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-shortlink.dto';
import { GetTasksFilterDto } from './dto/get-shortlinks-filter.dto';
import { updateLinkStatusDto } from './dto/update-task-status.dto';
import { ShortLink } from './shortlink.entity';
import { TasksService } from './shortlinks.service';

@Controller('shortlinks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<ShortLink> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }

  // http://localhost:3000/tasks
  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<ShortLink[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  //   // http://localhost:3000/tasks/3g234dsds-23dsd-32xdsd-2322s
  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<ShortLink> {
    return this.tasksService.getTaskById(id, user);
  }

  @Patch('/:id/status')
  updateLinkStatus(
    @Param('id') id: string,
    @Body() updateLinkStatusDto: updateLinkStatusDto,
    @GetUser() user: User,
  ): Promise<ShortLink> {
    const { status } = updateLinkStatusDto;
    return this.tasksService.updateLinkStatus(id, status, user);
  }
}
