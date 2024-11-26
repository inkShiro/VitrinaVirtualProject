import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModuleService {
  constructor(private readonly prisma: PrismaService) {}

  async getModuleStatus(moduleName: string) {
    return await this.prisma.moduleStatus.findUnique({
      where: { moduleName },
    });
  }

  async updateModuleStatus(moduleName: string, isActive: boolean) {
    return await this.prisma.moduleStatus.update({
      where: { moduleName },
      data: { isActive },
    });
  }
}
