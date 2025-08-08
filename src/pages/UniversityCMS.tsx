import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Building2, Calendar, Globe, Plus, Upload, X } from "lucide-react";

interface ProfileRow {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  website: string | null;
  logo_url: string | null;
  contact_email: string | null;
  phone: string | null;
  is_published: boolean;
}

interface ProgramRow {
  id: string;
  title: string;
  degree_level: string | null;
  duration: string | null;
  tuition_fee: string | null;
  description: string | null;
  delivery_mode: string | null;
  application_deadline: string | null; // ISO date
  is_published: boolean;
}

export default function UniversityCMS() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [programs, setPrograms] = useState<ProgramRow[]>([]);
  const [loading, setLoading] = useState(true);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "University CMS | EduConnect";
  }, []);

  const fetchAll = async () => {
    if (!user) return;
    setLoading(true);
    // Ensure a profile exists or create a placeholder
    const { data: existing } = await supabase
      .from("university_profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (!existing) {
      await supabase.from("university_profiles").insert({
        id: user.id,
        name: user.user_metadata?.institution || "Your Institution",
        contact_email: user.email,
        is_published: false,
      });
    }

    const { data: prof } = await supabase
      .from("university_profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
    setProfile(prof as ProfileRow | null);

    const { data: progs } = await supabase
      .from("university_programs")
      .select("*")
      .eq("university_id", user.id)
      .order("updated_at", { ascending: false });
    setPrograms((progs as ProgramRow[]) || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchAll();

    const channel = supabase
      .channel("cms-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "university_profiles", filter: `id=eq.${user?.id}` },
        () => fetchAll()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "university_programs", filter: `university_id=eq.${user?.id}` },
        () => fetchAll()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const handleProfileSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !profile) return;
    const { error } = await supabase
      .from("university_profiles")
      .update({
        name: profile.name,
        description: profile.description,
        location: profile.location,
        website: profile.website,
        contact_email: profile.contact_email,
        phone: profile.phone,
        is_published: profile.is_published,
      })
      .eq("id", user.id);

    if (error) {
      toast({ title: "Failed to save", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile saved" });
    }
  };

  const handleLogoUpload = async (file: File) => {
    if (!user) return;
    const ext = file.name.split(".").pop();
    const path = `${user.id}/logo-${Date.now()}.${ext}`;
    const { error: uploadErr } = await supabase.storage.from("universities").upload(path, file, {
      upsert: false,
      cacheControl: "3600",
    });
    if (uploadErr) {
      toast({ title: "Upload failed", description: uploadErr.message, variant: "destructive" });
      return;
    }
    const { data } = supabase.storage.from("universities").getPublicUrl(path);
    const publicUrl = data.publicUrl;
    await supabase.from("university_profiles").update({ logo_url: publicUrl }).eq("id", user.id);
    toast({ title: "Logo updated" });
  };

  const [newProgram, setNewProgram] = useState<Partial<ProgramRow>>({
    title: "",
    degree_level: "",
    duration: "",
    tuition_fee: "",
    description: "",
    delivery_mode: "",
    application_deadline: "",
    is_published: true,
  });

  const addProgram = async () => {
    if (!user || !newProgram.title) return;
    const { error } = await supabase.from("university_programs").insert({
      university_id: user.id,
      title: newProgram.title,
      degree_level: newProgram.degree_level,
      duration: newProgram.duration,
      tuition_fee: newProgram.tuition_fee,
      description: newProgram.description,
      delivery_mode: newProgram.delivery_mode,
      application_deadline: newProgram.application_deadline || null,
      is_published: newProgram.is_published ?? true,
    });
    if (error) {
      toast({ title: "Failed to add program", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Program added" });
      setNewProgram({ title: "", degree_level: "", duration: "", tuition_fee: "", description: "", delivery_mode: "", application_deadline: "", is_published: true });
    }
  };

  const deleteProgram = async (id: string) => {
    const { error } = await supabase.from("university_programs").delete().eq("id", id);
    if (error) {
      toast({ title: "Failed to delete", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Program deleted" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">University CMS</h1>
        <p className="text-muted-foreground mb-6">Manage your public profile and programs</p>

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Public Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSave} className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Institution Name</Label>
                    <Input value={profile?.name || ""} onChange={(e) => setProfile((p) => p && { ...p, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" value={profile?.website || ""} onChange={(e) => setProfile((p) => p && { ...p, website: e.target.value })} placeholder="https://example.edu" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Email</Label>
                    <Input value={profile?.contact_email || ""} onChange={(e) => setProfile((p) => p && { ...p, contact_email: e.target.value })} type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={profile?.phone || ""} onChange={(e) => setProfile((p) => p && { ...p, phone: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input value={profile?.location || ""} onChange={(e) => setProfile((p) => p && { ...p, location: e.target.value })} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Description</Label>
                    <Textarea value={profile?.description || ""} onChange={(e) => setProfile((p) => p && { ...p, description: e.target.value })} rows={4} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Logo</Label>
                    <div className="flex items-center gap-3">
                      {profile?.logo_url ? (
                        <img src={profile.logo_url} alt="logo" className="h-12 w-12 rounded object-cover" />
                      ) : (
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center"><Building2 className="h-5 w-5 text-muted-foreground" /></div>
                      )}
                      <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && handleLogoUpload(e.target.files[0])} />
                      <Button type="button" variant="outline" onClick={() => logoInputRef.current?.click()} className="inline-flex items-center"><Upload className="h-4 w-4 mr-2" /> Upload Logo</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:col-span-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{profile?.is_published ? "Published" : "Hidden"}</Badge>
                      <Button type="button" variant="ghost" onClick={() => setProfile((p) => p && { ...p, is_published: !p.is_published })}>
                        Toggle Publish
                      </Button>
                    </div>
                    <Button type="submit">Save Profile</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programs" className="mt-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Add New Program</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={newProgram.title || ""} onChange={(e) => setNewProgram((p) => ({ ...p, title: e.target.value }))} placeholder="e.g., Master of Computer Science" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Degree Level</Label>
                      <Input value={newProgram.degree_level || ""} onChange={(e) => setNewProgram((p) => ({ ...p, degree_level: e.target.value }))} placeholder="Bachelor / Master / PhD" />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input value={newProgram.duration || ""} onChange={(e) => setNewProgram((p) => ({ ...p, duration: e.target.value }))} placeholder="e.g., 2 years" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Tuition Fee</Label>
                      <Input value={newProgram.tuition_fee || ""} onChange={(e) => setNewProgram((p) => ({ ...p, tuition_fee: e.target.value }))} placeholder="e.g., $25,000/year" />
                    </div>
                    <div className="space-y-2">
                      <Label>Delivery Mode</Label>
                      <Input value={newProgram.delivery_mode || ""} onChange={(e) => setNewProgram((p) => ({ ...p, delivery_mode: e.target.value }))} placeholder="On-campus / Online / Hybrid" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Application Deadline</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="date" className="pl-9" value={newProgram.application_deadline || ""} onChange={(e) => setNewProgram((p) => ({ ...p, application_deadline: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={newProgram.description || ""} onChange={(e) => setNewProgram((p) => ({ ...p, description: e.target.value }))} rows={4} />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={addProgram} className="inline-flex items-center"><Plus className="h-4 w-4 mr-2" /> Add Program</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Your Programs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {programs.length === 0 && <p className="text-sm text-muted-foreground">No programs yet.</p>}
                  {programs.map((p) => (
                    <div key={p.id} className="p-4 rounded-lg border flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{p.title}</div>
                        <Button variant="ghost" size="icon" onClick={() => deleteProgram(p.id)}><X className="h-4 w-4" /></Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {[p.degree_level, p.duration, p.tuition_fee].filter(Boolean).join(" • ")}
                      </div>
                      <Badge variant="outline">{p.is_published ? "Published" : "Hidden"}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
