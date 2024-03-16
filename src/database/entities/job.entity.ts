import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from './user.entity';
import { BidEntity } from './bid.entity';

@Entity({ name: 'jobs' })
export class JobEntity extends AbstractEntity {
    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    imageUrl: string

    @Column({ nullable: true })
    price: number

    @Column({ nullable: true })
    status: string

    @ManyToOne(() => UserEntity, (owner) => owner.jobs)
    @JoinColumn({ name: 'owner_id' })
    owner: UserEntity;

    @OneToMany(() => BidEntity, (bid) => bid.job,
        { cascade: true },
    )
    bids: BidEntity[];
}
