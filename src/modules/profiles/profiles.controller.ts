import { Body, Controller, Get, Put, Req, UnsupportedMediaTypeException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {v4 as uuidv4} from "uuid"
import { extname } from 'path';
import { AuthGuard } from 'src/common/guards/jwt-auth.guards.ts';
import { Request } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('profile')
export class ProfilesController {
    constructor(private readonly profileService:  ProfilesService) {}

    @ApiBearerAuth()
    @ApiOperation({summary: "profile_id qoshish"})
    @ApiConsumes("multipart/form-data")
    @ApiResponse({status: 201, description: "success"})
    @ApiResponse({status: 404, description: "success"})
    @UseGuards(AuthGuard)
    @Put()
    @UseGuards(AuthGuard)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const uniqueName = uuidv4() + extname(file.originalname);
          cb(null, uniqueName);
        }
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(
            new UnsupportedMediaTypeException('Faqat .jpeg, .jpg, .png ruxsat etiladi'),
            false
          );
        }
        cb(null, true);
      }
    }))
    async update(
      @Req() req: Request,
      @Body() payload: UpdateProfileDto,
      @UploadedFile() avatar: Express.Multer.File,
    ) {
      return this.profileService.update(req['user'].id, payload, avatar, avatar?.filename);
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    getProfile(@Req() req: Request) {
        return this.profileService.getProfile(req["user"].id)
    }
}
