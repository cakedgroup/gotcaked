import { Category } from '../models/category';
import * as categoryDAO from '../storage/category';


/**
 * 
 * @returns Promise with Categories
 */
export function getAllCategories(): Promise<Category[]> {
    return categoryDAO.getCategorys();
}

/**
 * Returns category by name
 * @param name Name of the category
 * @returns Promise with category
 */
export function getCategoryById(name: string): Promise<Category> {
    return categoryDAO.getCategory(name);
}

/**
 * Create new category
 * @param category Category to be created
 * @returns Promise with created category
 */
export function createCategory(category: Category): Promise<Category> {
    return categoryDAO.createCategory(category);
}

/**
 * Delete category
 * @param name Name of the category
 * @returns empty Promise
 */
export function deleteCategory(name: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        categoryDAO.getCategory(name).then(() => {
            categoryDAO.deleteCategory(name).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        });
    });
}

/**
 * Update category by name
 * @param name Name of the category
 * @param newCategory updated category
 * @returns Promise with updated category
 */
export function updateCategory(name: string, newCategory: Category): Promise<Category> {
    return categoryDAO.updateCategory(name, newCategory);
}