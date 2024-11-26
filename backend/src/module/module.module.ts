import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { PrismaService } from '../prisma/prisma.service';
import { ModuleController } from './module.controller';

@Module({
  providers: [ModuleService, PrismaService],
  controllers: [ModuleController],
})
export class ModuleModule {}
