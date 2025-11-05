import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity, AlertCircle, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAuditLogs, getFailedTransactions } from '@/utils/auditLogger';
import { USERS } from '@/contexts/AuthContext';

export default function AdminDashboard() {
  const auditLogs = getAuditLogs();
  const failedTransactions = getFailedTransactions();

  const stats = [
    {
      title: 'Total Users',
      value: USERS.length,
      icon: Users,
      link: '/admin/users',
      color: 'text-primary',
    },
    {
      title: 'Audit Logs',
      value: auditLogs.length,
      icon: Activity,
      link: '/admin/audit-logs',
      color: 'text-blue-600',
    },
    {
      title: 'Failed Transactions',
      value: failedTransactions.length,
      icon: AlertCircle,
      link: '/admin/failed-transactions',
      color: 'text-destructive',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.title} to={stat.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/admin/users">
              <div className="p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                <h3 className="font-semibold">User Management</h3>
                <p className="text-sm text-muted-foreground">Add, edit, or remove users</p>
              </div>
            </Link>
            <Link to="/admin/audit-logs">
              <div className="p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                <h3 className="font-semibold">Audit Logs</h3>
                <p className="text-sm text-muted-foreground">View all system activities</p>
              </div>
            </Link>
            <Link to="/admin/failed-transactions">
              <div className="p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                <h3 className="font-semibold">Failed Transactions</h3>
                <p className="text-sm text-muted-foreground">Monitor errors and failures</p>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {auditLogs.slice(0, 5).length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            ) : (
              <div className="space-y-3">
                {auditLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-start gap-3 text-sm">
                    <Activity className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate">
                        <span className="font-medium">{log.userName}</span> {log.action}d in{' '}
                        <span className="font-medium">{log.module}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
