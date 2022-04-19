import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';
import { TemplateService } from './template.service';
import { GetTemplateFilterDto } from './dto/get-template-filter.dto';
import { Template } from './template.entity';
import { CreateTemplateDto } from './dto/create-template-dto';

@Controller('template')
@UseInterceptors(ResponseInterceptor)
@UseGuards(AuthGuard())
export class TemplateController {
    constructor(private templateService: TemplateService) {}

    @Get()
    getAllTemplates(@Query(ValidationPipe) filterDto: GetTemplateFilterDto) {
        return this.templateService.getAllTemplates(filterDto);
    }

    @Get('/:id')
    getTemplatesById(@Param('id', ParseIntPipe) id: number): Promise<Template> {
        return this.templateService.getTemplateById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTemplates(@Body() createTemplatesDto: CreateTemplateDto): Promise<Template> {
        return this.templateService.createTemplate(createTemplatesDto);
    }

    @Delete('/:id')
    deleteTemplate(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.templateService.deleteTemplate(id);
    }
}
