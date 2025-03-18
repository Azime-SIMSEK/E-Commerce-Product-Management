import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)  // 🔒 Sadece giriş yapan kullanıcılar ürün ekleyebilir
  async createProduct(@Body() body: { name: string; price: number; description: string }) {
    return this.productsService.createProduct(body.name, body.price, body.description);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)  // 🔒 Sadece giriş yapan kullanıcılar ürün güncelleyebilir
  async updateProduct(@Param('id') id: number, @Body() body: { name: string; price: number; description: string }) {
    return this.productsService.updateProduct(id, body.name, body.price, body.description);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)  // 🔒 Sadece giriş yapan kullanıcılar ürün silebilir
  async deleteProduct(@Param('id') id: number) {
    await this.productsService.deleteProduct(id);
    return { message: 'Product deleted successfully' };
  }
}
