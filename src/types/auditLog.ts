export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'create' | 'update' | 'delete';
  module: string;
  recordId: string;
  fieldUpdated?: string;
  oldValue?: string;
  newValue?: string;
}

export interface FailedTransaction {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  module: string;
  action: string;
  error: string;
  details?: string;
}
