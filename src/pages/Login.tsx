import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { login, skipLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    if (login(userId, password)) {
      toast({ title: 'Login successful' });
      navigate('/');
    } else {
      toast({ title: 'Invalid credentials', variant: 'destructive' });
    }
  };

  const handleSkipAdmin = () => {
    skipLogin('admin');
    toast({ title: 'Logged in as Admin' });
    navigate('/admin');
  };

  const handleSkipUser = () => {
    skipLogin('user');
    toast({ title: 'Logged in as User' });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Inventory Management System</CardTitle>
          <CardDescription className="text-center text-subtitle">
            Examination Paper Sales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              placeholder="Enter your User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password (Optional)</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or skip login</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleSkipUser} variant="outline" className="w-full">
              Continue as User
            </Button>
            <Button onClick={handleSkipAdmin} variant="secondary" className="w-full">
              Continue as Admin
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Sample IDs: ADM001 (Admin), USR001, USR002 (Users)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
