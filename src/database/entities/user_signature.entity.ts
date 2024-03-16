import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { Exclude } from 'class-transformer';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_signatures' })
export class UserSignatureEntity extends AbstractEntity {
  @Column()
  userId: number;

  @Column({ nullable: true })
  nonce: string;

  @Column('text')
  message: string;

  @Column()
  signature: string;

  @Column({ nullable: true })
  expirationTime: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.userSignatures)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
