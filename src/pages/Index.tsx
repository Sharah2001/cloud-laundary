import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplets, Truck, Clock, Star, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Droplets, title: "Schedule Pickup", desc: "Choose a convenient time and we'll come to you." },
  { icon: Truck, title: "We Collect", desc: "Our driver picks up your laundry at your doorstep." },
  { icon: Clock, title: "Fresh & Clean", desc: "Professional cleaning by trusted local laundries." },
  { icon: CheckCircle, title: "Delivered Back", desc: "Clean clothes delivered right back to you." },
];

const features = [
  { icon: Star, title: "Trusted Partners", desc: "Vetted laundry providers with quality ratings." },
  { icon: Clock, title: "Same-Day Option", desc: "Emergency service when you need it fast." },
  { icon: Truck, title: "Free Pickup", desc: "No extra charge for standard pickup & delivery." },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-24 md:py-36">
        <div className="container text-center max-w-3xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          >
            Laundry. Picked Up.{" "}
            <span className="text-primary">Cleaned.</span>{" "}
            <span className="text-accent">Delivered.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto"
          >
            On-demand laundry pickup & delivery. Choose your provider, set your schedule, and let us handle the rest.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/book">
              <Button size="lg" className="text-base px-8 gap-2">
                Book Pickup <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="text-base px-8">
                How It Works
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-card">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col items-center text-center space-y-3"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <step.icon className="h-7 w-7" />
                </div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Step {i + 1}</span>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Cloud Laundry?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="rounded-xl border bg-card p-6 space-y-3 hover:shadow-lg transition-shadow"
              >
                <div className="h-10 w-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Ready to simplify laundry day?</h2>
          <p className="text-primary-foreground/80">Join thousands of happy customers across Sri Lanka & the UK.</p>
          <Link to="/book">
            <Button size="lg" variant="secondary" className="text-base px-8 gap-2">
              Book Your First Pickup <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 Cloud Laundry. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
