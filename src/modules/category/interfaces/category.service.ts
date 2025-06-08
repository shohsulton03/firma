import { ResData } from "../../../common/lib/resData";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { Category } from "../entities/category.entity";

export interface ICategoryService {
  create(
    dto: CreateCategoryDto,
  ): Promise<ResData<Category>>;
  findAll(query: { title?: string; limit?: number; page?: number }): Promise<
      ResData<{
        items: Category[];
        meta: {
          totalItems: number;
          currentPage: number;
          totalPages: number;
          perPage: number;
        };
      }>
    >;
  findOneById(id: string): Promise<ResData<Category>>;
  update(
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<ResData<Category>>;
  delete(id: string): Promise<ResData<Category>>;
}