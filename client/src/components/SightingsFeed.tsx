import { useQuery } from "@tanstack/react-query";
import { type Sighting } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

export function SightingsFeed() {
  const { data: sightings, isLoading } = useQuery<Sighting[]>({
    queryKey: ["sightings"],
    queryFn: async () => {
      const res = await fetch("/api/sightings?limit=10");
      if (!res.ok) throw new Error("Failed to fetch sightings");
      return res.json();
    },
    refetchInterval: 10000, // Refetch every 10 seconds for "live" feel
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-black/40 border-white/10 animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-white/10 rounded w-3/4 mb-4" />
              <div className="h-3 bg-white/10 rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!sightings || sightings.length === 0) {
    return (
      <Card className="bg-black/40 border-white/10 border-dashed">
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground font-mono">
            No sightings reported yet. Be the first to spot something!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {sightings.map((sighting, i) => (
        <motion.div
          key={sighting.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card 
            className="bg-black/40 border-white/10 hover:border-primary/30 transition-all cursor-pointer group"
            data-testid={`card-sighting-${sighting.id}`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <Badge 
                  variant="outline" 
                  className="border-accent/50 text-accent bg-accent/10 font-mono text-xs"
                >
                  {sighting.monumentSeen}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(sighting.timestamp), { addSuffix: true })}
                </span>
              </div>

              <p className="text-sm text-foreground mb-3 leading-relaxed">
                {sighting.description}
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span data-testid={`text-witness-${sighting.id}`}>
                    {sighting.witnessName}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span data-testid={`text-location-${sighting.id}`}>
                    {sighting.location}
                  </span>
                </div>
                {sighting.coordinates && (
                  <div className="font-mono text-primary/70">
                    {sighting.coordinates}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
