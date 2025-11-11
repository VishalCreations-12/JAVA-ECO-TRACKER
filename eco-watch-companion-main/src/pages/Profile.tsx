import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Home,
  Award,
  TrendingUp,
  Leaf,
  Settings,
  Camera,
  Edit3
} from "lucide-react";
import { fetchUser, updateUser } from "../api/userService";

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    householdSize: "4",
    location: "Hyderabad, India",
    joinDate: "January 2024"
  });

  // Fetch user data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      setUserId(parsed.id);

      fetchUser(parsed.id)
        .then((data) => {
          setProfileData({
            name: data.name || "",
            email: data.email || "",
            householdSize: data.householdSize || "4",
            location: data.location || "Chennai, India",
            joinDate: data.joinDate || "January 2024"
          });
        })
        .catch((err) => {
          console.error("Failed to fetch user data:", err);
          setError("Could not load user data.");
        })
        .finally(() => setLoading(false));
    } catch (e) {
      console.error(e);
      setError("Invalid user data in localStorage.");
      setLoading(false);
    }
  }, []);

  const handleSave = async () => {
    if (!userId) return;

    try {
      // Only send name and email to backend
      const updated = await updateUser(userId, {
        name: profileData.name,
        email: profileData.email
      });

      // Keep frontend-only fields intact
      setProfileData(prev => ({
        ...prev,
        name: updated.name,
        email: updated.email
      }));

      setIsEditing(false);

      localStorage.setItem(
        "user",
        JSON.stringify({ id: updated.id, name: updated.name, email: updated.email })
      );

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast({
        title: "Update Failed",
        description: "Could not save changes. Try again.",
        variant: "destructive",
      });
    }
  };


  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const userStats = {
    totalSaved: "245 kWh",
    rank: "#3",
    streak: "12 days",
    badges: ["Energy Saver", "Eco Warrior", "Green Champion"]
  };

  const achievements = [
    { title: "First Week Complete", description: "Completed your first week of tracking", icon: "🏆", date: "Jan 15, 2024" },
    { title: "50% Target Achievement", description: "Stayed within 50% of your monthly target", icon: "🎯", date: "Jan 22, 2024" },
    { title: "Conservation Streak", description: "10 consecutive days under daily limit", icon: "🔥", date: "Feb 01, 2024" },
    { title: "Community Leader", description: "Reached top 5 in monthly leaderboard", icon: "👑", date: "Feb 10, 2024" }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <Button
          onClick={() => {
            if (isEditing) handleSave();
            else setIsEditing(true);
          }}
          variant={isEditing ? "default" : "outline"}
          className="gap-2"
        >
          {isEditing ? <Settings className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Manage your account details and household information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                    <AvatarFallback className="text-lg bg-gradient-to-br from-primary/20 to-success/20">
                      {profileData.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{profileData.name || "Unknown User"}</h3>
                  <p className="text-muted-foreground">Member since {profileData.joinDate}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["name", "email", "householdSize", "location"].map((field) => {
                  const label = field === "name" ? "Full Name" :
                                field === "email" ? "Email Address" :
                                field === "householdSize" ? "Household Size" :
                                "Location";
                  const Icon = field === "name" ? User :
                               field === "email" ? Mail :
                               field === "householdSize" ? Home : null;
                  return (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>{label}</Label>
                      {isEditing ? (
                        <Input
                          id={field}
                          value={(profileData as any)[field]}
                          onChange={(e) => setProfileData({ ...profileData, [field]: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                          <span>{(profileData as any)[field]}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-warning" />
                Achievements
              </CardTitle>
              <CardDescription>Your energy conservation milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {achievements.map((ach, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-success/5 border border-primary/10">
                    <div className="text-2xl">{ach.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{ach.title}</h4>
                      <p className="text-sm text-muted-foreground">{ach.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{ach.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats & Badges */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Your Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(userStats).map(([key, value]) => {
                if (key === "badges") return null;
                return (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {key === "totalSaved" ? "Total Energy Saved" :
                       key === "rank" ? "Current Rank" : "Conservation Streak"}
                    </span>
                    <span className={`font-semibold ${key === "streak" ? "text-warning" : "text-success"}`}>{value}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-success" />
                Earned Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userStats.badges.map((badge, i) => (
                  <Badge key={i} variant="outline" className="bg-gradient-to-r from-success/10 to-primary/10 border-success/20">{badge}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
