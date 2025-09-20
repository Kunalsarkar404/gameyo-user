import React, { useState } from 'react';
import { Plus, Minus, CreditCard, Smartphone, Building, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

export function WalletScreen() {
  const [activeAction, setActiveAction] = useState<'deposit' | 'withdraw' | null>(null);
  const [amount, setAmount] = useState('');

  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 500,
      description: 'Tournament Win - BGMI Solo',
      date: '2024-01-15T14:30:00',
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      amount: 50,
      description: 'Tournament Entry - Free Fire',
      date: '2024-01-15T12:00:00',
      status: 'completed'
    },
    {
      id: 3,
      type: 'credit',
      amount: 1000,
      description: 'Wallet Deposit via UPI',
      date: '2024-01-14T18:45:00',
      status: 'completed'
    },
    {
      id: 4,
      type: 'debit',
      amount: 200,
      description: 'Withdrawal to Bank',
      date: '2024-01-13T16:20:00',
      status: 'pending'
    },
    {
      id: 5,
      type: 'debit',
      amount: 75,
      description: 'Tournament Entry - COD Mobile',
      date: '2024-01-13T10:15:00',
      status: 'failed'
    }
  ];

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'failed':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const handleDeposit = () => {
    // Handle deposit logic
    setActiveAction(null);
    setAmount('');
  };

  const handleWithdraw = () => {
    // Handle withdraw logic
    setActiveAction(null);
    setAmount('');
  };

  if (activeAction === 'deposit') {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={() => setActiveAction(null)}>
              <ArrowDownLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Add Money</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Amount Input */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Enter Amount</CardTitle>
              <CardDescription>Add money to your wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-2xl text-center"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                  >
                    ₹{quickAmount}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <Smartphone size={20} className="text-primary" />
                <div className="text-left">
                  <p className="font-medium">UPI</p>
                  <p className="text-xs text-muted-foreground">Pay with any UPI app</p>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <CreditCard size={20} className="text-primary" />
                <div className="text-left">
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-xs text-muted-foreground">Visa, Mastercard, etc.</p>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <Building size={20} className="text-primary" />
                <div className="text-left">
                  <p className="font-medium">Net Banking</p>
                  <p className="text-xs text-muted-foreground">All major banks supported</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Button
            onClick={handleDeposit}
            disabled={!amount || parseInt(amount) <= 0}
            className="w-full bg-primary text-primary-foreground"
          >
            Pay ₹{amount || '0'}
          </Button>
        </div>
      </div>
    );
  }

  if (activeAction === 'withdraw') {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={() => setActiveAction(null)}>
              <ArrowDownLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Withdraw Money</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Available Balance */}
          <Card className="glass-card bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold">₹1,247</p>
            </CardContent>
          </Card>

          {/* Amount Input */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Withdrawal Amount</CardTitle>
              <CardDescription>Enter amount to withdraw</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount (₹)</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-2xl text-center"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {[100, 500, 1000].map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                  >
                    ₹{quickAmount}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Withdrawal Method */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Withdrawal Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <Smartphone size={20} className="text-primary" />
                <div className="text-left">
                  <p className="font-medium">UPI</p>
                  <p className="text-xs text-muted-foreground">john@paytm</p>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <Building size={20} className="text-primary" />
                <div className="text-left">
                  <p className="font-medium">Bank Account</p>
                  <p className="text-xs text-muted-foreground">HDFC Bank ****1234</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* KYC Warning */}
          <Card className="glass-card border-yellow-500/20 bg-yellow-500/5">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-600">
                ⚠️ Complete KYC verification to withdraw amounts above ₹10,000
              </p>
            </CardContent>
          </Card>

          <Button
            onClick={handleWithdraw}
            disabled={!amount || parseInt(amount) <= 0}
            className="w-full bg-primary text-primary-foreground"
          >
            Withdraw ₹{amount || '0'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <h1 className="text-2xl font-bold mb-4">Wallet</h1>

        {/* Balance Card */}
        <Card className="glass-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <p className="text-4xl font-bold">₹1,247</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setActiveAction('deposit')}
                className="flex-1 bg-primary text-primary-foreground"
              >
                <Plus size={16} className="mr-2" />
                Add Money
              </Button>
              <Button 
                onClick={() => setActiveAction('withdraw')}
                variant="outline" 
                className="flex-1"
              >
                <Minus size={16} className="mr-2" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4">
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-3">
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' 
                            ? 'bg-green-500/10' 
                            : 'bg-red-500/10'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeft size={18} className="text-green-500" />
                          ) : (
                            <ArrowUpRight size={18} className="text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">
                              {formatDate(transaction.date)}
                            </p>
                            {getStatusIcon(transaction.status)}
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                transaction.status === 'completed' ? 'text-green-600 border-green-600/20' :
                                transaction.status === 'pending' ? 'text-yellow-600 border-yellow-600/20' :
                                'text-red-600 border-red-600/20'
                              }`}
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-green-500">₹2,450</p>
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-red-500">₹1,203</p>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Tournament Winnings</span>
                  <span className="font-bold text-green-500">+₹850</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Entry Fees</span>
                  <span className="font-bold text-red-500">-₹425</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Deposits</span>
                  <span className="font-bold text-blue-500">+₹1,000</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between items-center font-bold">
                  <span>Net Gain</span>
                  <span className="text-green-500">+₹1,425</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}