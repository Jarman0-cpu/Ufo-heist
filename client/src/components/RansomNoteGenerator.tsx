import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Shuffle, Copy, Check } from "lucide-react";

const WORDS = ["WE HAVE", "YOUR", "BIG BEN", "PAY", "1,000,000", "SPACE BUCKS", "OR ELSE", "NO TEA", "FOR YOU", "EARTHLINGS", "DELIVER TO", "MARS", "NOW", "DON'T", "BE", "LATE"];
const FONTS = ["font-serif", "font-sans", "font-mono", "font-black"];
const COLORS = ["bg-white text-black", "bg-primary text-black", "bg-accent text-black", "bg-destructive text-white", "bg-yellow-300 text-black"];
const ROTATIONS = ["rotate-1", "-rotate-2", "rotate-3", "-rotate-1", "rotate-6", "-rotate-3"];

export function RansomNoteGenerator() {
  const [customText, setCustomText] = useState("");
  const [generatedNote, setGeneratedNote] = useState<{word: string, style: any}[]>([]);
  const [copied, setCopied] = useState(false);

  const generateNote = (text: string = "") => {
    const sourceText = text || WORDS.join(" ");
    const words = sourceText.split(" ");
    
    const newNote = words.map(word => ({
      word,
      style: {
        font: FONTS[Math.floor(Math.random() * FONTS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)],
        scale: 0.9 + Math.random() * 0.3,
      }
    }));
    
    setGeneratedNote(newNote);
  };

  useState(() => generateNote());

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/crinkled-paper.png')] mix-blend-overlay" />
      
      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-serif font-bold text-white">Galactic Ransom Creator</h3>
          <p className="text-muted-foreground">Demands look better when cut out of magazines.</p>
        </div>

        <div className="flex gap-4">
          <Input 
            placeholder="Type your demands here..." 
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="bg-black/50 border-white/20 text-lg h-12 font-mono"
          />
          <Button 
            onClick={() => generateNote(customText)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 font-bold"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Scramble
          </Button>
        </div>

        <div className="min-h-[300px] p-8 bg-zinc-900/50 border-2 border-dashed border-white/10 rounded-xl flex flex-wrap content-center justify-center gap-4 shadow-inner">
          {generatedNote.map((item, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: item.style.scale, opacity: 1 }}
              transition={{ delay: i * 0.05, type: "spring" }}
              className={`
                px-3 py-1 md:px-4 md:py-2 
                ${item.style.color} 
                ${item.style.font} 
                ${item.style.rotation}
                text-lg md:text-2xl font-bold shadow-lg
                cursor-grab active:cursor-grabbing
              `}
              drag
              dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            >
              {item.word}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" onClick={handleCopy} className="border-white/20 hover:bg-white/10">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied to Clipboard" : "Copy Demands"}
          </Button>
        </div>
      </div>
    </div>
  );
}
