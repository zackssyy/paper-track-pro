import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getFailedTransactions, clearFailedTransactions } from '@/utils/auditLogger';
import { FailedTransaction } from '@/types/auditLog';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FailedTransactions() {
  const [transactions, setTransactions] = useState<FailedTransaction[]>([]);
  const { toast } = useToast();

  const loadTransactions = () => {
    setTransactions(getFailedTransactions());
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleClear = () => {
    clearFailedTransactions();
    setTransactions([]);
    toast({ title: 'Failed transactions cleared' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Failed Transactions</h1>
        {transactions.length > 0 && (
          <Button onClick={handleClear} variant="destructive" className="w-full sm:w-auto">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Error Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Error</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No failed transactions
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="text-xs whitespace-nowrap">
                        {format(new Date(transaction.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                      </TableCell>
                      <TableCell>{transaction.userName}</TableCell>
                      <TableCell className="font-mono text-xs">{transaction.userId}</TableCell>
                      <TableCell>{transaction.module}</TableCell>
                      <TableCell>{transaction.action}</TableCell>
                      <TableCell className="text-destructive font-medium">{transaction.error}</TableCell>
                      <TableCell className="text-xs max-w-xs truncate">{transaction.details || '-'}</TableCell>
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
