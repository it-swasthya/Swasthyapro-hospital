"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorRegistrationForm from "./DoctorRegistrationForm";
import HospitalRegistrationForm from "./HospitalRegistrationForm";

export default function RegistrationTabs() {
  return (
    <Tabs defaultValue="doctor" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="doctor">
          Doctor
        </TabsTrigger>

        <TabsTrigger value="hospital">
          Hospital
        </TabsTrigger>
      </TabsList>

      <TabsContent value="doctor" className="mt-6">
        <DoctorRegistrationForm />
      </TabsContent>

      <TabsContent value="hospital" className="mt-6">
        <HospitalRegistrationForm />
      </TabsContent>
    </Tabs>
  );
}