import { useState } from "react";
import { driverOrders, type DriverOrder } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Clock } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  accepted: "bg-primary/10 text-primary",
  picked_up: "bg-accent/10 text-accent",
  delivered: "bg-muted text-muted-foreground",
};

export default function DriverDashboard() {
  const [orders, setOrders] = useState<DriverOrder[]>(driverOrders);

  const updateStatus = (id: string, status: DriverOrder["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Truck className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Driver Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your assigned pickups</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-xl border bg-card p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-mono text-sm font-bold">{o.id}</p>
                <p className="font-medium">{o.customer}</p>
              </div>
              <Badge className={statusColors[o.status]}>{o.status.replace("_", " ")}</Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{o.address}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{o.pickupTime}</span>
            </div>
            <p className="text-sm">Laundry: <span className="font-medium">{o.laundry}</span></p>
            <div className="flex gap-2">
              {o.status === "pending" && (
                <>
                  <Button size="sm" onClick={() => updateStatus(o.id, "accepted")}>Accept</Button>
                  <Button size="sm" variant="outline" onClick={() => updateStatus(o.id, "delivered")}>Reject</Button>
                </>
              )}
              {o.status === "accepted" && (
                <Button size="sm" onClick={() => updateStatus(o.id, "picked_up")}>Mark Picked Up</Button>
              )}
              {o.status === "picked_up" && (
                <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={() => updateStatus(o.id, "delivered")}>Mark Delivered</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
