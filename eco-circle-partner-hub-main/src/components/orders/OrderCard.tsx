
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, User } from 'lucide-react';

interface OrderProps {
  id: string;
  address: string;
  status: 'pending' | 'assigned' | 'picked' | 'completed' | 'cancelled';
  timestamp: string;
  partnerName?: string;
  onAssign?: (id: string) => void;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onUpdateStatus?: (id: string, status: string) => void;
  viewType: 'admin' | 'partner';
}

const OrderCard: React.FC<OrderProps> = ({
  id,
  address,
  status,
  timestamp,
  partnerName,
  onAssign,
  onAccept,
  onReject,
  onUpdateStatus,
  viewType
}) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    assigned: 'bg-blue-100 text-blue-800',
    picked: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  
  return (
    <Card className="eco-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">Order #{id}</CardTitle>
          <Badge className={statusColors[status]}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <span className="text-sm">{address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          {partnerName && viewType === 'admin' && (
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Assigned to: {partnerName}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {viewType === 'admin' && (
          <>
            {status === 'pending' && (
              <Button 
                className="w-full bg-eco-primary hover:bg-eco-dark text-sm h-8"
                onClick={() => onAssign && onAssign(id)}
              >
                Assign to Partner
              </Button>
            )}
            {(status === 'assigned' || status === 'picked') && (
              <div className="text-xs text-muted-foreground w-full text-center">
                Waiting for partner action
              </div>
            )}
          </>
        )}
        
        {viewType === 'partner' && (
          <div className="w-full">
            {status === 'assigned' && (
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-eco-primary hover:bg-eco-dark text-sm h-8"
                  onClick={() => onAccept && onAccept(id)}
                >
                  Accept
                </Button>
                <Button 
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-sm h-8"
                  onClick={() => onReject && onReject(id)}
                >
                  Reject
                </Button>
              </div>
            )}
            {status === 'picked' && (
              <Button 
                className="w-full bg-eco-primary hover:bg-eco-dark text-sm h-8"
                onClick={() => onUpdateStatus && onUpdateStatus(id, 'completed')}
              >
                Mark as Completed
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
