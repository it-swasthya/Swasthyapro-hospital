




"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Mail, Phone, ArrowUpRight, XIcon, Loader2 } from "lucide-react";
import { sendSupportMail } from "@/app/lib/appointment-apis";

export function SupportForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("Notice");

  const showDialog = (title: string, message: string) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!agree) {
      showDialog(
        "Terms Required",
        "Please agree to Terms of Use and Privacy Policy."
      );
      return;
    }

    if (!formData.firstName || !formData.email || !formData.message) {
      showDialog(
        "Missing Information",
        "First Name, Email and Message are required."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await sendSupportMail(formData);

      if (response?.success) {
        showDialog("Success", "Message sent successfully!");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });

        setAgree(false);
      } else {
        showDialog(
          "Error",
          response?.message || "Something went wrong."
        );
      }
    } catch (error: any) {
      showDialog(
        "Request Failed",
        error.message || "Failed to send message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">

      {/* Alert Dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setDialogOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">
          Get in Touch with{" "}
          <span className="font-bold bg-green-200 p-2 rounded-b-lg">
            SWASTHYAPRO
          </span>{" "}
          Team
        </h1>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label>First Name</Label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
          />
        </div>

        <div>
          <Label>Last Name</Label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
          />
        </div>

        <div>
          <Label>Phone Number</Label>
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="px-3">
              🇮🇳
            </Button>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <Label>Message</Label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your Message"
            className="min-h-35"
          />
        </div>
      </div>

      {/* Terms + Send */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={agree}
            onCheckedChange={(checked: boolean) => setAgree(checked)}
          />
          <span className="text-sm text-muted-foreground">
            I agree with Terms of Use and Privacy Policy
          </span>
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-full px-8"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send"
          )}
        </Button>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-1 gap-6 border-t pt-6 md:grid-cols-2">
        <div>

          
          <h3 className="mb-2 font-semibold">
           General Inquiries/Support
         </h3>

         
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                (window.location.href = "mailto:support@swasthyapro.com")
              }
            >
              <Mail className="mr-2 h-4 w-4" />
              support@swasthyapro.com
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                (window.location.href = "tel:+917838109906")
              }
            >
              <Phone className="mr-2 h-4 w-4" />
              +91 7838109906
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">Connect with Us</h3>

          <div className="flex gap-3">
            <a
              href="https://x.com/SwasthyaPro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="button" variant="outline">
                <XIcon />
              </Button>
            </a>

            <a
              href="https://www.facebook.com/share/1AVmURqUdc/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="button" variant="outline">
                f
              </Button>
            </a>

            <a
              href="https://www.linkedin.com/company/106878064/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="button" variant="outline">
                in
              </Button>
            </a>

            <a
              href="https://www.instagram.com/swasthya_pro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="button" variant="outline">
                📸
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
