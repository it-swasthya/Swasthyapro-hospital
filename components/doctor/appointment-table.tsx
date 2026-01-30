"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import AllottedActions from "@/components/doctor/appointment/AllottedActions";
import CompletedActions from "@/components/doctor/appointment/CompletedActions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Appointment } from "@/app/data/appointment";
// import { getAllAllottedAppointments } from "@/app/services/appointment/appointment.service";
import { mapApiAppointmentToUI } from "@/app/utils/mapAppointment";
import { Input } from "../ui/input";
import { apiFetch } from "@/app/services/wrapper/authentication";
import { api } from "@/app/lib/refresh-api";
import { updateAppointmentStatus } from "@/app/services/appointment/appointment.service";
import AppointmentConfirmDialog from "./appointment/AppointmentConfirmDialog";
import { ActionResultDialog } from "./appointment/ResultDialog";
import { getDoctorAllhospitalAppointedData } from "@/app/lib/appointment-apis";

const statusVariant = (status: string) => {
  switch (status) {
    case "Allotted":
      return "success";
    case "Scheduled":
      return "warning";
    case "Completed":
      return "info";
    case "Cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

const AppointmentTable = () => {
  const [data, setData] = React.useState<Appointment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<any>([]);
  const [openSheet, setOpenSheet] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    React.useState<Appointment | null>(null);

  const [resultDialog, setResultDialog] = React.useState<{
    open: boolean;
    success: boolean;
    message: string;
  }>({
    open: false,
    success: true,
    message: "",
  });

  const [confirmAction, setConfirmAction] = React.useState<{
    type: "accept" | "reject";
    appointment: Appointment | null;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const statusColorClass = (status: string) => {
    switch (status) {
      case "Allotted":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Scheduled":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  React.useEffect(() => {
    const loadData = async () => {
      try {
        // const response = await apiFetch(
        //   `/appointment/consult/doctor/allotted/appointment?hospital_name=MASHH`,
        // );

        const response = await getDoctorAllhospitalAppointedData();


        console.log(response, "response data doctor AND HOSPITAL");


        const mappedData = mapApiAppointmentToUI(response?.data?.data || []);
        setData(mappedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const ViewPrescriptionCard = ({
    appointment,
  }: {
    appointment: Appointment;
  }) => {
    return (
      <div className="rounded-lg border bg-green-50 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-green-700">
          Consultation Report
        </h3>

        <div>
          <p className="text-xs text-muted-foreground">Diagnosis</p>
          <p className="text-sm font-medium">{appointment.diagnosis}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Advice</p>
          <p className="text-sm font-medium">{appointment.doctor_advice}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Prescription</p>
          <a
            href={appointment.prescription_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            View Prescription
          </a>
        </div>
      </div>
    );
  };

  const hasValidPrescription = (apt: Appointment) => {
    return (
      apt.status === "Completed" &&
      apt.diagnosis !== null &&
      apt.diagnosis !== "" &&
      apt.doctor_advice !== null &&
      apt.doctor_advice !== "" &&
      apt.prescription_link !== null &&
      apt.prescription_link !== ""
    );
  };

  /* ============================
       COLUMNS
    ============================ */
  const columns = React.useMemo<ColumnDef<Appointment>[]>(
    () => [
      {
        accessorKey: "patientName",
        header: "Patient Name",
      },
      {
        accessorKey: "contact",
        header: "Contact",
      },
      {
        accessorKey: "symptoms",
        header: "Symptoms",
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "timeSlot",
        header: "Time Slot",
      },
      {
        accessorKey: "speciality",
        header: "Speciality",
      },
      {
        accessorKey: "hospital",
        header: "Hospital",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue<string>();

          return (
            <Badge className={`border ${statusColorClass(status)}`}>
              {status}
            </Badge>
          );
        },
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedAppointment(row.original);
              setOpenSheet(row.original.status !== "Cancelled");
            }}
          >
            {row.original.status !== "Cancelled" ? "View" : "-"}
          </Button>
        ),
      },
    ],
    [],
  );

  /* ============================
       TABLE INSTANCE
    ============================ */
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  /* ============================
       LOADING STATE
    ============================ */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 gap-2 text-muted-foreground">
        <Spinner className="h-5 w-5" />
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* TABLE */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={
                    row.original.status === "Cancelled"
                      ? "bg-red-50 border-l-4 border-red-500"
                      : ""
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No appointments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>

        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetContent className="w-[520px] sm:w-[480px] p-0">
            {/* HEADER */}
            <VisuallyHidden>
              <SheetTitle>Appointment Details</SheetTitle>
            </VisuallyHidden>
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold">Appointment Details</h2>
              <p className="text-sm text-muted-foreground">
                Review patient information and take action
              </p>
            </div>

            {selectedAppointment && (
              <div className="space-y-6 px-6 py-5">
                {/* PATIENT INFO */}
                <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">
                      {selectedAppointment.patientName}
                    </h3>

                    <Badge
                      variant={statusVariant(selectedAppointment.status) as any}
                    >
                      {selectedAppointment.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Contact</p>
                      <p className="font-medium">
                        {selectedAppointment.contact}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">{selectedAppointment.date}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Time Slot</p>
                      <p className="font-medium">
                        {selectedAppointment.timeSlot}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SYMPTOMS */}
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground mb-1">Symptoms</p>
                  <p className="text-sm">{selectedAppointment.symptoms}</p>
                </div>

                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    Speciality
                  </p>
                  <p className="text-sm">{selectedAppointment.speciality}</p>
                </div>

                {/* hospital */}

                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground mb-1">Hospital</p>
                  <p className="text-sm">{selectedAppointment.hospital}</p>
                </div>

                {/* {selectedAppointment.status === "Allotted" && (
                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      onClick={() =>
                        setConfirmAction({
                          type: "accept",
                          appointment: selectedAppointment,
                        })
                      }
                    >
                      Accept
                    </Button>

                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() =>
                        setConfirmAction({
                          type: "reject",
                          appointment: selectedAppointment,
                        })
                      }
                    >
                      Reject
                    </Button>
                  </div>
                )} */}

                {selectedAppointment.status === "Allotted" && (
                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      disabled={isSubmitting} // ✅ ADD
                      onClick={() =>
                        setConfirmAction({
                          type: "accept",
                          appointment: selectedAppointment,
                        })
                      }
                    >
                      {isSubmitting && confirmAction?.type === "accept" ? (
                        <span className="flex items-center gap-2">
                          <Spinner className="h-4 w-4" />
                          Accepting...
                        </span>
                      ) : (
                        "Accept"
                      )}
                    </Button>

                    <Button
                      variant="destructive"
                      className="flex-1"
                      disabled={isSubmitting} // ✅ ADD
                      onClick={() =>
                        setConfirmAction({
                          type: "reject",
                          appointment: selectedAppointment,
                        })
                      }
                    >
                      {isSubmitting && confirmAction?.type === "reject" ? (
                        <span className="flex items-center gap-2">
                          <Spinner className="h-4 w-4" />
                          Rejecting...
                        </span>
                      ) : (
                        "Reject"
                      )}
                    </Button>
                  </div>
                )}

                {selectedAppointment && (
                  <div className="space-y-6 px-6 py-5">
                    {selectedAppointment.status === "Completed" && (
                      <>
                        {hasValidPrescription(selectedAppointment) ? (
                          <ViewPrescriptionCard
                            appointment={selectedAppointment}
                          />
                        ) : (
                          <CompletedActions
                            appointmentId={selectedAppointment.id}
                            onSuccess={(response: { data: any }) => {
                              const updated = response.data;

                              setData((prev) =>
                                prev.map((apt) =>
                                  apt.id === selectedAppointment.id
                                    ? {
                                        ...apt,
                                        status: "Completed",
                                        diagnosis: updated.diagnosis,
                                        doctor_advice: updated.doctor_advice,
                                        prescription_link:
                                          updated.prescription_link,
                                      }
                                    : apt,
                                ),
                              );

                              setSelectedAppointment((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      status: "Completed",
                                      diagnosis: updated.diagnosis,
                                      doctor_advice: updated.doctor_advice,
                                      prescription_link:
                                        updated.prescription_link,
                                    }
                                  : prev,
                              );
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* <AppointmentConfirmDialog
              open={!!confirmAction}
              type={confirmAction?.type as "accept" | "reject"}
              appointment={confirmAction?.appointment ?? null}
              onClose={() => setConfirmAction(null)}
              onConfirm={async () => {
                if (!confirmAction?.appointment) return;

                setIsSubmitting(true);

                const appointment = confirmAction.appointment;
                const isAccept = confirmAction.type === "accept";

                try {
                  await updateAppointmentStatus(
                    appointment.id,
                    confirmAction.type,
                    appointment.doctorName,
                  );

                  if (isAccept) {
                    await apiFetch(
                      "/mail/send-consultation-scheduled-confirmation-appointment",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          userName: appointment.patientName,
                          appointment_id: appointment.id,
                          allotted_doctor: appointment.assignedDoctor,
                          timeslot: appointment.timeSlot,
                          BookingDate: appointment.date,
                          meet_link: "https://meet.google.com/bob-rfcf-xjp",
                          userEmail: appointment.Email,
                        }),
                      },
                    );
                  }

                  const newStatus = isAccept ? "Scheduled" : "Cancelled";

                  setData((prev) =>
                    prev.map((apt) =>
                      apt.id === appointment.id
                        ? { ...apt, status: newStatus }
                        : apt,
                    ),
                  );

                  setSelectedAppointment((prev) =>
                    prev ? { ...prev, status: newStatus } : prev,
                  );

                  setOpenSheet(false);
                } catch (err) {
                  console.error("Failed to update appointment", err);
                } finally {
                  setIsSubmitting(false);
                  setConfirmAction(null);
                }
              }}
            /> */}

            <AppointmentConfirmDialog
              open={!!confirmAction}
              type={confirmAction?.type as "accept" | "reject"}
              appointment={confirmAction?.appointment ?? null}
              loading={isSubmitting} // ✅ ADD THIS
              onClose={() => {
                if (!isSubmitting) {
                  setConfirmAction(null);
                }
              }}
              onConfirm={async () => {
                if (!confirmAction?.appointment) return;

                setIsSubmitting(true);

                const appointment = confirmAction.appointment;
                const isAccept = confirmAction.type === "accept";

                try {
                  await updateAppointmentStatus(
                    appointment.id,
                    confirmAction.type,
                    appointment.doctorName,
                  );

                  if (isAccept) {
                  //   await apiFetch(
                  //     "/mail/send-consultation-scheduled-confirmation-appointment",
                  //     {
                  //       method: "POST",
                  //       body: JSON.stringify({
                  //         userName: appointment.patientName,
                  //         appointment_id: appointment.id,
                  //         allotted_doctor: appointment.assignedDoctor,
                  //         timeslot: appointment.timeSlot,
                  //         BookingDate: appointment.date,
                  //         meet_link: "https://meet.google.com/bob-rfcf-xjp",
                  //         userEmail: appointment.Email,
                  //       }),
                  //     },
                  //   );
                  // }

                     await api.post(
                      "/mail/send-consultation-scheduled-confirmation-appointment",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          userName: appointment.patientName,
                          appointment_id: appointment.id,
                          allotted_doctor: appointment.assignedDoctor,
                          timeslot: appointment.timeSlot,
                          BookingDate: appointment.date,
                          meet_link: "https://meet.google.com/bob-rfcf-xjp",
                          userEmail: appointment.Email,
                        }),
                      },
                    );
                  }

                  const newStatus = isAccept ? "Scheduled" : "Cancelled";

                  setData((prev) =>
                    prev.map((apt) =>
                      apt.id === appointment.id
                        ? { ...apt, status: newStatus }
                        : apt,
                    ),
                  );

                  setSelectedAppointment((prev) =>
                    prev ? { ...prev, status: newStatus } : prev,
                  );

                  setResultDialog({
                    open: true,
                    success: true,
                    message: isAccept
                      ? "Appointment accepted and email sent successfully."
                      : "Appointment rejected successfully.",
                  });

                  setOpenSheet(false);
                } catch (err) {
                  console.error("Failed to update appointment", err);

                  setResultDialog({
                    open: true,
                    success: false,
                    message: "Action completed, but email could not be sent.",
                  });
                } finally {
                  setIsSubmitting(false);
                  setConfirmAction(null);
                }
              }}
            />

            {/* FOOTER */}
            <div className="border-t px-6 py-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setOpenSheet(false)}
              >
                Close
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <ActionResultDialog
          open={resultDialog.open}
          success={resultDialog.success}
          message={resultDialog.message}
          onClose={() =>
            setResultDialog({ open: false, success: true, message: "" })
          }
        />
      </div>
    </div>
  );
};

export default AppointmentTable;
