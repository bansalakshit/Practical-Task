import { Users } from '../users/users.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { CreatedModified } from '../../utility/utility'
import { Category } from './interfaces/category.interfaces'
import { Tasks } from '../task/task.entity'

@Entity('categories')
export class Categories extends CreatedModified implements Category {
    @PrimaryColumn({ name: 'id' })
    id: string
  
    @Column('character varying', { name: 'name', nullable: true })
    name: string

    @ManyToOne(_ => Users, user => user.categories)
    @JoinColumn({ name: 'user_id' })
    userId: string

    @OneToMany(_ => Tasks, task => task.categoryId)
    tasks: Tasks[]
}
