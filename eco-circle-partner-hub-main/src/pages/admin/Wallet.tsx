
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Wallet = () => {
  const { toast } = useToast();
  
  // Mock transaction data
  const transactions = [
    {
      id: 'TXN001',
      date: '2023-06-15',
      amount: 5000,
      type: 'credit',
      description: 'Funds added to wallet',
      status: 'completed'
    },
    {
      id: 'TXN002',
      date: '2023-06-16',
      amount: 1200,
      type: 'debit',
      description: 'Transfer to Rajiv Kumar',
      status: 'completed'
    },
    {
      id: 'TXN003',
      date: '2023-06-17',
      amount: 800,
      type: 'debit',
      description: 'Transfer to Priya Sharma',
      status: 'completed'
    },
    {
      id: 'TXN004',
      date: '2023-06-18',
      amount: 3000,
      type: 'credit',
      description: 'Funds added to wallet',
      status: 'completed'
    },
    {
      id: 'TXN005',
      date: '2023-06-19',
      amount: 1500,
      type: 'debit',
      description: 'Transfer to Aditya Singh',
      status: 'pending'
    }
  ];
  
  const creditTransactions = transactions.filter(t => t.type === 'credit');
  const debitTransactions = transactions.filter(t => t.type === 'debit');
  const pendingTransactions = transactions.filter(t => t.status === 'pending');
  
  const handleAddFunds = () => {
    toast({
      title: "Add Funds",
      description: "Redirecting to payment gateway...",
    });
    // In a real app, integrate with Razorpay here
  };
  
  const handleTransferFunds = () => {
    toast({
      title: "Transfer Funds",
      description: "Please select a partner to transfer funds.",
    });
    // In a real app, show a modal to select partner and amount
  };
  
  const walletBalance = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'credit' && transaction.status === 'completed') {
      return acc + transaction.amount;
    } else if (transaction.type === 'debit' && transaction.status === 'completed') {
      return acc - transaction.amount;
    }
    return acc;
  }, 0);
  
  const renderTransactionTable = (transactionsList: typeof transactions) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">ID</th>
            <th className="text-left py-3 px-4">Date</th>
            <th className="text-left py-3 px-4">Description</th>
            <th className="text-right py-3 px-4">Amount</th>
            <th className="text-center py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactionsList.map(transaction => (
            <tr key={transaction.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-4">{transaction.id}</td>
              <td className="py-3 px-4">{transaction.date}</td>
              <td className="py-3 px-4">{transaction.description}</td>
              <td className={`py-3 px-4 text-right ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
              </td>
              <td className="py-3 px-4 text-center">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  transaction.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {transactionsList.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No transactions found
        </div>
      )}
    </div>
  );
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Wallet Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="eco-card bg-gradient-to-br from-eco-primary to-eco-dark text-white col-span-1 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{walletBalance.toLocaleString()}</div>
              <div className="text-sm opacity-80 mt-1">Available funds for operations</div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  className="bg-white/20 hover:bg-white/30 border-white/50 text-white"
                  onClick={handleAddFunds}
                >
                  Add Funds
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/20 hover:bg-white/30 border-white/50 text-white"
                  onClick={handleTransferFunds}
                >
                  Transfer to Partner
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="eco-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Total Added</div>
                <div className="text-xl font-bold text-green-600">
                  +₹{creditTransactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Transferred</div>
                <div className="text-xl font-bold text-red-600">
                  -₹{debitTransactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Pending Transfers</div>
                <div className="text-xl font-bold text-amber-600">
                  ₹{pendingTransactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="eco-card">
          <CardHeader className="pb-0">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="credits">Credits</TabsTrigger>
                <TabsTrigger value="debits">Debits</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="all" className="mt-0">
              {renderTransactionTable(transactions)}
            </TabsContent>
            <TabsContent value="credits" className="mt-0">
              {renderTransactionTable(creditTransactions)}
            </TabsContent>
            <TabsContent value="debits" className="mt-0">
              {renderTransactionTable(debitTransactions)}
            </TabsContent>
            <TabsContent value="pending" className="mt-0">
              {renderTransactionTable(pendingTransactions)}
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Wallet;
