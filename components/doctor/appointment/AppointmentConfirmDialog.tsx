"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import type { Appointment } from "@/app/data/appointment";
import { Spinner } from "@/components/ui/spinner";

interface AppointmentConfirmDialogProps {
  open: boolean;
  type: "accept" | "reject";
  appointment: Appointment | null;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const AppointmentConfirmDialog = ({
  open,
  type,
  appointment,
  loading = false,
  onConfirm,
  onClose,
}: AppointmentConfirmDialogProps) => {
  if (!appointment) return null;

  const isAccept = type === "accept";

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isAccept ? "Accept Appointment" : "Reject Appointment"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            Please review the appointment details before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* DETAILS */}
        <div className="space-y-3 rounded-md border p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Patient</span>
            <span className="font-medium">{appointment.patientName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Appointment ID</span>
            <span className="font-medium">{appointment.id}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">{appointment.date}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Time Slot</span>
            <span className="font-medium">{appointment.timeSlot}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Speciality</span>
            <span className="font-medium">{appointment.speciality}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Hospital</span>
            <span className="font-medium">{appointment.hospital}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Action</span>
            <Badge variant={isAccept ? "success" : "destructive"}>
              {isAccept ? "Schedule" : "Cancel"}
            </Badge>
          </div>
        </div>

        {/* WARNING TEXT */}
        <p className="text-sm text-muted-foreground">
          {isAccept
            ? "This appointment will be marked as Scheduled and the patient will be notified."
            : "This appointment will be cancelled and highlighted in red."}
        </p>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <Spinner className="h-4 w-4" />
                Processing...
              </div>
            ) : (
              "Confirm"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppointmentConfirmDialog;
