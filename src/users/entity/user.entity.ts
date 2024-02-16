import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
    @PrimaryColumn({ length: 60 })
    email: string;

    @Column({ length: 255 })
    password: string;

    @Column({ length: 15 })
    name: string;

    @Column({ length: 15 })
    nickname: string;

    @Column({ type: 'date'})
    birthday: Date;

    @Column({ length: 20 })
    address: string;
}