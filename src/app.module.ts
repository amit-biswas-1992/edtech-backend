import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { SitesModule } from './sites/sites.module.js';
import { SectionsModule } from './sections/sections.module.js';
import { TemplatesModule } from './templates/templates.module.js';
import { UserEntity } from './entities/user.entity.js';
import { TemplateEntity } from './entities/template.entity.js';
import { SiteEntity } from './entities/site.entity.js';
import { SiteSectionEntity } from './entities/site-section.entity.js';
import { TeacherEntity } from './entities/teacher.entity.js';
import { CourseEntity } from './entities/course.entity.js';
import { PromoEntity } from './entities/promo.entity.js';
import { TeachersModule } from './teachers/teachers.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { PromosModule } from './promos/promos.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        if (databaseUrl) {
          return {
            type: 'postgres' as const,
            url: databaseUrl,
            entities: [UserEntity, TemplateEntity, SiteEntity, SiteSectionEntity, TeacherEntity, CourseEntity, PromoEntity],
            synchronize: true,
            ssl: { rejectUnauthorized: false },
          };
        }
        const host = configService.get<string>('DB_HOST', 'localhost');
        return {
          type: 'postgres' as const,
          host,
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME', 'postgres'),
          password: configService.get<string>('DB_PASSWORD', 'postgres'),
          database: configService.get<string>('DB_NAME', 'edtech-builder'),
          entities: [UserEntity, TemplateEntity, SiteEntity, SiteSectionEntity, TeacherEntity, CourseEntity, PromoEntity],
          synchronize: true,
          ssl: host !== 'localhost' ? { rejectUnauthorized: false } : false,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    SitesModule,
    SectionsModule,
    TemplatesModule,
    TeachersModule,
    CoursesModule,
    PromosModule,
  ],
})
export class AppModule {}
