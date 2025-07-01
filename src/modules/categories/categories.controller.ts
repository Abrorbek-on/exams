import {
    Body, Controller, Get, Param, Post, Put, Delete
  } from '@nestjs/common';
  import { CategoriesService } from './categories.service';
  import { CategoryDto } from './dto/category.dto';
  import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  
  @ApiBearerAuth()
  @ApiTags('Categories')
  @Controller('categories')
  export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create new category' })
    createCategory(@Body() payload: CategoryDto) {
      return this.categoryService.createCategory(payload);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    getAllCategories() {
      return this.categoryService.getAllCategories();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get single category by ID' })
    getCategory(@Param('id') id: string) {
      return this.categoryService.getCategoryById(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update category by ID' })
    updateCategory(@Param('id') id: string, @Body() payload: CategoryDto) {
      return this.categoryService.updateCategory(id, payload);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete category by ID' })
    deleteCategory(@Param('id') id: string) {
      return this.categoryService.deleteCategory(id);
    }
  }
  