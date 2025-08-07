import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileDialog } from "@/components/dashboard/ProfileDialog";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Brain, 
  Filter,
  MapPin,
  DollarSign,
  Calendar,
  Star,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  GraduationCap,
  User,
  Settings
} from "lucide-react";

// Mock data
const mockUniversities = [
  {
    id: 1,
    name: "University of Toronto",
    location: "Toronto, Canada",
    tuition: "$45,000",
    ranking: "#18 Global",
    program: "Computer Science",
    deadline: "Jan 15, 2025",
    match: 95,
    logo: "🍁",
    saved: false
  },
  {
    id: 2,
    name: "ETH Zurich",
    location: "Zurich, Switzerland",
    tuition: "$1,200",
    ranking: "#8 Global",
    program: "Computer Science",
    deadline: "Dec 15, 2024",
    match: 92,
    logo: "🇨🇭",
    saved: true
  },
  {
    id: 3,
    name: "University of Melbourne",
    location: "Melbourne, Australia",
    tuition: "$42,000",
    ranking: "#33 Global",
    program: "Computer Science",
    deadline: "Oct 31, 2024",
    match: 88,
    logo: "🇦🇺",
    saved: false
  }
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([
    { name: "Academic Transcripts", status: "uploaded", file: "transcripts.pdf" },
    { name: "CV/Resume", status: "uploaded", file: "resume.pdf" },
    { name: "IELTS Score", status: "pending", file: null },
    { name: "Personal Statement", status: "pending", file: null },
    { name: "Letters of Recommendation", status: "pending", file: null }
  ]);

  const [filters, setFilters] = useState({
    country: "",
    budget: [50000],
    program: "",
    intake: ""
  });

  const [savedUniversities, setSavedUniversities] = useState(new Set([2]));

  const toggleSave = (id: number) => {
    const newSaved = new Set(savedUniversities);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedUniversities(newSaved);
  };

  const profileCompleteness = 65;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.user_metadata?.full_name || 'Student'}!
          </h1>
          <p className="text-muted-foreground">Continue your journey to global education</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Profile & Documents */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card className="shadow-medium border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Profile Completion</span>
                </CardTitle>
                <CardDescription>Complete your profile to get better recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{profileCompleteness}%</span>
                  </div>
                  <Progress value={profileCompleteness} className="h-2" />
                </div>
                <ProfileDialog 
                  trigger={
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Complete Profile
                    </Button>
                  }
                  userType="student"
                />
              </CardContent>
            </Card>

            {/* Document Upload */}
            <Card className="shadow-medium border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Documents</span>
                </CardTitle>
                <CardDescription>Upload and manage your application documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/50">
                    <div className="flex items-center space-x-3">
                      {doc.status === "uploaded" ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        {doc.file && (
                          <p className="text-xs text-muted-foreground">{doc.file}</p>
                        )}
                      </div>
                    </div>
                    {doc.status === "pending" && (
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Recommendations */}
            <Card className="shadow-medium border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-secondary" />
                  <span>AI Recommendations</span>
                </CardTitle>
                <CardDescription>Universities matched to your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="recommended" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="recommended">Recommended</TabsTrigger>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                    <TabsTrigger value="applied">Applied</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="recommended" className="space-y-4 mt-6">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4" />
                        <span className="text-sm font-medium">Filters:</span>
                      </div>
                      
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                          <SelectItem value="germany">Germany</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="flex items-center space-x-2">
                        <Label className="text-sm">Budget: ${filters.budget[0].toLocaleString()}</Label>
                        <Slider
                          value={filters.budget}
                          onValueChange={(value) => setFilters(prev => ({ ...prev, budget: value }))}
                          max={100000}
                          min={5000}
                          step={5000}
                          className="w-32"
                        />
                      </div>
                    </div>

                    {/* University Cards */}
                    <div className="space-y-4">
                      {mockUniversities.map((uni) => (
                        <Card key={uni.id} className="hover:shadow-medium transition-all duration-300 border-border/50">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-start space-x-4">
                                <div className="text-3xl">{uni.logo}</div>
                                <div>
                                  <h3 className="font-semibold text-lg">{uni.name}</h3>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="h-3 w-3" />
                                      <span>{uni.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Star className="h-3 w-3" />
                                      <span>{uni.ranking}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" className="bg-success/10 text-success">
                                  {uni.match}% Match
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => toggleSave(uni.id)}
                                >
                                  {savedUniversities.has(uni.id) ? (
                                    <BookmarkCheck className="h-4 w-4 text-accent" />
                                  ) : (
                                    <Bookmark className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-muted-foreground">Program</p>
                                <p className="text-sm font-medium">{uni.program}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Tuition</p>
                                <p className="text-sm font-medium">{uni.tuition}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Deadline</p>
                                <p className="text-sm font-medium">{uni.deadline}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" className="flex-1">
                                  Apply Now
                                </Button>
                                <Button size="sm" variant="outline">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="saved" className="space-y-4 mt-6">
                    <div className="text-center py-8 text-muted-foreground">
                      <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>You have {savedUniversities.size} saved universities</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="applied" className="space-y-4 mt-6">
                    <div className="text-center py-8 text-muted-foreground">
                      <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No applications yet. Start applying to your dream universities!</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}