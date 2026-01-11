"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, ShieldCheck, HelpCircle } from "lucide-react";

import { loginDoctor, loginHospital } from "@/app/lib/auth";

export default function LoginTabs() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [doctor, setDoctor] = useState({
    email: "",
    password: "",
    secretKey: "",

  });

  const [hospital, setHospital] = useState({
    email: "",
    password: "",
    secretKey: "",
  });
  const handleDoctorLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await loginDoctor(doctor);

      // ✅ store token
      localStorage.setItem("accessToken", res.accessToken);
      document.cookie = `accessToken=${res.accessToken}; path=/;`;

      router.push("/doctor/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Doctor login failed");
    } finally {
      setLoading(false);
    }
  };


  const handleHospitalLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await loginHospital(hospital);

      // ✅ store token
      localStorage.setItem("accessToken", res.accessToken);
      document.cookie = `accessToken=${res.accessToken}; path=/;`;

      router.push("/hospital/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Hospital login failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Tabs defaultValue="doctor" className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="doctor">Doctor</TabsTrigger>
        <TabsTrigger value="hospital">Hospital</TabsTrigger>
      </TabsList>

      {error && (
        <div className="mb-4 text-sm text-red-600 text-center">
          {error}
        </div>
      )}

      {/* Doctor */}
      <TabsContent value="doctor">
        <Card className="border-none shadow-none p-4">
          <CardHeader className="px-0">
            <CardTitle>Doctor Login</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 px-0">
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  placeholder="doctor@email.com"
                  value={doctor.email}
                  onChange={(e) =>
                    setDoctor({ ...doctor, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={doctor.password}
                  onChange={(e) =>
                    setDoctor({ ...doctor, password: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Secret Key</Label>
                <Input
                  placeholder="Enter hospital secret key"
                  value={doctor.secretKey}
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      secretKey: e.target.value,
                    })
                  }

                />
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
                onClick={handleDoctorLogin}
              >
                {loading ? "Logging in..." : "Login as Doctor"}
              </Button>
            </div>

            <HelpBlock />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Hospital */}
      <TabsContent value="hospital">
        <Card className="border-none shadow-none p-4">
          <CardHeader className="px-0">
            <CardTitle>Hospital Login</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 px-0">
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  placeholder="hospital@email.com"
                  value={hospital.email}
                  onChange={(e) =>
                    setHospital({ ...hospital, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={hospital.password}
                  onChange={(e) =>
                    setHospital({ ...hospital, password: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Secret Key</Label>
                <Input
                  placeholder="Enter hospital secret key"
                  value={hospital.secretKey}
                  onChange={(e) =>
                    setHospital({
                      ...hospital,
                      secretKey: e.target.value,
                    })
                  }
                />
              </div>

              <Button
                variant="destructive"
                className="w-full"
                disabled={loading}
                onClick={handleHospitalLogin}
              >
                {loading ? "Logging in..." : "Login as Hospital"}
              </Button>
            </div>

            <HelpBlock />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function HelpBlock() {
  return (
    <>
      <div className="text-sm text-muted-foreground space-y-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          <span>Need help logging in?</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>Contact SwasthyaPro support</span>
        </div>
      </div>

      <Separator />

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4" />
        <span>Your login is securely encrypted.</span>
      </div>
    </>
  );
}
