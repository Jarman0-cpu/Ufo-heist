import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertSightingSchema, type InsertSighting } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const MONUMENTS = [
  "Big Ben",
  "Eiffel Tower",
  "Statue of Liberty",
  "Other Monument",
];

interface SightingReportDialogProps {
  children: React.ReactNode;
}

export function SightingReportDialog({ children }: SightingReportDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const form = useForm<InsertSighting>({
    resolver: zodResolver(insertSightingSchema),
    defaultValues: {
      witnessName: "",
      location: "",
      monumentSeen: "",
      description: "",
      coordinates: "",
    },
  });

  const createSighting = useMutation({
    mutationFn: async (data: InsertSighting) => {
      const res = await fetch("/api/sightings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to submit report");
      }
      
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sightings"] });
      toast.success("Sighting reported!", {
        description: "Your report has been transmitted to Earth Command.",
      });
      form.reset();
      setOpen(false);
    },
    onError: (error: Error) => {
      toast.error("Report failed", {
        description: error.message,
      });
    },
  });

  const onSubmit = (data: InsertSighting) => {
    createSighting.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-primary" />
            Report a Sighting
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Help us track the stolen monuments. Every report counts.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="witnessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Agent Smith" 
                      {...field} 
                      data-testid="input-witness-name"
                      className="bg-black/20 border-white/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monumentSeen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monument Spotted</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger 
                        data-testid="select-monument"
                        className="bg-black/20 border-white/10"
                      >
                        <SelectValue placeholder="Select monument" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MONUMENTS.map((monument) => (
                        <SelectItem key={monument} value={monument}>
                          {monument}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Sector 7-G, Mars Orbit" 
                      {...field}
                      data-testid="input-location"
                      className="bg-black/20 border-white/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coordinates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordinates (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="51.5074° N, 0.1278° W" 
                      {...field}
                      value={field.value || ""}
                      data-testid="input-coordinates"
                      className="bg-black/20 border-white/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what you saw..."
                      className="resize-none bg-black/20 border-white/10"
                      {...field}
                      data-testid="textarea-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
              disabled={createSighting.isPending}
              data-testid="button-submit-report"
            >
              {createSighting.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Transmitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
