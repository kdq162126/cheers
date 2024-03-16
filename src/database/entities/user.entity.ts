import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import {
  BidEntity,
  JobEntity,
} from '.';
import { UserSignatureEntity } from './user_signature.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  walletAddress: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  role: string;

  @OneToMany(
    () => JobEntity,
    (job) => job.owner,
    { cascade: true },
  )
  jobs: JobEntity[];

  @OneToMany(
    () => BidEntity,
    (bid) => bid.user,
    { cascade: true },
  )
  bids: BidEntity[];

  @OneToMany(() => UserSignatureEntity, (userSignature) => userSignature.user)
  userSignatures: UserSignatureEntity[];
}
