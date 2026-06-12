// import Image from "next/image";
// import Link from "next/link";
// import LoginTabs from "@/components/auth/LoginTabs";

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
//       <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-background shadow-lg md:grid-cols-2">

//         {/* LEFT - Login */}
//         <div className="p-8 md:p-10">
//           <div className="mb-6">
//              {/* Registration CTA */}
//           <div className="">
//             <p className="mb-3 text-center text-sm text-muted-foreground">
//               Don't have an account?
//             </p>

//             <Link
//               href="/register"
//               className="flex w-full items-center justify-center rounded-lg border border-primary bg-primary/5 px-2 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
//             >
//               Register as Doctor or Hospital
//             </Link>
//           </div>
//             <h1 className=" mt-3 text-2xl font-bold">
//               Welcome Back 👋
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               Login to manage appointments and consultations
//             </p>
//           </div>

//           <LoginTabs />

         
//         </div>

//         {/* RIGHT - Image */}
//         <div className="relative hidden md:block">
//           <Image
//             src="/image-hospital.png"
//             alt="Hospital Dashboard"
//             fill
//             className="object-cover"
//             priority
//           />

//           <div className="absolute inset-0 bg-black/50" />

//           <div className="relative z-10 flex h-full flex-col justify-center p-10 text-white">
//             <h2 className="text-3xl font-bold leading-tight">
//               SwasthyaPro
//               <br />
//               Hospital Platform
//             </h2>

//             <p className="mt-4 text-sm text-white/90">
//               Secure video consultations, appointment management,
//               and hospital dashboards — all in one place.
//             </p>

//             <ul className="mt-6 space-y-2 text-sm">
//               <li>✔ Video Consult Requests</li>
//               <li>✔ Doctor & Hospital Dashboards</li>
//               <li>✔ Secure Patient Management</li>
//             </ul>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }



"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginTabs from "@/components/auth/LoginTabs";
import RegistrationTabs from "@/components/auth/registerTabs";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-background shadow-lg rounded-2xl overflow-hidden">

        {/* LEFT SIDE */}
        <div className="p-8 space-y-6">

          <Tabs defaultValue="login" className="w-full">

            {/* TAB HEADER */}
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* ================= LOGIN TAB ================= */}
            <TabsContent value="login" className="mt-6 space-y-4">

              {/* EXTRA CONTENT */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">
                  Welcome Back 👋
                </h1>

                <p className="text-sm text-muted-foreground">
                  Login to manage appointments, patients, and hospital operations securely.
                </p>

              </div>

              {/* LOGIN FORM */}
              <LoginTabs />

              {/* EXTRA LOGIN BENEFITS */}
              <div className="text-xs text-muted-foreground space-y-1 pt-2">
                <p>✔ Fast appointment access</p>
                <p>✔ Real-time consultation tracking</p>
                <p>✔ Doctor & hospital dashboard</p>
              </div>

            </TabsContent>

            {/* ================= REGISTER TAB ================= */}
            <TabsContent value="register" className="mt-6 space-y-4">

              {/* EXTRA CONTENT */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">
                  Join SwasthyaPro 🚀
                </h1>

                <p className="text-sm text-muted-foreground">
                  Create your account as a Doctor or Hospital and start managing patients digitally.
                </p>
              </div>

              {/* REGISTER FORM */}
              <RegistrationTabs />

              {/* EXTRA FEATURES */}
              <div className="text-xs text-muted-foreground space-y-1 pt-2">
                <p>✔ Free hospital onboarding</p>
                <p>✔ Doctor profile verification</p>
                <p>✔ Online consultation system</p>
              </div>

            </TabsContent>

          </Tabs>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden md:block relative">

          <img
            src="/image-hospital.png"
            className="object-cover w-full h-full"
          />

          <div className="absolute inset-0 bg-black/50" />

          {/* OVERLAY TEXT */}
          <div className="absolute inset-0 flex flex-col justify-center p-10 text-white">

            <h2 className="text-3xl font-bold">
              SwasthyaPro Platform
            </h2>

            <p className="mt-4 text-sm text-white/90">
              Secure healthcare management system for hospitals and doctors.
            </p>

            <ul className="mt-6 space-y-2 text-sm">
              <li>✔ Appointment Management</li>
              <li>✔ Doctor Allocation System</li>
              <li>✔ Patient Records Security</li>
              <li>✔ Online Consultations</li>
            </ul>

          </div>

        </div>

      </div>
    </div>
  );
}