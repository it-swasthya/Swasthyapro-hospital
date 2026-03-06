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

import { Label } from "@/components/ui/label";

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
// import { SheetTitle } from "@/components/ui/sheet"

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
import { updateAppointmentStatus } from "@/app/services/appointment/appointment.service";

import type { Appointment } from "@/app/data/appointment";
// import { getDoctorAllAppointments } from "@/app/services/appointment/appointment.service";
import { mapApiAppointmentToUI } from "@/app/utils/mapAppointment";
import { apiFetch } from "@/app/services/wrapper/authentication";
import { api } from "@/app/lib/refresh-api";
import { getActiveUserAppointment } from "@/app/lib/appointment-apis";

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

const YourAppointmentTable = () => {
  const [data, setData] = React.useState<Appointment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<any>([]);
  const [openSheet, setOpenSheet] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    React.useState<Appointment | null>(null);

  const [confirmAction, setConfirmAction] = React.useState<{
    type: "accept" | "reject" | "complete";
    appointment: Appointment | null;
  } | null>(null);

  const [completeConfirm, setCompleteConfirm] = React.useState<{
    appointment: Appointment | null;
  } | null>(null);

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

  const normalizeStatus = (status?: string) => status?.trim().toLowerCase();

  React.useEffect(() => {
    const loadData = async () => {
      try {
        //const response = await getDoctorAllAppointments();

        // const response = await apiFetch(
        //   "/appointment/consult/doctor/all/appointment",
        // );

       const response = await  getActiveUserAppointment();

       console.log(response , "response ");
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
        accessorKey: "speciality",
        header: "Speciality",
      },
      {
        accessorKey: "hospital",
        header: "Hospital",
      },
      {
        accessorKey: "timeSlot",
        header: "Time Slot",
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
      {
        id: "updateStatus",
        header: "Update Status",
        cell: ({ row }) => {
          const status = normalizeStatus(row.original.status);

          return (
            <Button
              size="sm"
              variant="outline"
              disabled={status !== "scheduled"}
              onClick={(e) => {
                e.stopPropagation();
                setCompleteConfirm({ appointment: row.original });
              }}
            >
            {row?.original?.status === "Completed" ? ".." : "Mark As Completed" }
            </Button>
          );
        },
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
      <div className="rounded-md border p-6 text-center text-muted-foreground">
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

        <AlertDialog
          open={!!completeConfirm}
          onOpenChange={() => setCompleteConfirm(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Mark as Completed?</AlertDialogTitle>
              <AlertDialogDescription>
                This will mark the consultation as completed.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction
                onClick={async () => {
                  if (!completeConfirm?.appointment) return;

                  const apt = completeConfirm.appointment;

                  await updateAppointmentStatus(
                    apt.id,
                    "complete", 
                    apt.doctorName ?? "",
                  );

                  // row update
                  setData((prev) =>
                    prev.map((a) =>
                      a.id === apt.id ? { ...a, status: "Completed" } : a,
                    ),
                  );

                  // sheet update
                  setSelectedAppointment((prev) =>
                    prev?.id === apt.id
                      ? { ...prev, status: "Completed" }
                      : prev,
                  );

                  setCompleteConfirm(null);
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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
                    <div>
                      <p className="text-muted-foreground">Speaciality</p>
                      <p className="font-medium">
                        {selectedAppointment.speciality}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Hospital</p>
                      <p className="font-medium">
                        {selectedAppointment.hospital}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SYMPTOMS */}
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground mb-1">Symptoms</p>
                  <p className="text-sm">{selectedAppointment.symptoms}</p>
                </div>

                {selectedAppointment.status === "Allotted" && (
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
                )}

                {selectedAppointment.status === "Scheduled" && (
                  <div className="space-y-4 rounded-lg border p-4 bg-muted/40">
                    <h4 className="font-medium">Upcoming Consultation</h4>

                    {/* Time Slot */}
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">
                          Date:
                        </span>{" "}
                        {selectedAppointment.date}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Time:
                        </span>{" "}
                        {selectedAppointment.timeSlot}
                      </p>
                    </div>

                    {/* Google Meet Link */}
                    {selectedAppointment?.meet_link ? (
                      <Button
                        className="w-full"
                        onClick={() =>
                          window.open(selectedAppointment.meet_link, "_blank")
                        }
                      >
                        Join Google Meet
                      </Button>
                    ) : (
                      <p className="text-sm text-destructive">
                        Google Meet link will available soon
                      </p>
                    )}
                  </div>
                )}

                {selectedAppointment.status === "Completed" && (
                  <>
                    {hasValidPrescription(selectedAppointment) ? (
                      <ViewPrescriptionCard appointment={selectedAppointment} />
                    ) : (
                      <CompletedActions
                        appointmentId={selectedAppointment.id}
                        onSuccess={(response) => {
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
                                  prescription_link: updated.prescription_link,
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

            <AlertDialog
              open={!!confirmAction}
              onOpenChange={() => setConfirmAction(null)}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {confirmAction?.type === "accept"
                      ? "Accept Appointment?"
                      : "Reject Appointment?"}
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    {confirmAction?.type === "accept"
                      ? "This appointment will be marked as Scheduled."
                      : "This appointment will be cancelled and highlighted in red."}
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    onClick={async () => {
                      if (!confirmAction?.appointment) return;

                      const { id, doctorName } = confirmAction.appointment;

                      try {
                        await updateAppointmentStatus(
                          id,
                          confirmAction.type,
                          doctorName ?? "",
                        );

                        const newStatus =
                          confirmAction.type === "accept"
                            ? "Scheduled"
                            : "Cancelled";

                        //  Update table
                        setData((prev) =>
                          prev.map((apt) =>
                            apt.id === id ? { ...apt, status: newStatus } : apt,
                          ),
                        );
                        //  Update sheet
                        setSelectedAppointment((prev) =>
                          prev ? { ...prev, status: newStatus } : prev,
                        );

                        setOpenSheet(false);
                      } catch (error) {
                        console.error("Status update failed", error);
                        // optional: toast.error("Failed to update status")
                      } finally {
                        setConfirmAction(null);
                      }
                    }}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

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
      </div>
    </div>
  );
};

export default YourAppointmentTable;
