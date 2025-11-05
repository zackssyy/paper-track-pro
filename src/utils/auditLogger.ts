import { AuditLog, FailedTransaction } from '@/types/auditLog';

const AUDIT_LOG_KEY = 'audit_logs';
const FAILED_TRANSACTIONS_KEY = 'failed_transactions';

export function logAudit(log: Omit<AuditLog, 'id' | 'timestamp'>) {
  const logs = getAuditLogs();
  const newLog: AuditLog = {
    ...log,
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };
  logs.unshift(newLog);
  localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(logs.slice(0, 1000))); // Keep last 1000
}

export function getAuditLogs(): AuditLog[] {
  const logs = localStorage.getItem(AUDIT_LOG_KEY);
  return logs ? JSON.parse(logs) : [];
}

export function logFailedTransaction(transaction: Omit<FailedTransaction, 'id' | 'timestamp'>) {
  const transactions = getFailedTransactions();
  const newTransaction: FailedTransaction = {
    ...transaction,
    id: `failed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };
  transactions.unshift(newTransaction);
  localStorage.setItem(FAILED_TRANSACTIONS_KEY, JSON.stringify(transactions.slice(0, 500)));
}

export function getFailedTransactions(): FailedTransaction[] {
  const transactions = localStorage.getItem(FAILED_TRANSACTIONS_KEY);
  return transactions ? JSON.parse(transactions) : [];
}

export function clearFailedTransactions() {
  localStorage.setItem(FAILED_TRANSACTIONS_KEY, JSON.stringify([]));
}
