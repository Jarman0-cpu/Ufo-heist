import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, AlertTriangle, Globe, MapPin, Clock, ArrowUp } from "lucide-react";
import ufoImage from "@assets/generated_images/ufo_stealing_big_ben_in_a_playful_vector_style.png";

export default function Home() {
  // Since we don't know the exact filename yet, we'll use a variable that we can patch or standard import
  // For now, I'll assume the image generation works and returns a path I can reference, 
  // but typically I'd need to see the tool output. 
  // I'll use a placeholder if the import fails in a real scenario, but for this mockup code:
  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-primary selection:text-primary-foreground">
      
      {/* Starry Background Elements */}
      <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="text-primary w-6 h-6" />
            <span className="font-sans font-bold text-xl tracking-tighter">THEFT<span className="text-primary">.GALACTIC</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Missing Monuments</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Ransom Demands</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Witness Reports</a>
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono text-xs uppercase">
            Report Sighting
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 z-10">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 px-4 py-1 rounded-full font-mono text-xs mb-4">
              BREAKING NEWS: LONDON IN CHAOS
            </Badge>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
              Who Stole <br/>
              <span className="text-primary inline-block transform -rotate-2 decoration-wavy underline decoration-white/20">Big Ben?</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-md font-light leading-relaxed">
              Witnesses report a "neon green tractor beam" lifting the historic clock tower at 3:00 AM. Tea consumption has halted nationwide.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-14 px-8 rounded-2xl">
                Join Rescue Mission
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 h-14 px-8 rounded-2xl">
                Read Manifesto
              </Button>
            </div>
            
            <div className="pt-8 flex items-center gap-4 text-sm text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                LIVE TRACKING
              </div>
              <span className="opacity-50">|</span>
              <div>LAST SEEN: ORBIT 7-Alpha</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* This image src will need to be updated with the actual generated file */}
            <div className="relative z-10 animate-float">
               {/* We will use an img tag here but populate src via prop or hardcode after generation */}
               <img 
                 src={ufoImage}
                 alt="UFO Stealing Big Ben" 
                 className="w-full h-auto drop-shadow-[0_0_50px_rgba(74,222,128,0.3)]"
               />
            </div>
            
            {/* Decorative Elements behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[100px] rounded-full -z-10" />
          </motion.div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/20 border-y border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Height Stolen", value: "315 ft", icon: ArrowUp },
              { label: "Time Frozen", value: "03:00", icon: Clock },
              { label: "Panic Level", value: "CRITICAL", icon: AlertTriangle },
              { label: "Current Altitude", value: "400km", icon: Globe },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-crosshair group">
                <stat.icon className="w-6 h-6 mx-auto text-muted-foreground group-hover:text-primary transition-colors mb-4" />
                <div className="text-3xl md:text-4xl font-bold font-mono tracking-tighter">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missing Poster Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-card border border-white/10 rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
          
          <div className="p-8 md:p-12 grid md:grid-cols-[1.5fr_1fr] gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-4xl mb-4">Have you seen this tower?</h2>
                <p className="text-muted-foreground">
                  Description: Neogothic style, very loud, tells time accurately (usually). 
                  Last seen floating upwards towards the constellation of Orion. 
                  Distinctive features: Four clock faces, large bell inside.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-black/40 border-white/10">
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground mb-1">WEIGHT</div>
                    <div className="font-mono text-lg">13.7 TONS</div>
                  </CardContent>
                </Card>
                <Card className="bg-black/40 border-white/10">
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground mb-1">YEAR BUILT</div>
                    <div className="font-mono text-lg">1859</div>
                  </CardContent>
                </Card>
              </div>

              <Button className="w-full bg-secondary text-white hover:bg-secondary/90 font-bold py-6">
                <AlertTriangle className="mr-2 w-5 h-5" />
                REPORT A SIGHTING
              </Button>
            </div>

            <div className="relative border-2 border-dashed border-white/20 rounded-xl p-4 flex items-center justify-center bg-black/20 min-h-[300px]">
              <div className="text-center opacity-50">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-mono text-sm">IMAGE NOT FOUND</p>
                <p className="text-xs text-muted-foreground mt-2">Subject has been removed from reality</p>
              </div>
              {/* Holographic effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
