import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async findByNickname(nickname: string): Promise<User | null> {
    return this.findOne({ where: { nickname } });
  }

  async findWithFollowers(id: string): Promise<User | null> {
    return this.findOne({
      where: { id },
      relations: ['followers', 'followers.follower'],
    });
  }

  async findWithFollowing(id: string): Promise<User | null> {
    return this.findOne({
      where: { id },
      relations: ['following', 'following.following'],
    });
  }
}
