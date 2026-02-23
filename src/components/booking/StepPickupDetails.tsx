import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { timeSlots } from "@/lib/mock-data";

interface PickupData {
  address: string;
  phone: string;
  weight: number;
  date: Date | undefined;
  timeSlot: string;
  emergency: boolean;
}

interface Props {
  data: PickupData;
  onChange: (data: PickupData) => void;
  onNext: () => void;
}

export function StepPickupDetails({ data, onChange, onNext }: Props) {
  const update = (partial: Partial<PickupData>) => onChange({ ...data, ...partial });
  const canProceed = data.address && data.phone && data.date && data.timeSlot;

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="space-y-2">
        <Label htmlFor="address">Pickup Address</Label>
        <Input id="address" placeholder="Enter your address" value={data.address} onChange={(e) => update({ address: e.target.value })} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Contact Number</Label>
        <Input id="phone" placeholder="+94 77 123 4567" value={data.phone} onChange={(e) => update({ phone: e.target.value })} />
      </div>

      <div className="space-y-2">
        <Label>Expected Weight: <span className="font-bold text-primary">{data.weight} kg</span></Label>
        <Slider min={1} max={20} step={1} value={[data.weight]} onValueChange={([v]) => update({ weight: v })} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 kg</span><span>20 kg</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Pickup Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !data.date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.date ? format(data.date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.date}
                onSelect={(d) => update({ date: d })}
                disabled={(d) => d < new Date()}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Time Slot</Label>
          <Select value={data.timeSlot} onValueChange={(v) => update({ timeSlot: v })}>
            <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
            <SelectContent>
              {timeSlots.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border bg-destructive/5 p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <div>
            <p className="font-medium text-sm">Emergency Service</p>
            <p className="text-xs text-muted-foreground">Same-day processing – extra charges apply</p>
          </div>
        </div>
        <Switch checked={data.emergency} onCheckedChange={(v) => update({ emergency: v })} />
      </div>

      <Button className="w-full" size="lg" disabled={!canProceed} onClick={onNext}>
        Next – Choose Laundry
      </Button>
    </div>
  );
}
