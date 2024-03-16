import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from './user.entity';
import { JobEntity } from './job.entity';

@Entity({ name: 'bids' })
export class BidEntity extends AbstractEntity {
    @Column({ nullable: true })
    status: string

    @Column({ nullable: true })
    proposal: string

    @ManyToOne(() => UserEntity, (user) => user.bids)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => JobEntity, (job) => job.bids)
    @JoinColumn({ name: 'job_id' })
    job: JobEntity;
}
