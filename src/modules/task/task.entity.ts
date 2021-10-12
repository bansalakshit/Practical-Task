import { Categories } from '../category/category.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { CreatedModified } from '../../utility/utility'
import { Task } from './interfaces/task.interfaces'
import { Users } from '../users/users.entity'

@Entity('tasks')
export class Tasks extends CreatedModified implements Task {
    @PrimaryColumn({ name: 'id' })
    id: string
  
    @Column('character varying', { name: 'name', nullable: true })
    name: string

    @ManyToOne(_ => Categories, category => category.tasks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    categoryId: string

    @ManyToOne(_ => Users, user => user.categories)
    @JoinColumn({ name: 'user_id' })
    userId: string
}