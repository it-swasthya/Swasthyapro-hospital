"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { DoctorStatusBadge } from "@/components/common/doctor-status-badge"
import type { DoctorCard as DoctorCardType } from "@/app/data/doctor-card"
import { Star } from "lucide-react"


export function DoctorCard({ doctor }: { doctor: DoctorCardType }) {
    return (
        <Card className="hover:shadow-md transition">
            <CardContent className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        {doctor.avatar ? (
                            <AvatarImage src={doctor.avatar} />
                        ) : (
                            <AvatarFallback>
                                {doctor.name.charAt(0)}
                            </AvatarFallback>
                        )}
                    </Avatar>

                    <div className="flex-1">
                        <p className="font-semibold">
                            {doctor.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {doctor.speciality}
                        </p>
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, index) => {
                                const roundedRating = Math.round(doctor.rating)

                                return (
                                    <Star
                                        key={index}
                                        className={`h-4 w-4 ${index < roundedRating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-muted-foreground"
                                            }`}
                                    />
                                )
                            })}

                            <span className="ml-1 text-sm text-muted-foreground">
                                {doctor.rating.toFixed(1)}
                            </span>
                        </div>


                    </div>

                    {/* <DoctorStatusBadge status={doctor.status} /> */}

                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-md bg-muted p-3 text-center">
                        <p className="text-xs text-muted-foreground">
                            Total Consult
                        </p>
                        <p className="text-lg font-semibold">
                            {doctor.completedAppointments}
                        </p>
                    </div>

                    <div className="rounded-md bg-muted p-3 text-center">
                        <p className="text-xs text-muted-foreground">
                            Pending
                        </p>
                        <p className="text-lg font-semibold">
                            {doctor.pendingAppointments}
                        </p>
                    </div>
                      <div className="rounded-md bg-muted p-3 text-center">
                        <p className="text-xs text-muted-foreground">
                            Rejected
                        </p>
                        <p className="text-lg font-semibold">
                            {doctor.pendingAppointments}
                        </p>
                    </div>
                      <div className="rounded-md bg-muted p-3 text-center">
                        <p className="text-xs text-muted-foreground">
                            Accepted
                        </p>
                        <p className="text-lg font-semibold">
                            {doctor.pendingAppointments}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
