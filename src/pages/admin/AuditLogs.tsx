import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAuditLogs } from '@/utils/auditLogger';
import { AuditLog } from '@/types/auditLog';
import { format } from 'date-fns';

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    setLogs(getAuditLogs());
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Audit Logs</h1>

      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Record ID</TableHead>
                  <TableHead>Changes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No audit logs yet
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-xs whitespace-nowrap">
                        {format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                      </TableCell>
                      <TableCell>{log.userName}</TableCell>
                      <TableCell className="font-mono text-xs">{log.userId}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          log.action === 'create' ? 'bg-green-100 text-green-800' :
                          log.action === 'update' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {log.action}
                        </span>
                      </TableCell>
                      <TableCell>{log.module}</TableCell>
                      <TableCell>{log.fieldUpdated || '-'}</TableCell>
                      <TableCell className="font-mono text-xs">{log.recordId}</TableCell>
                      <TableCell className="text-xs max-w-xs truncate">
                        {log.oldValue && <span className="text-red-600">Old: {log.oldValue}</span>}
                        {log.oldValue && log.newValue && <span className="mx-1">→</span>}
                        {log.newValue && <span className="text-green-600">New: {log.newValue}</span>}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
