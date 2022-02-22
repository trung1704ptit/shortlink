import { ShortLink } from 'src/shortlink/shortlink.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(_type => ShortLink, task => task.user, { eager: true })
  shortlinks: ShortLink[]
}
