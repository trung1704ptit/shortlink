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
import { CreateShortLinkDto } from './dto/create-shortlink.dto';
import { GetTasksFilterDto } from './dto/get-shortlinks-filter.dto';
import { updateLinkStatusDto } from './dto/update-shortlinks-status.dto';
import { ShortLink } from './shortlink.entity';
import { ShortLinkService } from './shortlinks.service';

@Controller('shortlinks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private shortLinkService: ShortLinkService) {
    this.shortLinkService = shortLinkService;
  }

  @Post()
  createShortLink(
    @Body() createShortLinkDto: CreateShortLinkDto,
    @GetUser() user: User,
  ): Promise<ShortLink> {
    return this.shortLinkService.createShortLink(createShortLinkDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.shortLinkService.deleteTaskById(id, user);
  }

  // http://localhost:3000/shortlinks
  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<ShortLink[]> {
    return this.shortLinkService.getTasks(filterDto, user);
  }

  // http://localhost:3000/shortlinks/3g234dsds-23dsd-32xdsd-2322s
  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<ShortLink> {
    return this.shortLinkService.getTaskById(id, user);
  }

  @Patch('/:id/status')
  updateLinkStatus(
    @Param('id') id: string,
    @Body() updateLinkStatusDto: updateLinkStatusDto,
    @GetUser() user: User,
  ): Promise<ShortLink> {
    const { status } = updateLinkStatusDto;
    return this.shortLinkService.updateLinkStatus(id, status, user);
  }
}
