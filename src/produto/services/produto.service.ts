import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  DeleteResult,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  Repository,
} from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByTitulo(titulo: string): Promise<Produto[]> {
    const produto = await this.produtoRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByPreco(preco: number): Promise<Produto[]> {
    const produto = await this.produtoRepository.find({
      where: {
        preco: LessThanOrEqual(preco),
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByAno(ano: number): Promise<Produto[]> {
    const produto = await this.produtoRepository.find({
      where: {
        anoLancamento: LessThanOrEqual(ano),
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

    return produto;
  }

  async createProduto(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
  }

  async updateProduto(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    return await this.produtoRepository.save(produto);
  }

  async deleteProduto(id: number): Promise<DeleteResult> {
    const produto = await this.findById(id);

    if (!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

    return await this.produtoRepository.delete(id);
  }
}
