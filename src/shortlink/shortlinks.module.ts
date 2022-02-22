import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './shortlinks.controller';
import { ShortLinkRepository } from './shortlinks.repository';
import { ShortLinkService } from './shortlinks.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShortLinkRepository]), AuthModule],
  controllers: [TasksController],
  providers: [ShortLinkService],
})
export class ShortLinkModule {}
