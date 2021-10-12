import { Categories } from '../category/category.entity'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { CreatedModified } from '../../utility/utility'
import { User } from './interfaces/user.interfaces'
import { Tasks } from '../task/task.entity'

@Entity('users')
export class Users extends CreatedModified implements User {
  @PrimaryColumn({ name: 'id' })
  id: string

  @Column('character varying', { name: 'email' })
  email: string

  @Column('character varying', { name: 'display_name', nullable: true })
  displayName: string

  @Column('character varying', { name: 'password_digest', nullable: true })
  passwordDigest: string

  @Column('boolean', { name: 'deleted', default: false })
  deleted: boolean

  @OneToMany(_ => Categories, categories => categories.userId)
  categories: Categories[]

  @OneToMany(_ => Tasks, tasks => tasks.userId)
  tasks: Tasks[]
}
