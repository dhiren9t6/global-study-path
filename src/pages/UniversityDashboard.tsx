import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileDialog } from "@/components/dashboard/ProfileDialog";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Plus, 
  Building2, 
  Users,
  Eye,
  BookmarkCheck,
  TrendingUp,
  BarChart3,
  Edit,
  Trash2,
  Globe,
  ExternalLink,
  Clock,
  Target,
  Award,
  Activity,
  Calendar
} from "lucide-react";

// Mock data
const mockPrograms = [
  {
    id: 1,
    name: "Master of Computer Science",
    level: "Master's",
    duration: "2 years",
    tuition: "$25,000/year",
    intake: "Fall 2024",
    deadline: "March 15, 2024",
    applications: 156,
    views: 2341
  },
  {
    id: 2,
    name: "Bachelor of Business Administration",
    level: "Bachelor's",
    duration: "4 years",
    tuition: "$18,000/year",
    intake: "Fall 2024",
    deadline: "May 1, 2024",
    applications: 89,
    views: 1834
  }
];

// Real-time analytics data - more dynamic and engaging
const generateRealTimeMetrics = () => ({
  totalViews: Math.floor(Math.random() * 1500) + 3500,
  totalApplications: Math.floor(Math.random() * 75) + 180,
  savedByStudents: Math.floor(Math.random() * 30) + 40,
  conversionRate: (Math.random() * 3 + 3.5).toFixed(1),
  weeklyViews: Math.floor(Math.random() * 300) + 100,
  newApplicationsToday: Math.floor(Math.random() * 15) + 5,
  topProgram: ["Computer Science", "Business Administration", "Engineering", "Data Science"][Math.floor(Math.random() * 4)],
  studentEngagement: (Math.random() * 20 + 70).toFixed(1)
});

export default function UniversityDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(generateRealTimeMetrics());
  const [showAddProgram, setShowAddProgram] = useState(false);
  
  // Update analytics every 10 seconds for real-time feel
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateRealTimeMetrics());
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  const [newProgram, setNewProgram] = useState({
    name: "",
    level: "",
    duration: "",
    tuition: "",
    intake: "",
    deadline: "",
    description: "",
    requirements: "",
    scholarships: ""
  });

  const handleAddProgram = () => {
    // Handle adding new program
    setShowAddProgram(false);
    setNewProgram({
      name: "",
      level: "",
      duration: "",
      tuition: "",
      intake: "",
      deadline: "",
      description: "",
      requirements: "",
      scholarships: ""
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">University Dashboard</h1>
          <p className="text-muted-foreground">Manage your programs and track student interest</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="glass border-border/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300">Total Views</p>
                  <p className="text-2xl font-bold text-blue-600">{metrics.totalViews.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-300/20">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-emerald-500">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-300">Applications</p>
                  <p className="text-2xl font-bold text-emerald-600">{metrics.totalApplications}</p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-lg border border-emerald-300/20">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-emerald-500">+8% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300">Saved by Students</p>
                  <p className="text-2xl font-bold text-purple-600">{metrics.savedByStudents}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-300/20">
                  <BookmarkCheck className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-emerald-500">+15% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-300">Conversion Rate</p>
                  <p className="text-2xl font-bold text-amber-600">{metrics.conversionRate}%</p>
                </div>
                <div className="p-3 bg-amber-500/20 rounded-lg border border-amber-300/20">
                  <BarChart3 className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-emerald-500">+2% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Programs Management */}
          <div className="lg:col-span-2">
            <Card className="glass border-border/50 bg-gradient-to-br from-indigo-500/5 to-blue-500/5">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2 text-indigo-600">
                      <Building2 className="h-5 w-5" />
                      <span>Programs</span>
                    </CardTitle>
                    <CardDescription className="text-indigo-400">Manage your course offerings and programs</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddProgram(true)} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Program
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPrograms.map((program) => (
                    <Card key={program.id} className="glass border-border/50 bg-gradient-to-r from-white/10 to-blue-50/10">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg text-slate-700">{program.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <Badge variant="outline" className="border-blue-200 text-blue-600">{program.level}</Badge>
                              <span className="text-slate-600">{program.duration}</span>
                              <span className="text-emerald-600 font-medium">{program.tuition}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="hover:bg-blue-100/50">
                              <Edit className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-red-100/50">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                            <p className="text-xs text-blue-400 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Intake
                            </p>
                            <p className="text-sm font-medium text-blue-600">{program.intake}</p>
                          </div>
                          <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                            <p className="text-xs text-amber-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Deadline
                            </p>
                            <p className="text-sm font-medium text-amber-600">{program.deadline}</p>
                          </div>
                          <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                            <p className="text-xs text-purple-400 flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              Views
                            </p>
                            <p className="text-sm font-medium text-purple-600">{program.views}</p>
                          </div>
                          <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                            <p className="text-xs text-emerald-400 flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              Applications
                            </p>
                            <p className="text-sm font-medium text-emerald-600">{program.applications}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Analytics */}
          <div className="space-y-6">
            {/* Institution Profile */}
            <Card className="glass border-border/50 bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-emerald-600">
                  <Globe className="h-5 w-5" />
                  <span>Institution Profile</span>
                </CardTitle>
                <CardDescription className="text-emerald-400">Manage your university profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 border-2 border-dashed border-emerald-200 rounded-lg bg-emerald-50/30">
                  <Building2 className="h-12 w-12 mx-auto mb-2 text-emerald-500" />
                  <p className="text-sm font-medium text-emerald-700">University Logo</p>
                  <p className="text-xs text-emerald-500">Upload your institution logo</p>
                  <Button variant="outline" size="sm" className="mt-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                    Upload Logo
                  </Button>
                </div>
                <ProfileDialog 
                  trigger={
                    <Button variant="outline" className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  }
                  userType="university"
                />
                <Button variant="outline" className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Public Profile
                </Button>
              </CardContent>
            </Card>

            {/* Real-time Analytics */}
            <Card className="glass border-border/50 bg-gradient-to-br from-violet-500/5 to-purple-500/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-violet-600">
                  <Activity className="h-5 w-5" />
                  <span>Live Analytics</span>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between p-2 bg-violet-50/50 rounded border border-violet-100">
                    <span className="text-sm text-violet-600 flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      This Week
                    </span>
                    <span className="text-sm font-medium text-violet-700">{metrics.weeklyViews} views</span>
                  </div>
                  <div className="flex justify-between p-2 bg-blue-50/50 rounded border border-blue-100">
                    <span className="text-sm text-blue-600 flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      Today's Applications
                    </span>
                    <span className="text-sm font-medium text-blue-700">{metrics.newApplicationsToday} new</span>
                  </div>
                  <div className="flex justify-between p-2 bg-amber-50/50 rounded border border-amber-100">
                    <span className="text-sm text-amber-600 flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Top Program
                    </span>
                    <span className="text-sm font-medium text-amber-700">{metrics.topProgram}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-emerald-50/50 rounded border border-emerald-100">
                    <span className="text-sm text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Engagement Rate
                    </span>
                    <span className="text-sm font-medium text-emerald-700">{metrics.studentEngagement}%</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-violet-200 text-violet-600 hover:bg-violet-50"
                  onClick={() => navigate('/analytics')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Full Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Program Modal (simplified for demo) */}
        {showAddProgram && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Add New Program</CardTitle>
                <CardDescription>Create a new course offering for your institution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="programName">Program Name</Label>
                    <Input
                      id="programName"
                      placeholder="e.g., Master of Computer Science"
                      value={newProgram.name}
                      onChange={(e) => setNewProgram(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select onValueChange={(value) => setNewProgram(prev => ({ ...prev, level: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelor">Bachelor's</SelectItem>
                        <SelectItem value="master">Master's</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select onValueChange={(value) => setNewProgram(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6 months">6 months</SelectItem>
                        <SelectItem value="1 year">1 year</SelectItem>
                        <SelectItem value="1.5 years">1.5 years</SelectItem>
                        <SelectItem value="2 years">2 years</SelectItem>
                        <SelectItem value="3 years">3 years</SelectItem>
                        <SelectItem value="4 years">4 years</SelectItem>
                        <SelectItem value="5 years">5 years</SelectItem>
                        <SelectItem value="6 years">6 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tuition">Tuition Fees</Label>
                    <Select onValueChange={(value) => setNewProgram(prev => ({ ...prev, tuition: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tuition range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$5,000-$10,000/year">$5,000-$10,000/year</SelectItem>
                        <SelectItem value="$10,000-$15,000/year">$10,000-$15,000/year</SelectItem>
                        <SelectItem value="$15,000-$20,000/year">$15,000-$20,000/year</SelectItem>
                        <SelectItem value="$20,000-$25,000/year">$20,000-$25,000/year</SelectItem>
                        <SelectItem value="$25,000-$30,000/year">$25,000-$30,000/year</SelectItem>
                        <SelectItem value="$30,000-$40,000/year">$30,000-$40,000/year</SelectItem>
                        <SelectItem value="$40,000-$50,000/year">$40,000-$50,000/year</SelectItem>
                        <SelectItem value="$50,000+/year">$50,000+/year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Program Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the program, curriculum, and key features..."
                    rows={4}
                    value={newProgram.description}
                    onChange={(e) => setNewProgram(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddProgram(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProgram}>
                    Add Program
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}