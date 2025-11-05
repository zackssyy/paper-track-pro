import { useState } from 'react';
import { User, USERS } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { logAudit } from '@/utils/auditLogger';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(USERS);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', role: 'user' as 'admin' | 'user', generatedId: '' });
  const { toast } = useToast();
  const { currentUser } = useAuth();

  const handleAdd = () => {
    if (!formData.name || !formData.generatedId) {
      toast({ title: 'Please fill all fields', variant: 'destructive' });
      return;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      ...formData,
    };
    setUsers([...users, newUser]);
    
    if (currentUser) {
      logAudit({
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'create',
        module: 'User Management',
        recordId: newUser.id,
        fieldUpdated: 'New User',
        newValue: newUser.name,
      });
    }
    
    toast({ title: 'User added successfully' });
    setFormData({ name: '', role: 'user', generatedId: '' });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    const user = users.find(u => u.id === id);
    setUsers(users.filter(u => u.id !== id));
    
    if (currentUser && user) {
      logAudit({
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'delete',
        module: 'User Management',
        recordId: id,
        fieldUpdated: 'User Deleted',
        oldValue: user.name,
      });
    }
    
    toast({ title: 'User deleted' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => setIsAdding(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label>Generated ID</Label>
                <Input
                  value={formData.generatedId}
                  onChange={(e) => setFormData({ ...formData, generatedId: e.target.value })}
                  placeholder="e.g., USR003"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={formData.role} onValueChange={(value: 'admin' | 'user') => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd}>Add User</Button>
              <Button onClick={() => setIsAdding(false)} variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Generated ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-mono text-sm">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="font-semibold">{user.generatedId}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => handleDelete(user.id)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
