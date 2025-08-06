import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Computer Science Student",
    university: "University of Toronto",
    country: "Canada",
    avatar: "/api/placeholder/150/150",
    rating: 5,
    text: "EduConnect Global made my dream of studying in Canada a reality. The AI recommendations were spot-on, and the application process was so much smoother than I expected.",
    flag: "🇨🇦"
  },
  {
    name: "Ahmed Hassan",
    role: "Business Administration",
    university: "London School of Economics",
    country: "United Kingdom",
    avatar: "/api/placeholder/150/150",
    rating: 5,
    text: "I was overwhelmed by the choices until I found this platform. The personalized suggestions helped me find the perfect MBA program that aligned with my career goals.",
    flag: "🇬🇧"
  },
  {
    name: "Maria Rodriguez",
    role: "Engineering Student",
    university: "TU Delft",
    country: "Netherlands",
    avatar: "/api/placeholder/150/150",
    rating: 5,
    text: "The document management system saved me so much time. Having everything organized in one place made applying to multiple universities effortless.",
    flag: "🇳🇱"
  },
  {
    name: "Dr. James Wilson",
    role: "Admissions Director",
    university: "Melbourne University",
    country: "Australia",
    avatar: "/api/placeholder/150/150",
    rating: 5,
    text: "Since joining EduConnect Global, we've seen a 40% increase in qualified international applications. The platform helps us reach students who are genuinely interested in our programs.",
    flag: "🇦🇺",
    isUniversity: true
  },
  {
    name: "Priya Sharma",
    role: "Medicine Student",
    university: "Karolinska Institute",
    country: "Sweden",
    avatar: "/api/placeholder/150/150",
    rating: 5,
    text: "The scholarship finder feature helped me discover funding opportunities I never knew existed. I'm now studying medicine in Sweden with a full scholarship!",
    flag: "🇸🇪"
  },
  {
    name: "Prof. Erik Müller",
    role: "International Relations",
    university: "ETH Zurich",
    country: "Switzerland",
    avatar: "/api/placeholder/150/150",
    rating: 5,
    text: "The analytics dashboard gives us valuable insights into student preferences and market trends. It's become an essential tool for our international recruitment strategy.",
    flag: "🇨🇭",
    isUniversity: true
  }
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) {
  return (
    <Card 
      className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
      style={{
        animationDelay: `${index * 150}ms`,
        animation: 'fade-in 0.6s ease-out forwards'
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-foreground truncate">{testimonial.name}</h4>
              <span className="text-xl">{testimonial.flag}</span>
            </div>
            <p className="text-sm text-muted-foreground truncate">{testimonial.role}</p>
            <p className="text-xs text-muted-foreground truncate">{testimonial.university}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <div className="flex space-x-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          {testimonial.isUniversity && (
            <Badge variant="secondary" className="text-xs">
              University Partner
            </Badge>
          )}
        </div>

        <div className="relative">
          <Quote className="absolute -top-1 -left-1 h-6 w-6 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground leading-relaxed pl-6 italic">
            "{testimonial.text}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            <Star className="mr-1 h-3 w-3" />
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Students and Universities Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who've found their dream universities and institutions 
            that have expanded their global reach through our platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">Trusted by leading institutions worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Mock university logos - would be real ones in production */}
            <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs font-medium">
              Harvard
            </div>
            <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs font-medium">
              Oxford
            </div>
            <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs font-medium">
              MIT
            </div>
            <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs font-medium">
              Stanford
            </div>
            <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs font-medium">
              Cambridge
            </div>
            <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs font-medium">
              ETH Zurich
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}