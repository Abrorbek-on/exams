import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/core/models/user.model/user.model';
import { UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfilesService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async update(user_id: string, payload: UpdateProfileDto, avatar, filename:any) {
        let obj = {...payload}
        if(avatar) {
            obj["avatar_url"] = avatar.filename 
        }
        let newProfile = await this.userModel.update({
            ...payload,
            avatar_url: avatar.filename
        }, {where: {
            user_id
        },
    returning: true})
        return {
            success: true,
            message: "updated profile",
            data: newProfile[1][0]
        }
    }

    async getProfile(user_id: string){
        let profile = await this.userModel.findOne({
            where: {user_id}
        })
        return {
            success: true,
            message: "rad profile",
            data: profile?.dataValues
        }
    }
}
