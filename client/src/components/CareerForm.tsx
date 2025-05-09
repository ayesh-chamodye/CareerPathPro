import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CareerInput, CareerRecommendation, careerInputSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { streams, scienceSubjects, commerceSubjects, artsSubjects, technologySubjects } from "@/data/subjects";
import { interests } from "@/data/interestsData";

interface CareerFormProps {
  onGetRecommendations: (recommendations: CareerRecommendation[]) => void;
}

const CareerForm = ({ onGetRecommendations }: CareerFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CareerInput>({
    resolver: zodResolver(careerInputSchema),
    defaultValues: {
      fullName: "",
      email: "",
      district: "",
      gender: "",
      stream: "",
      subjects: [
        { name: "", grade: "" },
        { name: "", grade: "" },
        { name: "", grade: "" }
      ],
      zscore: "",
      interests: [],
      additionalInfo: ""
    }
  });

  const watchStream = form.watch("stream");
  
  // Get subjects based on selected stream
  const getSubjectsForStream = () => {
    switch (watchStream) {
      case "science":
        return scienceSubjects;
      case "commerce":
        return commerceSubjects;
      case "arts":
        return artsSubjects;
      case "technology":
        return technologySubjects;
      default:
        return [];
    }
  };

  const handleNext = async () => {
    // Validate current step
    let isValid = false;
    
    if (currentStep === 0) {
      isValid = await form.trigger(["fullName", "email", "district", "gender"]);
    } else if (currentStep === 1) {
      isValid = await form.trigger(["stream", "subjects"]);
    }
    
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: CareerInput) => {
    try {
      setIsSubmitting(true);
      
      // Send data to API to get recommendations
      const response = await apiRequest('POST', '/api/career-recommendations', data);
      const recommendations = await response.json();
      
      onGetRecommendations(recommendations);
      
      toast({
        title: "Success!",
        description: "Your career recommendations are ready.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="career-form" className="py-12 md:py-16 bg-gray-50 relative">
      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary-100 opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-primary-100 opacity-60"></div>
        <div className="absolute top-40 right-20 w-12 h-12 rounded-full bg-primary-200 opacity-40"></div>
        <div className="absolute bottom-40 left-40 w-16 h-16 rounded-full bg-primary-200 opacity-40"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Find Your Career Path</h2>
            
            {/* Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center">
                <div className="flex items-center relative">
                  <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 border-2 ${currentStep >= 0 ? 'border-primary-600 bg-gradient-to-r from-primary-600 to-primary-700 text-white' : 'border-gray-300 text-gray-500'} flex items-center justify-center shadow-md`}>
                    <span className="material-icons text-lg">person</span>
                  </div>
                  <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium ${currentStep >= 0 ? 'text-primary-700 font-semibold' : 'text-gray-500'}`}>Personal Info</div>
                </div>
                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${currentStep >= 1 ? 'border-primary-600' : 'border-gray-300'}`}></div>
                <div className="flex items-center relative">
                  <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 border-2 ${currentStep >= 1 ? 'border-primary-600 bg-gradient-to-r from-primary-600 to-primary-700 text-white' : 'border-gray-300 text-gray-500'} flex items-center justify-center shadow-md`}>
                    <span className="material-icons text-lg">school</span>
                  </div>
                  <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium ${currentStep >= 1 ? 'text-primary-700 font-semibold' : 'text-gray-500'}`}>Academic</div>
                </div>
                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${currentStep >= 2 ? 'border-primary-600' : 'border-gray-300'}`}></div>
                <div className="flex items-center relative">
                  <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 border-2 ${currentStep >= 2 ? 'border-primary-600 bg-gradient-to-r from-primary-600 to-primary-700 text-white' : 'border-gray-300 text-gray-500'} flex items-center justify-center shadow-md`}>
                    <span className="material-icons text-lg">favorite</span>
                  </div>
                  <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium ${currentStep >= 2 ? 'text-primary-700 font-semibold' : 'text-gray-500'}`}>Interests</div>
                </div>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="example@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>District</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your district" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="colombo">Colombo</SelectItem>
                                <SelectItem value="gampaha">Gampaha</SelectItem>
                                <SelectItem value="kandy">Kandy</SelectItem>
                                <SelectItem value="galle">Galle</SelectItem>
                                <SelectItem value="matara">Matara</SelectItem>
                                <SelectItem value="jaffna">Jaffna</SelectItem>
                                <SelectItem value="batticaloa">Batticaloa</SelectItem>
                                <SelectItem value="anuradhapura">Anuradhapura</SelectItem>
                                <SelectItem value="badulla">Badulla</SelectItem>
                                <SelectItem value="kurunegala">Kurunegala</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg inline-flex items-center transition-all"
                      >
                        Next
                        <span className="material-icons ml-2">arrow_forward</span>
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Academic Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h3 className="font-medium text-gray-800 mb-2">A/L Stream</h3>
                      <FormField
                        control={form.control}
                        name="stream"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 md:grid-cols-4 gap-3"
                              >
                                {streams.map(stream => (
                                  <FormItem key={stream.value} className="space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        value={stream.value}
                                        id={stream.value}
                                        className="sr-only peer"
                                      />
                                    </FormControl>
                                    <FormLabel
                                      htmlFor={stream.value}
                                      className="cursor-pointer border-2 border-gray-200 rounded-lg p-3 text-center transition-all peer-data-[state=checked]:border-primary-600 peer-data-[state=checked]:bg-primary-50 block"
                                    >
                                      <span className="material-icons text-gray-500 peer-data-[state=checked]:text-primary-600">
                                        {stream.icon}
                                      </span>
                                      <p className="text-sm mt-1">{stream.label}</p>
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {watchStream && (
                      <div>
                        <h3 className="font-medium text-gray-800 mb-3">Subject Grades</h3>
                        
                        {[0, 1, 2].map((index) => (
                          <div key={index} className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center mb-4">
                            <div className="md:col-span-2">
                              <FormField
                                control={form.control}
                                name={`subjects.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select Subject" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {getSubjectsForStream().map(subject => (
                                          <SelectItem key={subject.value} value={subject.value}>
                                            {subject.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div>
                              <FormField
                                control={form.control}
                                name={`subjects.${index}.grade`}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Grade" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="A">A</SelectItem>
                                        <SelectItem value="B">B</SelectItem>
                                        <SelectItem value="C">C</SelectItem>
                                        <SelectItem value="S">S</SelectItem>
                                        <SelectItem value="F">F</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="zscore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Z-Score (if known)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 1.5432" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4 flex justify-between">
                      <Button 
                        type="button" 
                        onClick={handlePrevious}
                        variant="outline"
                        className="text-gray-600 hover:text-gray-800 font-medium px-8 py-3 rounded-lg border-2 inline-flex items-center transition-all hover:border-gray-400"
                      >
                        <span className="material-icons mr-2">arrow_back</span>
                        Previous
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg inline-flex items-center transition-all"
                      >
                        Next
                        <span className="material-icons ml-2">arrow_forward</span>
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Interests */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">Your Interests</h3>
                      <p className="text-gray-600 text-sm mb-4">Select all areas that interest you (minimum 3).</p>
                      
                      <FormField
                        control={form.control}
                        name="interests"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {interests.map((interest) => (
                                <FormItem
                                  key={interest.value}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(interest.value)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = [...(field.value || [])];
                                        if (checked) {
                                          field.onChange([...currentValues, interest.value]);
                                        } else {
                                          field.onChange(
                                            currentValues.filter((value) => value !== interest.value)
                                          );
                                        }
                                      }}
                                      className="sr-only peer"
                                      id={`interest-${interest.value}`}
                                    />
                                  </FormControl>
                                  <FormLabel
                                    htmlFor={`interest-${interest.value}`}
                                    className="cursor-pointer border-2 border-gray-200 rounded-lg p-3 text-center transition-all peer-data-[state=checked]:border-primary-600 peer-data-[state=checked]:bg-primary-50 w-full"
                                  >
                                    <span className="material-icons text-gray-500 peer-data-[state=checked]:text-primary-600">
                                      {interest.icon}
                                    </span>
                                    <p className="text-sm mt-1">{interest.label}</p>
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Any specific career goals or additional information</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about any specific goals or additional information"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4 flex justify-between">
                      <Button 
                        type="button" 
                        onClick={handlePrevious}
                        variant="outline"
                        className="text-gray-600 hover:text-gray-800 font-medium px-8 py-3 rounded-lg border-2 inline-flex items-center transition-all hover:border-gray-400"
                      >
                        <span className="material-icons mr-2">arrow_back</span>
                        Previous
                      </Button>
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg inline-flex items-center transition-all"
                      >
                        {isSubmitting ? (
                          <span className="material-icons animate-spin mr-2">refresh</span>
                        ) : (
                          <span className="material-icons mr-2">lightbulb</span>
                        )}
                        Get Recommendations
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerForm;
