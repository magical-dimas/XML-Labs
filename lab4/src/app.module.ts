import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacultiesModule } from './faculties/faculties.module';

@Module({
  imports: [FacultiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
