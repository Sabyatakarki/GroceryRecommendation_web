"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../_components/header";
import Footer from "../_components/footer";
import { User,Mail,Activity,ShieldAlert, Heart, Flame, Dumbbell, Scale, Camera,LogOut,Save,Loader2} from "lucide-react";

const API_URL = "http://localhost:5001/api/users";

interface UserProfile {
  fullName: string;
  email: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  activityLevel: string;
  fitnessGoal: string;
  dietaryPreference: string;
  allergies: string[];
  healthConditions: string[];
  bmi: number;
  recommendedCalories: number;
  recommendedProtein: number;
  profileImage: string;
}

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<UserProfile>({
    fullName: "",
    email: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    activityLevel: "",
    fitnessGoal: "",
    dietaryPreference: "",
    allergies: [],
    healthConditions: [],
    bmi: 0,
    recommendedCalories: 0,
    recommendedProtein: 0,
    profileImage: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("grocery_token");

    if (!token) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetchProfile(user.id);
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const token = localStorage.getItem("grocery_token");

      const response = await fetch(`${API_URL}/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      setFormData({
        fullName: result.data.fullName || "",
        email: result.data.email || "",
        age: result.data.age || 0,
        gender: result.data.gender || "",
        height: result.data.height || 0,
        weight: result.data.weight || 0,
        activityLevel: result.data.activityLevel || "",
        fitnessGoal: result.data.fitnessGoal || "",
        dietaryPreference: result.data.dietaryPreference || "",
        allergies: result.data.allergies || [],
        healthConditions: result.data.healthConditions || [],
        bmi: result.data.bmi || 0,
        recommendedCalories: result.data.recommendedCalories || 0,
        recommendedProtein: result.data.recommendedProtein || 0,
        profileImage: result.data.profileImage || "",
      });

      if (result.data.profileImage) {
        setImagePreview(`http://localhost:5001/uploads/profiles/${result.data.profileImage}`);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch profile.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" || name === "height" || name === "weight" ? Number(value) : value,
    }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("grocery_token");
      const form = new FormData();

      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("age", String(formData.age));
      form.append("gender", formData.gender);
      form.append("height", String(formData.height));
      form.append("weight", String(formData.weight));
      form.append("activityLevel", formData.activityLevel);
      form.append("fitnessGoal", formData.fitnessGoal);
      form.append("dietaryPreference", formData.dietaryPreference);
      form.append("allergies", formData.allergies.join(","));
      form.append("healthConditions", formData.healthConditions.join(","));

      if (selectedImage) {
        form.append("profileImage", selectedImage);
      }

      const response = await fetch(`${API_URL}/profile/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      localStorage.setItem("user", JSON.stringify(result.data));
      alert("Profile updated successfully.");
      setSaving(false);
    } catch (err: any) {
      console.log(err);
      alert(err.message);
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("grocery_token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-between">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#556b2f]" />
          <p className="text-stone-500 font-bold tracking-wider text-xs uppercase">Loading Your Account Profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-5xl mx-auto px-6 py-10">
          
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#e2eae0] pb-6 mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">My Profile</h1>
              <p className="text-sm font-medium text-stone-500">Configure your physiological biometrics and baseline preferences.</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-rose-700 font-bold text-xs uppercase tracking-wider transition"
            >
              <LogOut size={14} /> Logout Account
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Sidebar: Photo and Targets Output Cards */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile Image Card */}
              <div className="bg-white border border-[#e2eae0] rounded-[24px] p-6 text-center shadow-sm">
                <div className="relative w-28 h-28 mx-auto mb-4 group">
                  <div className="w-full h-full rounded-full overflow-hidden bg-stone-100 border-2 border-[#e2eae0] flex items-center justify-center relative">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-stone-300" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 p-2 bg-[#556b2f] hover:bg-[#465927] text-white rounded-full cursor-pointer shadow-md transition transform hover:scale-105">
                    <Camera size={14} />
                    <input type="file" onChange={handleImage} className="hidden" accept="image/*" />
                  </label>
                </div>
                <h3 className="font-extrabold text-stone-900 text-lg">{formData.fullName || "Your Name"}</h3>
                <p className="text-xs text-stone-400 font-medium truncate mt-0.5">{formData.email}</p>
              </div>

              {/* Targets and Computational Outputs */}
              <div className="bg-white border border-[#e2eae0] rounded-[24px] p-5 shadow-sm space-y-3.5">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-xs uppercase tracking-wider border-b border-stone-100 pb-2.5">
                  <Activity size={14} className="text-[#556b2f]" />
                  <span>Computed Biological Target</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#faf9f5] border border-stone-100 rounded-xl">
                    <div className="flex items-center gap-2 text-stone-600 font-medium text-xs">
                      <Scale size={14} className="text-stone-400" />
                      <span>Body Mass Index (BMI)</span>
                    </div>
                    <span className="text-sm font-black text-stone-900">{formData.bmi}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-amber-50/60 border border-amber-100 rounded-xl">
                    <div className="flex items-center gap-2 text-amber-800 font-medium text-xs">
                      <Flame size={14} className="text-amber-500" />
                      <span>Target Energy Limit</span>
                    </div>
                    <span className="text-sm font-black text-amber-900">{formData.recommendedCalories} kcal</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl">
                    <div className="flex items-center gap-2 text-indigo-800 font-medium text-xs">
                      <Dumbbell size={14} className="text-indigo-500" />
                      <span>Target Protein Cap</span>
                    </div>
                    <span className="text-sm font-black text-indigo-900">{formData.recommendedProtein} g</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Account and Target Configuration Forms */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Basic and Biometrics Card */}
              <div className="bg-white border border-[#e2eae0] rounded-[24px] p-6 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <User size={16} className="text-[#556b2f]" />
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-900">Physiological Demographics</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                      />
                      <User size={14} className="absolute left-3.5 top-3.5 text-stone-400" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                      />
                      <Mail size={14} className="absolute left-3.5 top-3.5 text-stone-400" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Age (Years)</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age || ""}
                      onChange={handleChange}
                      placeholder="Age"
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-4 py-2.5 text-sm font-medium text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Biological Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-3 py-2.5 text-sm font-medium text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height || ""}
                      onChange={handleChange}
                      placeholder="Height in cm"
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-4 py-2.5 text-sm font-medium text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight || ""}
                      onChange={handleChange}
                      placeholder="Weight in kg"
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-4 py-2.5 text-sm font-medium text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences and Goals Card */}
              <div className="bg-white border border-[#e2eae0] rounded-[24px] p-6 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                  <Activity size={16} className="text-[#556b2f]" />
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-900">Dietary & Fitness Profiling</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Activity Index</label>
                    <select
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleChange}
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-3 py-2.5 text-sm font-medium text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                    >
                      <option value="">Activity Level</option>
                      <option>Sedentary</option>
                      <option>Lightly Active</option>
                      <option>Moderately Active</option>
                      <option>Very Active</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Fitness Target</label>
                    <select
                      name="fitnessGoal"
                      value={formData.fitnessGoal}
                      onChange={handleChange}
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-3 py-2.5 text-sm font-medium text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                    >
                      <option value="">Fitness Goal</option>
                      <option>Lose Weight</option>
                      <option>Maintain Weight</option>
                      <option>Gain Weight</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Dietary Orientation</label>
                    <select
                      name="dietaryPreference"
                      value={formData.dietaryPreference}
                      onChange={handleChange}
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-3 py-2.5 text-sm font-medium text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                    >
                      <option value="">Dietary Preference</option>
                      <option>Vegetarian</option>
                      <option>Vegan</option>
                      <option>Non-Vegetarian</option>
                    </select>
                  </div>
                </div>

                {/* Exclusions Array Inputs */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldAlert size={12} className="text-rose-500" /> Food Allergy Disclaimers
                    </label>
                    <input
                      value={formData.allergies.join(",")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          allergies: e.target.value.split(",").map((a) => a.trim()),
                        })
                      }
                      placeholder="e.g., Peanuts, Dairy, Gluten"
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-4 py-2.5 text-sm font-medium text-stone-900 placeholder-stone-300 outline-none focus:border-[#556b2f] transition"
                    />
                    <p className="text-[10px] text-stone-400 font-medium">Delimit multiple variations with a comma (,)</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Heart size={12} className="text-rose-500" /> Monitored Health Conditions
                    </label>
                    <input
                      value={formData.healthConditions.join(",")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          healthConditions: e.target.value.split(",").map((a) => a.trim()),
                        })
                      }
                      placeholder="e.g., Diabetes, Hypertension"
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-4 py-2.5 text-sm font-medium text-stone-900 placeholder-stone-300 outline-none focus:border-[#556b2f] transition"
                    />
                    <p className="text-[10px] text-stone-400 font-medium">Delimit multiple variations with a comma (,)</p>
                  </div>
                </div>
              </div>

              {/* Interactive Save Button Trigger Component */}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-[#556b2f] hover:bg-[#465927] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-sm hover:shadow transition disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving Parameters...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Settings
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}