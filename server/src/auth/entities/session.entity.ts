import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

import { ISession } from 'connect-typeorm';

@Entity({ name: 'sessions ' })
export class Session implements ISession {
  @Index()
  @Column('bigint')
  public expiredAt = Date.now();

  @PrimaryColumn('varchar', { length: 255 })
  public id = '';

  @Column('text')
  public json = '';
}
