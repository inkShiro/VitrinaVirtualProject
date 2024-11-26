import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import { ModuleService } from './module.service';

@Controller('/modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get('status/:moduleName')
  async getStatus(@Param('moduleName') moduleName: string) {
    return this.moduleService.getModuleStatus(moduleName);
  }

  @Patch('status/:moduleName')
  async updateStatus(
    @Param('moduleName') moduleName: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.moduleService.updateModuleStatus(moduleName, isActive);
  }
}
