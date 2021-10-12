import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class CreatedModified {
  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  modified!: Date
}
