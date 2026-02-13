import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Ty}
@Module({

  imports: [
    TypeOrmModule.forFeature([User])
  ],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
