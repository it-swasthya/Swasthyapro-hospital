import Image from "next/image"
import LoginTabs from "@/components/auth/LoginTabs"

export default function LoginPage() {
  return (
    <div className="min-h-screen  flex items-center justify-center bg-muted/40 px-4 ">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-background shadow-lg md:grid-cols-2">
        
        {/* LEFT - Login */}
        <div className="p-8 md:p-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              Welcome Back 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Login to manage appointments and consultations
            </p>
          </div>

          <LoginTabs />
        </div>

        {/* RIGHT - Image */}
        <div className="relative hidden md:block">
          {/* Background Image */}
          <Image
            src="/image-hospital.png"
            alt="Hospital Dashboard"
            fill
            className="object-cover"
            priority
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-center p-10 text-white">
            <h2 className="text-3xl font-bold leading-tight">
              SwasthyaPro
              <br />
              Hospital Platform
            </h2>

            <p className="mt-4 text-sm text-white/90">
              Secure video consultations, appointment management,
              and hospital dashboards — all in one place.
            </p>

            <ul className="mt-6 space-y-2 text-sm">
              <li>✔ Video Consult Requests</li>
              <li>✔ Doctor & Hospital Dashboards</li>
              <li>✔ Secure Patient Management</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}
