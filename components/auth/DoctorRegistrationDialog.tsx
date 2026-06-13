"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import DoctorRegistrationForm from "./DoctorRegistrationForm";

interface DoctorRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DoctorRegistrationDialog({
  open,
  onOpenChange,
}: DoctorRegistrationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Doctor Registration</DialogTitle>
        </DialogHeader>

        <DoctorRegistrationForm />
      </DialogContent>
    </Dialog>
  );
}