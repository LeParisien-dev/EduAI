import { Controller, Post, Body, Get, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

// Typage minimal de req.user
interface AuthenticatedRequest extends ExpressRequest {
  user: { id: string; email: string };
}

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateCourseDto, @Request() req: AuthenticatedRequest) {
    return this.coursesService.create(dto, req.user);
  }

  @Get('published')
  findPublished() {
    return this.coursesService.findPublished();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/publish')
  publish(@Param('id') id: string) {
    return this.coursesService.publish(id);
  }
}
