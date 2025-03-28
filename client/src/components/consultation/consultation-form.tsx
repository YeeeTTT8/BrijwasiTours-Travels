import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { type Destination, type ConsultationRequest } from "@/types";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
  destination: z.string().min(1, "Please select a destination"),
  travelDate: z.string().optional(),
  additionalInfo: z.string().optional()
});

export function ConsultationForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      destination: "",
      travelDate: "",
      additionalInfo: ""
    },
  });
  
  const { data: destinations } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });
  
  const mutation = useMutation({
    mutationFn: (data: ConsultationRequest) => 
      apiRequest("POST", "/api/consultation-requests", data),
    onSuccess: () => {
      toast({
        title: "Consultation Request Submitted",
        description: "We'll contact you shortly to schedule your free consultation call.",
        variant: "success"
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-gray-700 font-medium mb-2">Your Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Full Name" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-gray-700 font-medium mb-2">Email Address</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-gray-700 font-medium mb-2">Phone Number</FormLabel>
              <FormControl>
                <Input 
                  type="tel" 
                  placeholder="+1 (123) 456-7890" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-gray-700 font-medium mb-2">Interested Destination(s)</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {destinations ? destinations.map((destination) => (
                    <SelectItem key={destination.id} value={destination.name}>
                      {destination.name}
                    </SelectItem>
                  )) : null}
                  <SelectItem value="Multiple destinations">Multiple destinations</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="travelDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-gray-700 font-medium mb-2">Travel Date (Approximate)</FormLabel>
              <FormControl>
                <Input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-gray-700 font-medium mb-2">Additional Information</FormLabel>
              <FormControl>
                <Textarea 
                  rows={3} 
                  placeholder="Tell us about your travel preferences, group size, special interests, etc." 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-primary hover:bg-primary/90 text-white font-heading font-semibold py-3 px-6 rounded-md transition-colors"
        >
          {mutation.isPending ? "Submitting..." : "Request Consultation"}
        </Button>
      </form>
    </Form>
  );
}
