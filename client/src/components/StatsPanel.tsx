import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Radio } from "lucide-react";

export function StatsPanel() {
  const { data: stats } = useQuery<{ totalViews: number; totalSightings: number }>({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="bg-black/80 backdrop-blur-md border-primary/30 shadow-2xl">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono tabular-nums">
                {stats?.totalViews || 0}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Odwiedziny
              </div>
            </div>
          </div>
          
          <div className="h-px bg-white/10" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Radio className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono tabular-nums">
                {stats?.totalSightings || 0}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Zgłoszenia
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
