import { Category } from '../models/category';
import * as categoryDAO from '../storage/category';

export function getAllCategories(): Promise<Category[]> {
    return categoryDAO.getCategorys();
}

export function getCategoryById(name: string): Promise<Category> {
    return categoryDAO.getCategory(name);
}

export function createCategory(category: Category): Promise<Category> {
    return categoryDAO.createCategory(category);
}

export function deleteCategory(name: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        categoryDAO.getCategory(name).then( () => {
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

export function updateCategory(name: string, newCategory: Category): Promise<Category> {
    return categoryDAO.updateCategory(name, newCategory);
}