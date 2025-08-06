import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Globe, 
  Users, 
  BookOpen, 
  Star,
  Play
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const stats = [
    { label: "Universities", value: "2,500+", icon: BookOpen },
    { label: "Countries", value: "150+", icon: Globe },
    { label: "Students Helped", value: "50K+", icon: Users },
    { label: "Success Rate", value: "94%", icon: Star }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/5 to-accent/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
      
      <div className="container relative px-4 py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge className="mb-6 bg-accent/10 text-accent-foreground border-accent/20 hover:bg-accent/20 transition-smooth">
            <Globe className="mr-1 h-3 w-3" />
            Global Education Platform
          </Badge>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Your Gateway to{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Global Education
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Discover universities worldwide, get AI-powered recommendations, and apply with confidence. 
            Turn your study abroad dreams into reality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-primary hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/signup?type=student')}
              onMouseEnter={() => setHoveredButton('student')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <span className="relative z-10 flex items-center">
                Start Your Journey
                <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                  hoveredButton === 'student' ? 'translate-x-1' : ''
                }`} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="group border-2 bg-background/50 backdrop-blur-sm hover:bg-secondary hover:border-secondary hover:text-secondary-foreground transition-all duration-300"
              onClick={() => navigate('/signup?type=university')}
              onMouseEnter={() => setHoveredButton('university')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <span className="flex items-center">
                For Universities
                <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                  hoveredButton === 'university' ? 'translate-x-1' : ''
                }`} />
              </span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto max-w-3xl">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="group p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card hover:shadow-medium transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fade-in 0.6s ease-out forwards'
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Preview (Mock) */}
          <div className="mt-16 relative">
            <div className="mx-auto max-w-4xl">
              <div className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-secondary/20 aspect-video">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/60 flex items-center justify-center">
                  <div className="flex flex-col items-center text-white">
                    <div className="mb-4 p-4 rounded-full bg-white/20 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <Play className="h-8 w-8" />
                    </div>
                    <p className="text-lg font-medium">Watch How It Works</p>
                    <p className="text-sm opacity-90">See students find their dream universities</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}