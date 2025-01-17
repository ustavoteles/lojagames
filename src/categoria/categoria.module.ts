import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { CategoriaService } from './services/categoria.service';
import { categoriaController } from './controllers/categoria.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [categoriaController],
  providers: [CategoriaService],
  exports: [TypeOrmModule, CategoriaService],
})
export class CategoriaModule {}
