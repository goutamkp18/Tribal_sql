import { apiFetch, ApiResponse } from './api';
import { TableSchema } from '../types';
import { mockTables, mockDatabaseRelationships, DatabaseRelationship } from '../data/mockDatabase';

export async function getDatabaseSchema(): Promise<ApiResponse<TableSchema[]>> {
  return apiFetch<TableSchema[]>(
    '/database/schema',
    {
      method: 'GET',
    },
    async () => {
      return mockTables;
    }
  );
}

export async function getTableDetails(tableName: string): Promise<ApiResponse<TableSchema | undefined>> {
  return apiFetch<TableSchema | undefined>(
    `/database/table/${tableName}`,
    {
      method: 'GET',
    },
    async () => {
      return mockTables.find(t => t.name.toLowerCase() === tableName.toLowerCase());
    }
  );
}

export async function getDatabaseRelationships(): Promise<ApiResponse<DatabaseRelationship[]>> {
  return apiFetch<DatabaseRelationship[]>(
    '/database/relationships',
    {
      method: 'GET',
    },
    async () => {
      return mockDatabaseRelationships;
    }
  );
}

