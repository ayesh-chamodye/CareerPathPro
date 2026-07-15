"use client";

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
import { CareerInput, CareerRecommendation, careerInputSchema } from "@/types/career";
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
  const watchSubjects = form.watch("subjects");

  const getFilteredSubjects = (index: number) => {
    const selectedSubjects = watchSubjects.map((subject) => subject.name).filter(Boolean);
    return getSubjectsForStream().filter(
      (subject) => !selectedSubjects.includes(subject.value) || subject.value === watchSubjects[index]?.name
    );
  };

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
    <section id="career-form" className="py-12 md:py-16 bg-gradient-to-b from-grey-700 to-blue-900 relative">
      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full ">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-200 opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-blue-200 opacity-60"></div>
        <div className="absolute top-40 right-20 w-12 h-12 rounded-full bg-blue-300 opacity-40"></div>
        <div className="absolute bottom-40 left-40 w-16 h-16 rounded-full bg-blue-300 opacity-40"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 bg-white dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-blue-800 bg-gradient-to-r from-blue-700 to-blue-500 inline-block text-transparent bg-clip-text">Find Your Career Path</h2>
            
            {/* Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center">
                <div className="flex items-center relative">
                  <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 border-2 ${currentStep >= 0 ? 'border-blue-600 bg-gradient-to-r from-blue-700 to-blue-500 text-white' : 'border-gray-300 text-gray-500'} flex items-center justify-center shadow-md`}>
                    <span className="material-icons text-lg">person</span>
                  </div>
                  <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium ${currentStep >= 0 ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>Personal Info</div>
                </div>
                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${currentStep >= 1 ? 'border-blue-600' : 'border-gray-300'}`}></div>
                <div className="flex items-center relative">
                  <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 border-2 ${currentStep >= 1 ? 'border-blue-600 bg-gradient-to-r from-blue-700 to-blue-500 text-white' : 'border-gray-300 text-gray-500'} flex items-center justify-center shadow-md`}>
                    <span className="material-icons text-lg">school</span>
                  </div>
                  <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium ${currentStep >= 1 ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>Academic</div>
                </div>
                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${currentStep >= 2 ? 'border-blue-600' : 'border-gray-300'}`}></div>
                <div className="flex items-center relative">
                  <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 border-2 ${currentStep >= 2 ? 'border-blue-600 bg-gradient-to-r from-blue-700 to-blue-500 text-white' : 'border-gray-300 text-gray-500'} flex items-center justify-center shadow-md`}>
                    <span className="material-icons text-lg">favorite</span>
                  </div>
                  <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium ${currentStep >= 2 ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>Interests</div>
                </div>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg">
                {/* Step 1: Personal Information */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-5 rounded-lg mb-4 border border-blue-100 shadow-sm dark:bg-gray-800">
                      <h3 className="font-medium text-blue-800 mb-3">Personal Details</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-800">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600 text-gray-900 dark:text-white" />
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
                              <FormLabel className="text-blue-800 ">Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="example@email.com" {...field} className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600 text-gray-900 dark:text-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <FormField
                          control={form.control}
                          name="district"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-800">District</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600 text-gray-900 dark:text-white">
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
                              <FormLabel className="text-blue-800">Gender</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600 text-gray-900 dark:text-white">
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
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg inline-flex items-center transition-all"
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
                    <div className="bg-blue-50 p-5 rounded-lg mb-6 border border-blue-100 shadow-sm dark:bg-gray-800">
                      <h3 className="font-medium text-blue-800 mb-2">A/L Stream</h3>
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
                                      className="cursor-pointer border-2 border-blue-200 bg-white rounded-lg p-3 text-center transition-all peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 block hover:border-blue-300 hover:shadow-sm dark:bg-gray-800"
                                    >
                                      <span className="material-icons text-blue-400 peer-data-[state=checked]:text-blue-600">
                                        {stream.icon}
                                      </span>
                                      <p className="text-sm mt-1 text-blue-800">{stream.label}</p>
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
                      <div className="bg-blue-50 p-5 rounded-lg mb-4 border border-blue-100 shadow-sm dark:bg-gray-800">
                        <h3 className="font-medium text-blue-800 mb-3">Subject Grades</h3>
                        
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
                                        {getFilteredSubjects(index).map(subject => (
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
                    
                    <div className="bg-blue-50 p-5 rounded-lg mb-4 border border-blue-100 shadow-sm dark:bg-gray-800">
                      <FormField
                        control={form.control}
                        name="zscore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800 font-medium">Z-Score (if known)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 1.5432" {...field} className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600 text-gray-900 dark:text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button 
                        type="button" 
                        onClick={handlePrevious}
                        variant="outline"
                        className="text-blue-600 hover:text-blue-800 font-medium px-8 py-3 rounded-lg border-2 border-blue-300 inline-flex items-center transition-all hover:border-blue-500 hover:bg-blue-50"
                      >
                        <span className="material-icons mr-2">arrow_back</span>
                        Previous
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg inline-flex items-center transition-all"
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
                    <div className="bg-blue-50 p-5 rounded-lg mb-6 border border-blue-100 shadow-sm dark:bg-gray-800">
                      <h3 className="font-medium text-blue-800 mb-3">Your Interests</h3>
                      <p className="text-blue-600 text-sm mb-4">Select all areas that interest you (minimum 3).</p>
                      
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
                                    className="cursor-pointer border-2 border-blue-200 bg-white rounded-lg p-3 text-center transition-all peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50  w-full hover:border-blue-300 hover:shadow-sm dark:bg-gray-800"
                                  >
                                    <span className="material-icons text-blue-400 peer-data-[state=checked]:text-blue-600">
                                      {interest.icon}
                                    </span>
                                    <p className="text-sm mt-1 text-blue-800">{interest.label}</p>
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="bg-blue-50 p-5 rounded-lg mb-4 border border-blue-100 shadow-sm dark:bg-gray-800">
                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800 font-medium">Any specific career goals or additional information</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about any specific goals or additional information"
                                rows={3}
                                {...field}
                                className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600 text-gray-900 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button 
                        type="button" 
                        onClick={handlePrevious}
                        variant="outline"
                        className="text-blue-600 hover:text-blue-800 font-medium px-8 py-3 rounded-lg border-2 border-blue-300 inline-flex items-center transition-all hover:border-blue-500 hover:bg-blue-50"
                      >
                        <span className="material-icons mr-2">arrow_back</span>
                        Previous
                      </Button>
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg inline-flex items-center transition-all"
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
