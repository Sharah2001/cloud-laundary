import { laundries, type Laundry } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock } from "lucide-react";

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepSelectLaundry({ selectedId, onSelect, onNext, onBack }: Props) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {laundries.map((l) => (
          <button
            key={l.id}
            onClick={() => onSelect(l.id)}
            className={`text-left rounded-xl border-2 p-5 transition-all hover:shadow-md ${
              selectedId === l.id ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-base">{l.name}</h3>
              <div className="flex items-center gap-1 text-sm font-medium text-accent">
                <Star className="h-4 w-4 fill-current" /> {l.rating}
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{l.distance}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{l.estimatedDelivery}</span>
            </div>
            <p className="text-lg font-bold text-primary mb-3">LKR {l.pricePerKg}<span className="text-xs font-normal text-muted-foreground">/kg</span></p>
            <div className="flex flex-wrap gap-1.5">
              {l.services.map((s) => (
                <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
              ))}
            </div>
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onBack}>Back</Button>
        <Button className="flex-1" size="lg" disabled={!selectedId} onClick={onNext}>
          Next – Delivery Options
        </Button>
      </div>
    </div>
  );
}
