import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { type Destination, type BudgetLevel, type Duration, type TravelStyle, type ItineraryFormData } from "@/types";

interface ItineraryFormProps {
  destinations: Destination[];
  onSubmit: (data: ItineraryFormData) => void;
}

const travelStyles: TravelStyle[] = [
  "Adventure", 
  "Cultural", 
  "Relaxation", 
  "Food & Culinary", 
  "Shopping"
];

const budgetLevels: BudgetLevel[] = [
  "Budget-friendly",
  "Moderate",
  "Luxury",
  "Ultra-luxury"
];

const durations: Duration[] = [
  "3-4 days",
  "5-7 days",
  "8-10 days",
  "10-14 days",
  "14+ days"
];

const formSchema = z.object({
  destination: z.string(),
  duration: z.string(),
  budget: z.string(),
  travelStyles: z.array(z.string())
});

export function ItineraryForm({ destinations, onSubmit }: ItineraryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "all",
      duration: "any",
      budget: "any",
      travelStyles: []
    },
  });
  
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      destination: values.destination,
      duration: values.duration as Duration,
      budget: values.budget as BudgetLevel,
      travelStyles: values.travelStyles as TravelStyle[]
    });
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-gray-700 font-semibold">Destination</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All Destinations</SelectItem>
                  {destinations.map((destination) => (
                    <SelectItem key={destination.id} value={destination.slug}>
                      {destination.name}
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
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-gray-700 font-semibold">Duration</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                    <SelectValue placeholder="Select a duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="any">Any Duration</SelectItem>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
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
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-gray-700 font-semibold">Budget</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                    <SelectValue placeholder="Select a budget level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="any">Any Budget</SelectItem>
                  {budgetLevels.map((budget) => (
                    <SelectItem key={budget} value={budget}>
                      {budget}
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
          name="travelStyles"
          render={() => (
            <FormItem>
              <div className="mb-2">
                <FormLabel className="block text-gray-700 font-semibold">Travel Style</FormLabel>
              </div>
              <div className="space-y-2">
                {travelStyles.map((style) => (
                  <FormField
                    key={style}
                    control={form.control}
                    name="travelStyles"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={style}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(style)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, style])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== style
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {style}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit"
          className="w-full bg-secondary hover:bg-secondary/90 text-white font-heading font-semibold py-3 px-6 rounded-md transition-colors"
        >
          Generate Itinerary
        </Button>
      </form>
    </Form>
  );
}
