"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Mail, Phone, ArrowUpRight, XIcon } from "lucide-react"

export function SupportHospitalForm() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">
          Get in Touch with <span className="font-bold bg-green-200 p-2 rounded-b-lg">SWASTHYAPRO</span> Team
        </h1>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* First Name */}
        <div>
          <Label>First Name</Label>
          <Input placeholder="Enter First Name" />
        </div>

        {/* Last Name */}
        <div>
          <Label>Last Name</Label>
          <Input placeholder="Enter Last Name" />
        </div>

        {/* Email */}
        <div>
          <Label>Email</Label>
          <Input placeholder="Enter your Email" />
        </div>

        {/* Phone */}
        <div>
          <Label>Phone Number</Label>
          <div className="flex gap-2">
            <Button variant="outline" className="px-3">
              🇮🇳
            </Button>
            <Input placeholder="Enter Phone Number" />
          </div>
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <Label>Message</Label>
          <Textarea
            placeholder="Enter your Message"
            className="min-h-35"
          />
        </div>
      </div>

      {/* Terms + Send */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <Checkbox />
          <span className="text-sm text-muted-foreground">
            I agree with Terms of Use and Privacy Policy
          </span>
        </div>

        <Button className="rounded-full px-8">
          Send
        </Button>
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-1 gap-6 border-t pt-6 md:grid-cols-2">
        {/* Support */}
        <div>
          <h3 className="mb-2 font-semibold">
            General Inquiries/Support
          </h3>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              support@swasthyapro.com
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>

            <Button variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              +91 7838109906
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-2 font-semibold">
            Connect with Us
          </h3>

          <div className="flex gap-3">
            <Button variant="outline">
                <XIcon/>
            </Button>
            <Button variant="outline">f</Button>
            <Button variant="outline">in</Button>
            <Button variant="outline">📸</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
