import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Truck, Zap, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { laundries } from "@/lib/mock-data";

type DeliveryType = "standard" | "express" | "emergency";

interface Props {
  weight: number;
  laundryId: string;
  isEmergency: boolean;
  onConfirm: (details: { deliveryType: DeliveryType; altDate?: Date; pickupOnly: boolean; instructions: string; total: number }) => void;
  onBack: () => void;
}

const deliveryOptions: { type: DeliveryType; label: string; desc: string; icon: typeof Truck; fee: number }[] = [
  { type: "standard", label: "Standard", desc: "2–3 days delivery", icon: Truck, fee: 0 },
  { type: "express", label: "Express", desc: "Next day delivery", icon: Zap, fee: 300 },
  { type: "emergency", label: "Emergency", desc: "Same day – premium", icon: AlertTriangle, fee: 750 },
];

export function StepDeliveryOptions({ weight, laundryId, isEmergency, onConfirm, onBack }: Props) {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(isEmergency ? "emergency" : "standard");
  const [altDate, setAltDate] = useState<Date | undefined>();
  const [pickupOnly, setPickupOnly] = useState(false);
  const [instructions, setInstructions] = useState("");

  const laundry = laundries.find((l) => l.id === laundryId);
  const pricePerKg = laundry?.pricePerKg ?? 200;
  const deliveryFee = deliveryOptions.find((d) => d.type === deliveryType)?.fee ?? 0;
  const driverFee = 150;
  const serviceCharge = 100;
  const subtotal = weight * pricePerKg;
  const total = subtotal + serviceCharge + deliveryFee + driverFee;

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {/* Delivery type */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Delivery Speed</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {deliveryOptions.map((opt) => (
            <button
              key={opt.type}
              onClick={() => setDeliveryType(opt.type)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                deliveryType === opt.type ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
            >
              <opt.icon className={`h-5 w-5 mb-2 ${deliveryType === opt.type ? "text-primary" : "text-muted-foreground"}`} />
              <p className="font-medium text-sm">{opt.label}</p>
              <p className="text-xs text-muted-foreground">{opt.desc}</p>
              {opt.fee > 0 && <p className="text-xs font-semibold text-primary mt-1">+LKR {opt.fee}</p>}
            </button>
          ))}
        </div>
      </div>

      {/* Alt date */}
      <div className="space-y-2">
        <Label>Alternative Delivery Date (optional)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !altDate && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {altDate ? format(altDate, "PPP") : "Select alternate date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={altDate} onSelect={setAltDate} disabled={(d) => d < new Date()} className="p-3 pointer-events-auto" />
          </PopoverContent>
        </Popover>
      </div>

      {/* Pickup only */}
      <div className="flex items-center justify-between rounded-xl border p-4">
        <div>
          <p className="font-medium text-sm">Pickup & Drop Only</p>
          <p className="text-xs text-muted-foreground">No delivery — you'll collect from laundry</p>
        </div>
        <Switch checked={pickupOnly} onCheckedChange={setPickupOnly} />
      </div>

      {/* Instructions */}
      <div className="space-y-2">
        <Label>Special Instructions</Label>
        <Textarea placeholder="e.g. Separate whites, handle delicates with care…" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
      </div>

      {/* Price breakdown */}
      <div className="rounded-xl border bg-card p-5 space-y-2">
        <h4 className="font-semibold text-base mb-3">Price Estimate</h4>
        <div className="flex justify-between text-sm"><span>{weight} kg × LKR {pricePerKg}</span><span>LKR {subtotal}</span></div>
        <div className="flex justify-between text-sm"><span>Service Charge</span><span>LKR {serviceCharge}</span></div>
        <div className="flex justify-between text-sm"><span>Driver Fee</span><span>LKR {driverFee}</span></div>
        {deliveryFee > 0 && <div className="flex justify-between text-sm"><span>Delivery ({deliveryType})</span><span>LKR {deliveryFee}</span></div>}
        <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
          <span>Total</span><span className="text-primary">LKR {total}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onBack}>Back</Button>
        <Button className="flex-1" size="lg" onClick={() => onConfirm({ deliveryType, altDate, pickupOnly, instructions, total })}>
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}
