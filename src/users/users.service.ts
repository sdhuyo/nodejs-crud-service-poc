import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

 async create(createUserDto: CreateUserDto) : Promise<User> {
    return new this.userModel(createUserDto).save();
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(name: string) {
    return this.userModel.findOne({name});
  }

  update(name: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({name},{$set:{...updateUserDto}});
  }

  remove(name: string) {
    return this.userModel.deleteOne({name});
  }
}
