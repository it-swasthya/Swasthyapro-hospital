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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Appointment } from "@/app/data/appointment";
import {
  getAllAllottedAppointments,
  getAllAllottedDoctorAppointments,
  getDoctorAppointments,
} from "@/app/services/appointment/appointment.service";
import { mapApiAppointmentToUI } from "@/app/utils/mapAppointment";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogPortal, // ADD THIS
} from "@/components/ui/dialog";
import AppointmentDialog from "./appointment/AppointmentDialog";
import { log } from "node:console";
import CompletedActions from "./appointment/CompletedActions";
import { fetchProtectedData } from "@/app/services/wrapper/authentication";

/* ============================
   STATUS STYLE
============================ */
const statusVariant = (status: string) => {
  switch (status) {
    case "Allotted":
      return "success";
    case "Scheduled":
      return "warning";
    case "Completed":
      return "info";
    default:
      return "destructive";
  }
};

const AppointmentTable = () => {
  const [data, setData] = React.useState<Appointment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<any>([]);

  /* dialog state */
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState<"accept" | "reject" | null>(null);
  const [openSheet, setOpenSheet] = React.useState(false);

  // const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [selectedAppointment, setSelectedAppointment] =
    React.useState<Appointment | null>(null);

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

  /* ============================
       FETCH DATA
    ============================ */

  React.useEffect(() => {
    let isMounted = true;

    

    const loadData = async () => {
      try {
       

       const res= await fetchProtectedData(`https://api.swasthyapro.com/api/appointment/consult/doctor/allotted/appointment?hospital_name=`);


        console.log(res?.data , "reposso o")

        const appointments = res?.data || [];

        console.log(appointments, "appointments");


        const mappedData = mapApiAppointmentToUI(appointments);
        console.log(mappedData, "mapped data ");

        if (isMounted) setData(mappedData);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ============================
       ACTION HANDLER
    ============================ */
  const handleUpdateStatus = (id: string, status: string) => {
    console.log("Update:", id, status);
    // call API here later
  };

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
      { accessorKey: "patientName", header: "Patient Name" },
      { accessorKey: "contact", header: "Contact" },
      { accessorKey: "symptoms", header: "Symptoms" },
      { accessorKey: "speciality", header: "Speciality" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "timeSlot", header: "Time Slot" },
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
        cell: ({ row }) => {
          const { status, id } = row.original;

          return (
            <div className="flex gap-2">
              {row.original.status === "Allotted" ? (
                <>
                  <Button
                    size="sm"
                    onClick={() => openDialog(row.original, "accept")}
                  >
                    Accept
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => openDialog(row.original, "reject")}
                  >
                    Reject
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedAppointment(row.original);
                    setOpenSheet(row.original.status !== "Cancelled");
                  }}
                >
                  View
                </Button>
              )}
            </div>
          );
        },
      },
    ],
    [],
  );

  const openDialog = (appointment: Appointment, type: "accept" | "reject") => {
    setSelectedAppointment(appointment);
    setAction(type);
    setOpen(true);
  };

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

  const handleConfirm = async () => {
    if (!selectedAppointment || !action) return;

    const newStatus = action === "accept" ? "Scheduled" : "Cancelled";

    setData((prev) =>
      prev.map((apt) =>
        apt.id === selectedAppointment.id ? { ...apt, status: newStatus } : apt,
      ),
    );
    setSelectedAppointment(null);
    setAction(null);
    setOpen(false);
  };

  return (
    <>
      {/* TABLE */}
      <div className="space-y-4">
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
                      row.original.status == "Cancelled"
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
                    No appointments found for handle accept or reject.
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
                        variant={
                          statusVariant(selectedAppointment.status) as any
                        }
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
                        <p className="font-medium">
                          {selectedAppointment.date}
                        </p>
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
                    <p className="text-xs text-muted-foreground mb-1">
                      Symptoms
                    </p>
                    <p className="text-sm">{selectedAppointment.symptoms}</p>
                  </div>
{/* 
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
                         )} */}

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

        <AppointmentDialog
          open={open}
          setOpen={setOpen}
          action={action}
          selectedAppointment={selectedAppointment}
          handleConfirm={handleConfirm}
        />
      </div>
    </>
  );
};

export default AppointmentTable;
