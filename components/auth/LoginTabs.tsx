"use client"

import { useRouter } from "next/navigation"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, ShieldCheck, HelpCircle } from "lucide-react"

export default function LoginTabs() {
  const router = useRouter()

  return (
    <Tabs defaultValue="doctor" className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="doctor">Doctor</TabsTrigger>
        <TabsTrigger value="hospital">Hospital</TabsTrigger>
      </TabsList>

      {/* ================= Doctor ================= */}
      <TabsContent value="doctor">
        <Card className="border-none shadow-none p-4">
          <CardHeader className="px-0">
            <CardTitle>Doctor Login</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 px-0">
            {/* Form */}
            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input placeholder="doctor@email.com" />
              </div>

              <div className="space-y-1">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => router.push("/doctor/dashboard")}
              >
                Login as Doctor
              </Button>
            </div>

            {/* Help */}
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>
                  Can’t remember your credentials?
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>
                  Contact the SwasthyaPro support team
                </span>
              </div>
            </div>

            <Separator />

            {/* Security note */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span>
                Your login is secured with industry-standard encryption.
              </span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ================= Hospital ================= */}
      <TabsContent value="hospital">
        <Card className="border-none shadow-none p-4">
          <CardHeader className="px-0">
            <CardTitle>Hospital Login</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 px-0">
            {/* Form */}
            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input placeholder="hospital@email.com" />
              </div>

              <div className="space-y-1">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>

              <Button
                className="w-full"
                variant="destructive"
                onClick={() => router.push("/hospital/dashboard")}
              >
                Login as Hospital
              </Button>
            </div>

            {/* Help */}
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>
                  Trouble accessing your hospital account?
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>
                  Reach out to SwasthyaPro support
                </span>
              </div>
            </div>

            <Separator />

            {/* Security note */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span>
                Hospital data is protected under strict security standards.
              </span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
