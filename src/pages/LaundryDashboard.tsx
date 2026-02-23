import { useState } from "react";
import { laundryOrders, type LaundryOrder } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Droplets } from "lucide-react";

const statusColors: Record<string, string> = {
  incoming: "bg-amber-100 text-amber-700",
  accepted: "bg-primary/10 text-primary",
  washing: "bg-blue-100 text-blue-700",
  ready: "bg-accent/10 text-accent",
};

const nextStatus: Record<string, LaundryOrder["status"]> = {
  incoming: "accepted",
  accepted: "washing",
  washing: "ready",
};

export default function LaundryDashboard() {
  const [orders, setOrders] = useState<LaundryOrder[]>(laundryOrders);
  const [weights, setWeights] = useState<Record<string, string>>({});

  const advance = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = nextStatus[o.status];
        if (!next) return o;
        const actualWeight = next === "ready" && weights[id] ? parseFloat(weights[id]) : o.actualWeight;
        return { ...o, status: next, actualWeight };
      })
    );
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <Droplets className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Laundry Partner Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage incoming orders</p>
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
              <Badge className={statusColors[o.status]}>{o.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Est. Weight: <span className="font-medium text-foreground">{o.weight} kg</span>
              {o.actualWeight && <> • Actual: <span className="font-medium text-primary">{o.actualWeight} kg</span></>}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {o.services.map((s) => (
                <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
              ))}
            </div>

            {o.status === "washing" && (
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Actual weight (kg)"
                  value={weights[o.id] ?? ""}
                  onChange={(e) => setWeights((w) => ({ ...w, [o.id]: e.target.value }))}
                  className="w-40"
                />
              </div>
            )}

            {nextStatus[o.status] && (
              <Button size="sm" onClick={() => advance(o.id)}>
                {o.status === "incoming" && "Accept Order"}
                {o.status === "accepted" && "Start Washing"}
                {o.status === "washing" && "Mark Ready"}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
