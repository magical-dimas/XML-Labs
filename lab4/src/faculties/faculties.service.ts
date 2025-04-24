import { Injectable } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { Faculty } from './entities/faculty.entity';
import { FileService } from 'src/file.service';

@Injectable()
export class FacultiesService {
  constructor(private fileService: FileService<Faculty[]>) {}
  create(createFacultyDto: CreateFacultyDto) {
    const faculties = this.fileService.read();
    const faculty = { ...createFacultyDto, id: faculties.length + 1 };
    this.fileService.add(faculty);
    return faculty;
  }

  findAll(title?: string): Faculty[] {
    const faculties = this.fileService.read();

    return title
      ? faculties.filter((faculty) =>
          faculty.title.toLowerCase().includes(title.toLowerCase()),
        )
      : faculties;
  }

  findOne(id: number) {
    const faculties = this.fileService.read();

    return faculties.find((faculty) => faculty.id === id) ?? null;
  }

  update(id: number, updateFacultyDto: UpdateFacultyDto) {
    const faculties = this.fileService.read();

    const updatedFaculties = faculties.map((stock) =>
      stock.id === id ? { ...stock, ...updateFacultyDto } : stock,
    );

    this.fileService.write(updatedFaculties);
  }

  remove(id: number) {
    const filteredFaculties = this.fileService
      .read()
      .filter((faculty) => faculty.id !== id);

    this.fileService.write(filteredFaculties);
  }
}
