import Image from "next/image";
import Link from "next/link";
import RegistrationTabs from "@/components/auth/registerTabs";

export default function RegistrationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4 py-8">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-background shadow-lg md:grid-cols-2">

        {/* LEFT */}
        <div className="p-8 md:p-10">
          
          <p className="p-3 text-center text-green-500 font-semibold ">Already have an account go to login</p>
        
          <div className="mb-8 flex rounded-lg border p-1">
            
            <Link
              href="/login"
             className="flex w-full items-center justify-center rounded-lg border border-primary bg-primary/5 px-2 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
            >
              Login
            </Link>

          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              Join SwasthyaPro 🚀
            </h1>
            <p className="text-sm text-muted-foreground">
              Register as a Doctor or Hospital and start managing patients online.
            </p>
          </div>

          <RegistrationTabs />
        </div>

        {/* RIGHT */}
        <div className="relative hidden md:block">
          <Image
            src="/image-hospital.png"
            alt="Healthcare Platform"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex h-full flex-col justify-center p-10 text-white">
            <h2 className="text-4xl font-bold leading-tight">
              SwasthyaPro
              <br />
              Registration Portal
            </h2>

            <p className="mt-4 text-sm text-white/90">
              Connect patients with trusted healthcare providers.
              Manage appointments, consultations, and hospital services from a single platform.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              <li>✔ Doctor Registration</li>
              <li>✔ Hospital Registration</li>
              <li>✔ Online Consultations</li>
              <li>✔ Appointment Management</li>
              <li>✔ Secure Healthcare Platform</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}