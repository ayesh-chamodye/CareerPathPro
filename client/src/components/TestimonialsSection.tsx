import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sayumi Pathirana",
    role: "Science Stream, 2022",
    avatar: "SP",
    content: "The career recommendations were spot on! I wasn't sure about my path after A/Ls, but this platform helped me discover biomedical engineering, which perfectly combines my love for biology and technology."
  },
  {
    name: "Dinesh Jayawardena",
    role: "Commerce Stream, 2021",
    avatar: "DJ",
    content: "I always thought banking was my only option with commerce subjects. This platform showed me diverse paths like digital marketing and data analytics that I hadn't considered. Now I'm studying business analytics!"
  },
  {
    name: "Tharushi Fernando",
    role: "Technology Stream, 2020",
    avatar: "TF",
    content: "The educational resources section was invaluable. It connected me with scholarship opportunities I wouldn't have found otherwise. Now I'm studying software engineering at University of Moratuwa on a full scholarship!"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What Students Say</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary-100 text-primary-600">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
