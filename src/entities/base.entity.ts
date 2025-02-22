import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AbstractBaseEntity {
  @ApiProperty()
  @PrimaryKey()
  id: string;

  @ApiProperty()
  @Property({ type: 'date' })
  created_at: Date;

  @ApiProperty()
  @Property({ type: 'date', onUpdate: () => new Date() })
  updated_at: Date;

  constructor() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
