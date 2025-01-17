import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../entities/categoria.entity';

@Controller('/categorias')
export class categoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }

  @Get('nomeCategoria/:nomeCategoria')
  @HttpCode(HttpStatus.OK)
  findByCategoria(
    @Param('nomeCategoria') categoria: string,
  ): Promise<Categoria[]> {
    return this.categoriaService.findByCategoria(categoria);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCategoria(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.createCategoria(categoria);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  updateCategoria(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.updateCategoria(categoria);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCategoria(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.deleteCategoria(id);
  }
}
