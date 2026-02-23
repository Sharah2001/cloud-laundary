import { orderStatuses } from "@/lib/mock-data";
import { CheckCircle, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const activeIndex = 3; // "washing" is current for demo

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("ORD-1001");

  return (
    <div className="container max-w-md mx-auto py-12 px-4 space-y-8">
      <h1 className="text-2xl font-bold text-center">Track Your Order</h1>

      <div className="flex gap-2">
        <Input placeholder="Enter Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        <Button>Track</Button>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground mb-1">Order</p>
        <p className="font-mono font-bold text-primary mb-6">{orderId}</p>

        <div className="relative pl-8 space-y-6">
          {orderStatuses.map((s, i) => {
            const done = i <= activeIndex;
            const current = i === activeIndex;
            return (
              <div key={s.key} className="relative">
                {/* Connector line */}
                {i < orderStatuses.length - 1 && (
                  <div className={`absolute left-[-20px] top-6 w-0.5 h-full ${i < activeIndex ? "bg-accent" : "bg-border"}`} />
                )}
                {/* Icon */}
                <div className="absolute left-[-28px] top-0.5">
                  {done ? (
                    <CheckCircle className={`h-5 w-5 ${current ? "text-primary" : "text-accent"}`} />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground/40" />
                  )}
                </div>
                <p className={`font-medium text-sm ${done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
                {s.date && <p className="text-xs text-muted-foreground">{s.date}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
