import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Building2, 
  Users,
  Eye,
  BookmarkCheck,
  TrendingUp,
  BarChart3,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Globe
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

const mockMetrics = {
  totalViews: 4175,
  totalApplications: 245,
  savedByStudents: 67,
  conversionRate: 5.9
};

export default function UniversityDashboard() {
  const [showAddProgram, setShowAddProgram] = useState(false);
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
          <Card className="shadow-medium border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{mockMetrics.totalViews.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold">{mockMetrics.totalApplications}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">+8% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saved by Students</p>
                  <p className="text-2xl font-bold">{mockMetrics.savedByStudents}</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg">
                  <BookmarkCheck className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">+15% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">{mockMetrics.conversionRate}%</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-success" />
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">+2% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Programs Management */}
          <div className="lg:col-span-2">
            <Card className="shadow-medium border-border/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5" />
                      <span>Programs</span>
                    </CardTitle>
                    <CardDescription>Manage your course offerings and programs</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddProgram(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Program
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPrograms.map((program) => (
                    <Card key={program.id} className="border-border/50">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{program.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <Badge variant="outline">{program.level}</Badge>
                              <span>{program.duration}</span>
                              <span>{program.tuition}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Intake</p>
                            <p className="text-sm font-medium">{program.intake}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Deadline</p>
                            <p className="text-sm font-medium">{program.deadline}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Views</p>
                            <p className="text-sm font-medium">{program.views}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Applications</p>
                            <p className="text-sm font-medium">{program.applications}</p>
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
            <Card className="shadow-medium border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Institution Profile</span>
                </CardTitle>
                <CardDescription>Manage your university profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 border-2 border-dashed border-border rounded-lg">
                  <Building2 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">University Logo</p>
                  <p className="text-xs text-muted-foreground">Upload your institution logo</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Upload Logo
                  </Button>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full">
                  View Public Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Analytics */}
            <Card className="shadow-medium border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">This Week</span>
                    <span className="text-sm font-medium">127 views</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">New Applications</span>
                    <span className="text-sm font-medium">8 applications</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Top Program</span>
                    <span className="text-sm font-medium">Computer Science</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
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
                    <Input
                      id="duration"
                      placeholder="e.g., 2 years"
                      value={newProgram.duration}
                      onChange={(e) => setNewProgram(prev => ({ ...prev, duration: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tuition">Tuition</Label>
                    <Input
                      id="tuition"
                      placeholder="e.g., $25,000/year"
                      value={newProgram.tuition}
                      onChange={(e) => setNewProgram(prev => ({ ...prev, tuition: e.target.value }))}
                    />
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