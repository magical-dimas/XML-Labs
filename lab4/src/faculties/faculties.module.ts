import { Module } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { FacultiesController } from './faculties.controller';
import { FileService } from 'src/file.service';
import { Faculty } from './entities/faculty.entity';

@Module({
  controllers: [FacultiesController],
  providers: [FacultiesService,
    {
      provide: FileService,
      useFactory: () => new FileService<Faculty[]>('assets/faculties.json'),
    },
  ],
})
export class FacultiesModule {}
