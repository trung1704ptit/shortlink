import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShortLinkStatus } from './shortlinks-status.enum';

@Entity()
export class ShortLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: ShortLinkStatus;

  @ManyToOne((_type) => User, (user) => user.shortlinks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
