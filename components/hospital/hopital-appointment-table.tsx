

// "use client";

// import { useMemo, useState } from "react";
// import type { Appointment } from "@/app/data/appointment";
// import { appointmentData } from "@/app/data/appointment";
// import { doctors } from "@/app/data/doctor";

// import {
//   MaterialReactTable,
//   useMaterialReactTable,
//   type MRT_ColumnDef,
// } from "material-react-table";

// import { MenuItem, Select } from "@mui/material";
// import { Button } from "@/components/ui/button";
// import { AppointmentStatusBadge } from "@/components/common/apt-status-badge";

// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import ConfirmationDialog from "../doctor/appointment/ConfirmationDialog";

// const AppointmentTable = () => {
//   const [data, setData] = useState<Appointment[]>(appointmentData);

//   // confirmation dialog state
//   const [open, setOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState<number | null>(null);

//   /**
//    *  Assign doctor ONLY (status never changes)
//    */
//   const confirmAssignDoctor = () => {
//     if (selectedRow === null) return;

//     setData((prev) =>
//       prev.map((appt, i) =>
//         i === selectedRow
//           ? {
//               ...appt,
//               assignedDoctor: appt.assignedDoctor,
//               status: appt.status, //  explicit lock
//             }
//           : appt
//       )
//     );

//     setOpen(false);
//     setSelectedRow(null);
//   };

//   const columns = useMemo<MRT_ColumnDef<Appointment>[]>(
//     () => [
//       {
//         accessorKey: "id",
//         header: "Appointment ID",
//         size: 120,
//       },
//       {
//         accessorKey: "patientName",
//         header: "Patient Name",
//         size: 160,
//       },
//       {
//         accessorKey: "symptoms",
//         header: "Symptoms",
//         size: 220,
//       },
//       {
//         accessorKey: "speciality",
//         header: "Speciality",
//         size: 160,
//       },
//       {
//         accessorKey: "date",
//         header: "Date",
//         size: 120,
//       },
//       {
//         accessorKey: "timeSlot",
//         header: "Time Slot",
//         size: 180,
//       },
//       {
//         accessorKey: "status",
//         header: "Status",
//         size: 130,

//         Cell: ({ cell }) => (
//           <AppointmentStatusBadge
//             status={cell.getValue<Appointment["status"]>()}
//           />
//         ),
//       },
//       {
//         accessorKey: "assignedDoctor",
//         header: "Assigned Doctor",
//         size: 200,
//         Cell: ({ row }) => {
//           const appointment = row.original;

//           const isClosed =
//             appointment.status === "Completed" ||
//             appointment.status === "Cancelled";

//           if (isClosed) {
//             return (
//               <span className="text-muted-foreground">
//                 {appointment.assignedDoctor ?? "—"}
//               </span>
//             );
//           }

//           return (
//             <Select
//               size="small"
//               displayEmpty
//               value={appointment.assignedDoctor ?? ""}
//               onChange={(e) => {
//                 const updated = [...data];
//                 updated[row.index] = {
//                   ...appointment,
//                   assignedDoctor: e.target.value,
//                 };
//                 setData(updated);
//               }}
//               sx={{ minWidth: 160 }}
//             >
//               <MenuItem value="">
//                 <em>Assign Doctor</em>
//               </MenuItem>

//               {doctors.map((doc) => (
//                 <MenuItem key={doc.id} value={doc.name}>
//                   {doc.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           );
//         },
//       },
//       {
//         header: "Action",
//         size: 120,
//         Cell: ({ row }) => {
//           const appt = row.original;

//           const disabled =
//             appt.status === "Completed" ||
//             appt.status === "Cancelled" ||
//             !appt.assignedDoctor;

//           return (
//             <Button
//               size="sm"
//               disabled={disabled}
//               onClick={() => {
//                 setSelectedRow(row.index);
//                 setOpen(true);
//               }}
//             >
//               Assign
//             </Button>
//           );
//         },
//       },
//     ],
//     [data]
//   );

//   const table = useMaterialReactTable({
//     columns,
//     data,
//     enableColumnActions: false,
//     enableSorting: true,
//     enablePagination: true,
//     enableDensityToggle: false,
//     initialState: {
//       pagination: { pageSize: 8, pageIndex: 0 },
//     },
//   });

//   return (
//     <>
//       <MaterialReactTable table={table} />

//       <ConfirmationDialog
//         open={open}
//         title="Confirm Doctor Assignment"
//         description={
//           selectedRow !== null
//             ? `Are you sure you want to assign ${data[selectedRow]?.assignedDoctor}?`
//             : "Are you sure you want to assign this doctor?"
//         }
//         confirmText="Yes, Assign"
//         cancelText="Cancel"
//         onConfirm={confirmAssignDoctor}
//         onClose={() => {
//           setOpen(false);
//           setSelectedRow(null);
//         }}
//       />
//     </>
//   );
// };

// export default AppointmentTable;




"use client";

import { useMemo, useState } from "react";
import type { Appointment } from "@/app/data/appointment";
import { appointmentData } from "@/app/data/appointment";
import { doctors } from "@/app/data/doctor";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { MenuItem, Select } from "@mui/material";
import { Button } from "@/components/ui/button";
import { AppointmentStatusBadge } from "@/components/common/apt-status-badge";
import { Badge } from "@/components/ui/badge";

import ConfirmationDialog from "../doctor/appointment/ConfirmationDialog";

const AppointmentTable = () => {
  const [data, setData] = useState<Appointment[]>(appointmentData);

  // confirmation dialog state
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  /**
   * Assign doctor ONLY (status never changes)
   */
  const confirmAssignDoctor = () => {
    if (selectedRow === null) return;

    setData((prev) =>
      prev.map((appt, i) =>
        i === selectedRow
          ? {
              ...appt,
              assignedDoctor: appt.assignedDoctor,
              status: appt.status,
            }
          : appt
      )
    );

    setOpen(false);
    setSelectedRow(null);
  };

  const columns = useMemo<MRT_ColumnDef<Appointment>[]>(() => [
    {
      accessorKey: "id",
      header: "Appointment ID",
      size: 120,
    },
    {
      accessorKey: "patientName",
      header: "Patient Name",
      size: 160,
    },
    {
      accessorKey: "symptoms",
      header: "Symptoms",
      size: 220,
    },
    {
      accessorKey: "speciality",
      header: "Speciality",
      size: 160,
    },
    {
      accessorKey: "date",
      header: "Date",
      size: 120,
    },
    {
      accessorKey: "timeSlot",
      header: "Time Slot",
      size: 180,
    },

    /* ================= STATUS ================= */
    {
      accessorKey: "status",
      header: "Status",
      size: 130,
      Cell: ({ cell }) => (
        <AppointmentStatusBadge
          status={cell.getValue<Appointment["status"]>()}
        />
      ),
    },

    /* ========== NEW COLUMN: DOCTOR ASSIGNED (YES / NO) ========== */
    {accessorKey:"IsAssignedDoctor",
      header: "Assigned",
      size: 150,
      Cell: ({ row }) => {
        const hasDoctor = !!row.original.assignedDoctor;

        return (
          <Badge
            className={
              hasDoctor
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }
          >
            {hasDoctor ? "Yes" : "No"}
          </Badge>
        );
      },
    },

    /* ================= ASSIGN DOCTOR ================= */
    {
      accessorKey: "assignedDoctor",
      header: "Assigned Doctor",
      size: 200,
      Cell: ({ row }) => {
        const appointment = row.original;

        const isClosed =
          appointment.status === "Completed" ||
          appointment.status === "Cancelled";

        if (isClosed) {
          return (
            <span className="text-muted-foreground">
              {appointment.assignedDoctor ?? "—"}
            </span>
          );
        }

        return (
          <Select
            size="small"
            displayEmpty
            value={appointment.assignedDoctor ?? ""}
            onChange={(e) => {
              const updated = [...data];
              updated[row.index] = {
                ...appointment,
                assignedDoctor: e.target.value,
              };
              setData(updated);
            }}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="">
              <em>Assign Doctor</em>
            </MenuItem>

            {doctors.map((doc) => (
              <MenuItem key={doc.id} value={doc.name}>
                {doc.name}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },

    /* ================= ACTION ================= */
    {
      header: "Action",
      size: 120,
      Cell: ({ row }) => {
        const appt = row.original;

        const disabled =
          appt.status === "Completed" ||
          appt.status === "Cancelled" ||
          !appt.assignedDoctor;

        return (
          <Button
            size="sm"
            disabled={disabled}
            onClick={() => {
              setSelectedRow(row.index);
              setOpen(true);
            }}
          >
            Assign
          </Button>
        );
      },
    },
  ], [data]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableSorting: true,
    enablePagination: true,
    enableDensityToggle: false,
    initialState: {
      pagination: { pageSize: 8, pageIndex: 0 },
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />

      <ConfirmationDialog
        open={open}
        title="Confirm Doctor Assignment"
        description={
          selectedRow !== null
            ? `Are you sure you want to assign ${data[selectedRow]?.assignedDoctor}?`
            : "Are you sure you want to assign this doctor?"
        }
        confirmText="Yes, Assign"
        cancelText="Cancel"
        onConfirm={confirmAssignDoctor}
        onClose={() => {
          setOpen(false);
          setSelectedRow(null);
        }}
      />
    </>
  );
};

export default AppointmentTable;

