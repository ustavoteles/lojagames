import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: {
        produto: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    let categoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
      relations: {
        produto: true,
      },
    });
    if (!categoria)
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);

    return categoria;
  }

  async findByCategoria(categoria: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: {
        nomeCategoria: ILike(`%${categoria}%`),
      },
      relations: {
        produto: true,
      },
    });
  }

  async createCategoria(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async updateCategoria(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);

    return await this.categoriaRepository.save(categoria);
  }

  async deleteCategoria(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.categoriaRepository.delete(id);
  }
}
