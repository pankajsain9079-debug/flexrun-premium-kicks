import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks! We'll get back to you within 24 hours.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-2xl animate-fade-in-up">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Contact</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold">Get in touch.</h1>
        <p className="text-lg text-muted-foreground mt-4">Questions, feedback, or partnerships — we love hearing from runners.</p>
      </div>

      <div className="mt-12 grid lg:grid-cols-[1fr_380px] gap-10">
        <form onSubmit={submit} className="space-y-5 rounded-2xl border border-border/50 bg-card p-6 md:p-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Name</Label><Input required className="h-11 bg-secondary border-border/50" /></div>
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" required className="h-11 bg-secondary border-border/50" /></div>
          </div>
          <div className="space-y-1.5"><Label>Subject</Label><Input required className="h-11 bg-secondary border-border/50" /></div>
          <div className="space-y-1.5"><Label>Message</Label><Textarea rows={6} required className="bg-secondary border-border/50" /></div>
          <Button type="submit" size="lg" className="bg-gradient-primary shadow-glow">Send message</Button>
        </form>

        <aside className="space-y-6">
          {[
            { Icon: Mail, label: "Email", value: "hello@flexrun.com" },
            { Icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
            { Icon: MapPin, label: "HQ", value: "Brooklyn, NY" },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex gap-4 rounded-2xl border border-border/50 bg-card p-5">
              <div className="h-10 w-10 rounded-full bg-primary/10 grid place-items-center text-primary shrink-0"><Icon className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="font-display font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default Contact;