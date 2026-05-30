import aboutImg from "@/assets/about.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => (
  <div>
    <section className="container py-16 md:py-24">
      <div className="max-w-3xl animate-fade-in-up">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Our story</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">Made for athletes. <span className="text-gradient">Built to last.</span></h1>
        <p className="text-lg text-muted-foreground mt-6 max-w-2xl">
          FlexRun started in a Brooklyn garage in 2019. Three runners, one prototype, and an obsession with making every stride count. Today we ship to 60+ countries — and we still test every shoe ourselves.
        </p>
      </div>
    </section>

    <section className="relative h-[60vh] overflow-hidden">
      <img src={aboutImg} alt="Athlete on track" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
    </section>

    <section className="container py-20">
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { n: "01", t: "Performance first", b: "We start every design with the athlete's question: will this make me faster, stronger, more comfortable?" },
          { n: "02", t: "Crafted, not assembled", b: "Each model goes through 200+ iterations. We refine until we'd race in it ourselves." },
          { n: "03", t: "Sustainable by design", b: "Recycled materials, carbon-neutral shipping, and a take-back program for retired pairs." },
        ].map((v) => (
          <div key={v.n} className="space-y-3">
            <p className="font-display text-5xl font-bold text-primary">{v.n}</p>
            <h3 className="font-display text-2xl font-bold">{v.t}</h3>
            <p className="text-muted-foreground">{v.b}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="container py-20 text-center">
      <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Join the movement</h2>
      <Button asChild size="lg" className="bg-gradient-primary shadow-glow"><Link to="/shop">Shop the collection</Link></Button>
    </section>
  </div>
);

export default About;