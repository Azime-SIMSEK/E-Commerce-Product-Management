import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }
  
  async createProduct(name: string, price: number, description: string): Promise<Product> {
    const newProduct = this.productRepository.create({ name, price, description });
    return this.productRepository.save(newProduct);
  }

  async updateProduct(id: number, name: string, price: number, description: string): Promise<Product | null> {
    await this.productRepository.update(id, { name, price, description });
  
    const updatedProduct = await this.getProductById(id);
    if (!updatedProduct) {
      throw new Error(`Product with ID ${id} not found after update`);
    }
    return updatedProduct;
  }
  

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
