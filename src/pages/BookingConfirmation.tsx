import { Link, useLocation, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, CalendarDays, MapPin, Banknote } from "lucide-react";
import { format } from "date-fns";
import { laundries } from "@/lib/mock-data";

export default function BookingConfirmation() {
  const { state } = useLocation();
  if (!state?.bookingId) return <Navigate to="/book" replace />;

  const laundry = laundries.find((l) => l.id === state.laundryId);

  return (
    <div className="container max-w-md mx-auto py-16 px-4 text-center space-y-6">
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-accent" />
        </div>
      </div>

      <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
      <p className="text-muted-foreground">Your laundry pickup has been scheduled successfully.</p>

      <div className="rounded-xl border bg-card p-6 text-left space-y-4">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Booking ID</span>
          <span className="font-mono font-bold text-primary">{state.bookingId}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm text-muted-foreground flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> Pickup</span>
          <span className="text-sm text-right">
            {state.pickup?.date ? format(new Date(state.pickup.date), "PPP") : "N/A"}<br />
            <span className="text-muted-foreground">{state.pickup?.timeSlot}</span>
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Laundry</span>
          <span className="text-sm font-medium">{laundry?.name ?? "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Delivery</span>
          <span className="text-sm capitalize">{state.deliveryType}</span>
        </div>
        <div className="border-t pt-3 flex justify-between">
          <span className="text-sm text-muted-foreground flex items-center gap-1"><Banknote className="h-3.5 w-3.5" /> Total</span>
          <span className="font-bold text-lg text-primary">LKR {state.total}</span>
        </div>
      </div>

      <Link to="/track">
        <Button size="lg" className="w-full gap-2">Track Order</Button>
      </Link>
      <Link to="/">
        <Button variant="ghost" className="w-full">Back to Home</Button>
      </Link>
    </div>
  );
}
