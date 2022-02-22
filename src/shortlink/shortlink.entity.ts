import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShortLinkStatus } from './shortlinks-status.enum';

@Entity()
export class ShortLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  originalLink: string;

  @Column()
  shortlink: string;

  @Column({ default: 0 })
  clicks: number;
  
  @Column({ default: new Date()})
  createdAt: Date;
  
  @Column({ nullable: true })
  updatedAt: Date;
  
  @Column({ nullable: true })
  expiredAt: Date;
  
  @Column()
  status: ShortLinkStatus;

  @ManyToOne((_type) => User, (user) => user.shortlinks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
