"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/app/data/appointment";
import { updateAppointmentStatus } from "../../../app/services/appointment/appointment.service";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  action: "accept" | "reject" | null;
  selectedAppointment: Appointment | null;
  handleConfirm: () => void;
  loading: boolean;
};

export default function AppointmentDialog({
  open,
  setOpen,
  action,
  selectedAppointment,
  handleConfirm,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
 const [getDoctorName, setGetDoctorName] = useState<string | null>(null);


  useEffect(() => {
    setMounted(true);
     const doctorName = localStorage.getItem("user_name");
      setGetDoctorName("Dr. Ashish Gupta");
    
  }, []);

  if (!mounted) return null;

  const handleConfirmClick = async () => {
    if (!selectedAppointment || !action) return;

    if (!getDoctorName) {
    alert("Doctor name not found");
    return;
  }

    try {
      setLoading(true);

      const appointmentId = selectedAppointment.id;

      const res = await updateAppointmentStatus(appointmentId, action, getDoctorName );


      console.log("STATUS UPDATED:", res);

      setOpen(false);
      handleConfirm(); 
    } catch (err: any) {
      alert(err?.response?.data?.message || err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="z-50 max-w-md">
        <DialogHeader>
          <DialogTitle>
            {action === "accept" ? "Accept Appointment" : "Reject Appointment"}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>

        {selectedAppointment && (
          <div className="space-y-2 rounded-md border p-3 text-sm">
            <p><b>Patient:</b> {selectedAppointment.patientName}</p>
            <p><b>Contact:</b> {selectedAppointment.contact}</p>
            <p><b>Symptoms:</b> {selectedAppointment.symptoms}</p>
            <p><b>Date:</b> {selectedAppointment.date}</p>
            <p><b>Time:</b> {selectedAppointment.timeSlot}</p>
            <p className="text-xs text-gray-500">
              <b>Appointment ID:</b> {selectedAppointment.id}
            </p>
          </div>
        )}

        <DialogFooter>
          <Button onClick={handleConfirmClick} disabled={loading}>
            {loading
              ? "Processing..."
              : action === "accept"
              ? "Accept"
              : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



