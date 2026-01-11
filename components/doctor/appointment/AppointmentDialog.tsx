"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Appointment } from "@/app/data/appointment"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  action: "accept" | "reject" | null
  selectedAppointment: Appointment | null
  handleConfirm: () => void
}

export default function AppointmentDialog({
  open,
  setOpen,
  action,
  selectedAppointment,
  handleConfirm,
}: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

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
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
