import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/core/models/category.model/category.model';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async createCategory(payload: Required<CategoryDto>) {
    const newCategory = await this.categoryModel.create(payload);
    return {
      success: true,
      message: 'New Category created',
      data: newCategory,
    };
  }

  async getAllCategories() {
    const categories = await this.categoryModel.findAll();
    return {
      success: true,
      data: categories,
    };
  }

  async getCategoryById(id: string) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) throw new NotFoundException('Category not found');
    return {
      success: true,
      data: category,
    };
  }

  async updateCategory(id: string, payload: Partial<CategoryDto>) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) throw new NotFoundException('Category not found');

    await category.update(payload);
    return {
      success: true,
      message: 'Category updated',
      data: category,
    };
  }

  async deleteCategory(id: string) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) throw new NotFoundException('Category not found');

    await category.destroy();
    return {
      success: true,
      message: 'Category deleted successfully',
    };
  }
}
