import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, User, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
      
      <div className="container relative px-4">
        <div className="mx-auto max-w-4xl text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white/20 hover:bg-white/30">
            <Sparkles className="mr-1 h-3 w-3" />
            Start Your Journey Today
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students and universities already using EduConnect Global 
            to make international education dreams come true.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="group bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/signup?type=student')}
            >
              <User className="mr-2 h-5 w-5" />
              Get Started as Student
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="group border-2 border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-sm transition-all duration-300"
              onClick={() => navigate('/signup?type=university')}
            >
              <Building2 className="mr-2 h-5 w-5" />
              Join as University
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-2xl font-bold mb-1">Free to Start</div>
              <div className="text-white/80 text-sm">No hidden costs or setup fees</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold mb-1">24/7 Support</div>
              <div className="text-white/80 text-sm">Get help whenever you need it</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold mb-1">Global Network</div>
              <div className="text-white/80 text-sm">Connect across 150+ countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}