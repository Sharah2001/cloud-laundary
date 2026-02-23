import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingStepper } from "@/components/booking/BookingStepper";
import { StepPickupDetails } from "@/components/booking/StepPickupDetails";
import { StepSelectLaundry } from "@/components/booking/StepSelectLaundry";
import { StepDeliveryOptions } from "@/components/booking/StepDeliveryOptions";

const stepLabels = ["Pickup Details", "Choose Laundry", "Delivery Options"];

export default function BookingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [pickup, setPickup] = useState({
    address: "",
    phone: "",
    weight: 5,
    date: undefined as Date | undefined,
    timeSlot: "",
    emergency: false,
  });

  const [selectedLaundry, setSelectedLaundry] = useState("");

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-2">Book a Pickup</h1>
      <p className="text-center text-muted-foreground mb-6">Complete the steps below to schedule your laundry pickup.</p>

      <BookingStepper currentStep={step} steps={stepLabels} />

      {step === 0 && (
        <StepPickupDetails data={pickup} onChange={setPickup} onNext={() => setStep(1)} />
      )}
      {step === 1 && (
        <StepSelectLaundry
          selectedId={selectedLaundry}
          onSelect={setSelectedLaundry}
          onNext={() => setStep(2)}
          onBack={() => setStep(0)}
        />
      )}
      {step === 2 && (
        <StepDeliveryOptions
          weight={pickup.weight}
          laundryId={selectedLaundry}
          isEmergency={pickup.emergency}
          onBack={() => setStep(1)}
          onConfirm={(details) => {
            const bookingId = `CL-${Date.now().toString(36).toUpperCase()}`;
            navigate("/confirmation", {
              state: {
                bookingId,
                pickup,
                laundryId: selectedLaundry,
                ...details,
              },
            });
          }}
        />
      )}
    </div>
  );
}
