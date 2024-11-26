import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Get('author/:authorId')
  findByAuthorId(@Param('authorId') authorId: string) {
    return this.projectsService.findByAuthorId(+authorId);
  }

  @Get('collaborator/:collaboratorId')
  findByCollaboratorId(@Param('collaboratorId') collaboratorId: string) {
    return this.projectsService.findByCollaboratorId(+collaboratorId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }
}
