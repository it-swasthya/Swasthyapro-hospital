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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Appointment } from "@/app/data/appointment";
import { getAllAppointmentDoctorLists } from "@/app/services/appointment/appointment.service";
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

  // const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [selectedAppointment, setSelectedAppointment] =
    React.useState<Appointment | null>(null);

  /* ============================
       FETCH DATA
    ============================ */
  React.useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const res = await getAllAppointmentDoctorLists();
        if (!isMounted) return;

        const mappedData = mapApiAppointmentToUI(res.allAppointments);
        setData(mappedData);
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
          return <Badge variant={statusVariant(status) as any}>{status}</Badge>;
        },
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
          const { status, id } = row.original;

          if (status !== "Allotted") {
            return <span className="text-muted-foreground">—</span>;
          }

          return (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => openDialog(row.original, "accept")}
              >
                Accept
              </Button>

              <Button
                variant="destructive"
                onClick={() => openDialog(row.original, "reject")}
              >
                Reject
              </Button>
            </div>
          );
        },
      },
    ],
    []
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
  const handleConfirm = () => {
    if (!selectedAppointment || !action) return;

    const newStatus = action === "accept" ? "Scheduled" : "Rejected";

    setData((prev) =>
      prev.map((apt) =>
        apt.id === selectedAppointment.id
          ? {
              ...apt,
              status: newStatus,
              rejected: action === "reject",
            }
          : apt
      )
    );

    setSelectedAppointment(null);
    setAction(null);
    setOpen(false);
  };



// const DOCTOR_NAME = "Dr. Ashish Gupta"; 

// const handleConfirm = () => {
//   if (!selectedAppointment || !action) return;

//   if (action === "accept") {
//     setData((prev) =>
//       prev.map((apt) =>
//         apt.id === selectedAppointment.id
//           ? {
//               ...apt,
//               status: "Scheduled",
//               assignedDoctor: DOCTOR_NAME,
//               rejected: false,
//             }
//           : apt
//       )
//     );
//   }

//   if (action === "reject") {
//     setData((prev) =>
//       prev.map((apt) =>
//         apt.id === selectedAppointment.id
//           ? {
//               ...apt,
//               status: "Rejected",
//               rejected: true,
//             }
//           : apt
//       )
//     );
//   }

//   setSelectedAppointment(null);
//   setAction(null);
//   setOpen(false);
// };

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
                        header.getContext()
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
                      row.original.rejected
                        ? "bg-red-50 border-l-4 border-red-500"
                        : ""
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
