import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTemplateDto } from './dto/create-template-dto';
import { GetTemplateFilterDto } from './dto/get-template-filter.dto';
import { Template } from './template.entity';
import { TemplateRepository } from './template.repository';

@Injectable()
export class TemplateService {
    constructor(
        @InjectRepository(TemplateRepository)
        private templateRepository: TemplateRepository
    ) {}

    async getAllTemplates(filterDto: GetTemplateFilterDto): Promise<{ result: Template[]; count: number }> {
        return this.templateRepository.getTemplates(filterDto);
    }

    async getTemplateById(id: number): Promise<Template> {
        const template = await this.templateRepository.findOne(id);
        if (!template) throw new NotFoundException(`Template with id ${id} not found`);
        return template;
    }

    async createTemplate(createTemplateDto: CreateTemplateDto): Promise<Template> {
        return this.templateRepository.createTemplate(createTemplateDto);
    }

    async deleteTemplate(id: number): Promise<void> {
        const result = await this.templateRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Template with ID "${id}" not found`);
    }
}