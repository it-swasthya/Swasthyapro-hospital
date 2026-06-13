"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  MapPin,
  Stethoscope,
  Award,
  Building2,
  Calendar,
  Users,
  BadgeCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface DoctorProfile {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    contact: string;
    gender: string;
    age: number;
    address: string;
  };
  doctor: {
    specialty: string;
    registration_number: string;
    experience: number;
    hospitals: string[];
    status: string;
  };
}

function InfoItem({
  icon,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-medium leading-tight">{value}</p>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default function DoctorProfilePage() {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("user_doctor_id");
        if (!userId) return;
        const { data } = await axios.get(
          `https://api.swasthyapro.com/api/auth/get-user-id-role-doctor/${userId}`
        );
        if (data.success) {
          setProfile(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <ProfileSkeleton />;
  }

  const { user, doctor } = profile;
  const initials = `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase();
  const isActive = doctor.status?.toLowerCase() === "active";

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <Card className="overflow-hidden shadow-lg">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground py-2">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-20 w-20 border-4 border-white/30 bg-white/10 text-2xl">
              <AvatarFallback className="bg-transparent text-2xl font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold sm:text-3xl">
                Dr. {user.first_name} {user.last_name}
              </h1>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm font-medium text-primary-foreground/80 sm:justify-start">
                <Stethoscope className="h-4 w-4" />
                {doctor.specialty}
              </p>
            </div>

            <div className="sm:ml-auto">
              <Badge
                variant={isActive ? "default" : "secondary"}
                className={`gap-1.5 px-3 py-1 text-sm ${
                  isActive
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : ""
                }`}
              >
                <BadgeCheck className="h-4 w-4" />
                {doctor.status}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Personal Information
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <InfoItem icon={<Mail className="h-4 w-4" />} label="Email" value={user.email} />
            <InfoItem icon={<Phone className="h-4 w-4" />} label="Phone" value={user.contact} />
            <InfoItem icon={<Users className="h-4 w-4" />} label="Gender" value={user.gender} />
            <InfoItem icon={<Calendar className="h-4 w-4" />} label="Age" value={`${user.age} years`} />
            <InfoItem
              icon={<MapPin className="h-4 w-4" />}
              label="Address"
              value={user.address}
              className="sm:col-span-2"
            />
          </div>

          <Separator className="my-6" />

          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Professional Information
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <InfoItem icon={<Award className="h-4 w-4" />} label="Experience" value={`${doctor.experience} Years`} />
            <InfoItem icon={<BadgeCheck className="h-4 w-4" />} label="Registration No." value={doctor.registration_number} />
            <InfoItem
              icon={<Building2 className="h-4 w-4" />}
              label="Hospitals"
              value={doctor.hospitals.join(", ")}
              className="sm:col-span-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}