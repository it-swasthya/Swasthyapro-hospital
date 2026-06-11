"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { DoctorCard as DoctorCardType } from "@/app/data/doctor-card";
import { Star } from "lucide-react";

export function DoctorCard({
  doctor,
}: {
  doctor: DoctorCardType;
}) {
  return (
    <Card className="transition hover:shadow-md">
      <CardContent className="space-y-4 p-5">
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
              {doctor.designation}
            </p>

            {/* Rating */}
            <div className="mt-1 flex items-center gap-1">
              {Array.from({ length: 5 }).map(
                (_, index) => {
                  const roundedRating =
                    Math.round(
                      doctor.rating
                    );

                  return (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index <
                        roundedRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  );
                }
              )}

              <span className="ml-1 text-sm text-muted-foreground">
                {doctor.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Active Status */}
          <div
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              doctor.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {doctor.isActive
              ? "Active"
              : "Inactive"}
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-muted p-3">
            <p className="text-xs text-muted-foreground">
              Availability
            </p>
            <p className="font-sm">
              {doctor.availability}
            </p>
          </div>

          <div className="rounded-md bg-muted p-3">
            <p className="text-xs text-muted-foreground">
              Status
            </p>
            <p className="font-sm">
              {doctor.isActive
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          <div className="rounded-md bg-muted p-3">
            <p className="text-xs text-muted-foreground">
              Working Hours
            </p>
            <p className="font-medium text-sm">
              {doctor.workingHours}
            </p>
          </div>

          <div className="rounded-md bg-muted p-3">
            <p className="text-xs text-muted-foreground">
              Designation
            </p>
            <p className="font-medium text-sm">
              {doctor.designation}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}