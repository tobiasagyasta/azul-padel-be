import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool, QueryResult, QueryResultRow } from 'pg';
import { createDatabasePool } from './database.connection';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private pool?: Pool;

  async query<T extends QueryResultRow>(
    text: string,
    params?: unknown[],
  ): Promise<QueryResult<T>> {
    return this.getPool().query<T>(text, params);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
    }
  }

  private getPool(): Pool {
    if (!this.pool) {
      this.pool = createDatabasePool();
    }

    return this.pool;
  }
}
