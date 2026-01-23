


// "use client"

// import * as React from "react"
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table"

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import type { Appointment } from "@/app/data/appointment"
// import { assignDoctor } from "@/app/services/appointment/appointment.service"

// /* ============================
//    DOCTOR LIST
// ============================ */
// const DOCTORS = [
//   "Dr. Ashish Gupta",
//   "Dr. Neha Sharma",
//   "Dr. Rahul Verma",
//   "Dr. Pooja Singh",
// ]

// const statusVariant = (status: string) => {
//   switch (status) {
//     case "Scheduled":
//       return "warning"
//     case "Completed":
//       return "info"
//     case "Cancelled":
//       return "destructive"
//     default:
//       return "success"
//   }
// }

// const HospitalAppointmentTable = ({ data }: { data: Appointment[] }) => {
//   const [tableData, setTableData] = React.useState<Appointment[]>(data)
//   const [loadingId, setLoadingId] = React.useState<string | null>(null)
//   const [sorting, setSorting] = React.useState<any>([])

//   const columns = React.useMemo<ColumnDef<Appointment>[]>(
//     () => [
//       { accessorKey: "patientName", header: "Patient Name" },
//       { accessorKey: "contact", header: "Contact" },
//       { accessorKey: "symptoms", header: "Symptoms" },
//       { accessorKey: "speciality", header: "Speciality" },

//       {
//         accessorKey: "assignedDoctor",
//         header: "Doctor",
//         cell: ({ row }) => {
//           const appt = row.original

//           const isLocked =
//             appt.status === "Scheduled" ||
//             appt.status === "Completed" ||
//             appt.status === "Cancelled"

//           // Once assigned, doctor becomes read-only
//           if (isLocked) {
//             return (
//               <span className="text-muted-foreground">
//                 {appt.assignedDoctor || "—"}
//               </span>
//             )
//           }

//           return (
//             <Select
//               disabled={loadingId === appt.id}
//               value={appt.assignedDoctor ?? ""}
//               onValueChange={async (doctorName) => {
//                 if (!doctorName) return

//                 try {
//                   setLoadingId(appt.id)

//                   // Send EXACT selected doctor to backend
//                   await assignDoctor(appt.id, doctorName)

//                   // Update UI only after backend success
//                   setTableData((prev) =>
//                     prev.map((item) =>
//                       item.id === appt.id
//                         ? {
//                             ...item,
//                             assignedDoctor: doctorName,
//                             status: "Scheduled",
//                           }
//                         : item
//                     )
//                   )
//                 } catch (err: any) {
//                   alert(
//                     err?.response?.data?.message ||
//                       "Doctor assignment failed"
//                   )
//                 } finally {
//                   setLoadingId(null)
//                 }
//               }}
//             >
//               <SelectTrigger className="w-48">
//                 <SelectValue placeholder="Assign Doctor" />
//               </SelectTrigger>

//               <SelectContent>
//                 {DOCTORS.map((doc) => (
//                   <SelectItem key={doc} value={doc}>
//                     {doc}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           )
//         },
//       },

//       { accessorKey: "date", header: "Date" },
//       { accessorKey: "timeSlot", header: "Time Slot" },

//       {
//         accessorKey: "status",
//         header: "Status",
//         cell: ({ getValue }) => {
//           const status = getValue<string>()
//           return <Badge variant={statusVariant(status) as any}>{status}</Badge>
//         },
//       },
//    {
//       id: "doctorAssigned",
//       header: "Assigned",
//       size: 150,
//       cell: ({ row }) => {
//         const hasDoctor = !!row.original.assignedDoctor

//         return (
//           <Badge
//             className={
//               hasDoctor
//                 ? "bg-green-100 text-green-700 border border-green-300"
//                 : "bg-red-100 text-red-700 border border-red-300"
//             }
//           >
//             {hasDoctor ? "Yes" : "No"}
//           </Badge>
//         )
//       },
//     },
//   ], [loadingId])
   

//   const table = useReactTable({
//     data: tableData,
//     columns,
//     state: { sorting },
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   })

//   return (
//     <div className="space-y-4 mt-6">
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((hg) => (
//               <TableRow key={hg.id}>
//                 {hg.headers.map((header) => (
//                   <TableHead
//                     key={header.id}
//                     onClick={header.column.getToggleSortingHandler()}
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>

//           <TableBody>
//             {table.getRowModel().rows.map((row) => (
//               <TableRow key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(
//                       cell.column.columnDef.cell,
//                       cell.getContext()
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex justify-end gap-2">
//         <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
//           Previous
//         </Button>
//         <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//           Next
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default HospitalAppointmentTable



"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Appointment } from "@/app/data/appointment"
import { assignDoctor } from "@/app/services/appointment/appointment.service"

/* ============================
   DOCTOR LIST
============================ */
const DOCTORS = [
  "Dr. Ashish Gupta",
  "Dr. Neha Sharma",
  "Dr. Rahul Verma",
  "Dr. Pooja Singh",
]

/* ============================
   SPINNER
============================ */
const Spinner = () => (
  <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
)

/* ============================
   STATUS BADGE VARIANT
============================ */
const statusVariant = (status: string) => {
  switch (status) {
    case "Pending":
      return "warning"
    case "Scheduled":
      return "success"
    case "Completed":
      return "info"
    case "Cancelled":
      return "destructive"
    default:
      return "secondary"
  }
}

/* ============================
   MAIN TABLE COMPONENT
============================ */
const HospitalAppointmentTable = ({ data }: { data: Appointment[] }) => {
  const [tableData, setTableData] = React.useState<Appointment[]>(data)
  const [loadingId, setLoadingId] = React.useState<string | null>(null)
  const [sorting, setSorting] = React.useState<any>([])

  const columns = React.useMemo<ColumnDef<Appointment>[]>(() => [
    { accessorKey: "patientName", header: "Patient Name" },
    { accessorKey: "contact", header: "Contact" },
    { accessorKey: "symptoms", header: "Symptoms" },
    { accessorKey: "speciality", header: "Speciality" },

    /* ============================
       ASSIGN DOCTOR
    ============================ */
    {
      accessorKey: "assignedDoctor",
      header: "Doctor",
      cell: ({ row }) => {
        const appt = row.original
        const isLoading = loadingId === appt.id

        const isLocked =
          appt.status === "Scheduled" ||
          appt.status === "Completed" ||
          appt.status === "Cancelled"

        if (isLocked) {
          return (
            <span className="text-muted-foreground">
              {appt.assignedDoctor || "—"}
            </span>
          )
        }

        return (
          <div className="flex items-center gap-2">
            <Select
              disabled={isLoading}
              value={appt.assignedDoctor ?? ""}
              onValueChange={async (doctorName) => {
                if (!doctorName) return

                try {
                  setLoadingId(appt.id)

                  setTableData((prev) =>
                    prev.map((item) =>
                      item.id === appt.id
                        ? {
                            ...item,
                            assignedDoctor: doctorName,
                             status: "Allotted",
                          }
                        : item
                    )
                  )

                  await assignDoctor(appt.id, doctorName)
                } catch (err: any) {
                  alert(
                    err?.response?.data?.message ||
                      "Doctor assignment failed"
                  )
                } finally {
                  setLoadingId(null)
                }
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Assign Doctor" />
              </SelectTrigger>

              <SelectContent>
                {DOCTORS.map((doc) => (
                  <SelectItem key={doc} value={doc}>
                    {doc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isLoading && <Spinner />}
          </div>
        )
      },
    },

    { accessorKey: "date", header: "Date" },
    { accessorKey: "timeSlot", header: "Time Slot" },

    /* ============================
       STATUS
    ============================ */
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        const isLoading = loadingId === row.original.id

        return (
          <div className="flex items-center gap-2">
            <Badge variant={statusVariant(status) as any}>
              {status}
            </Badge>
            {status === "Pending" && isLoading && <Spinner />}
          </div>
        )
      },
    },

    /* ============================
       ASSIGNED FLAG (UPDATED)
    ============================ */
    {
      id: "doctorAssigned",
      header: "Assigned",
      size: 150,
      cell: ({ row }) => {
        const status = row.original.status
        const hasDoctor = !!row.original.assignedDoctor

        const isAssigned =
          status === "Cancelled" ? false : hasDoctor

        return (
          <Badge
            className={
              isAssigned
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }
          >
            {isAssigned ? "Yes" : "No"}
          </Badge>
        )
      },
    },
  ], [loadingId])

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-4 mt-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => {
              const isCancelled = row.original.status === "Cancelled"

              return (
                <TableRow
                  key={row.id}
                  className={
                    isCancelled
                      ? "bg-red-50 hover:bg-red-100 text-red-800"
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
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default HospitalAppointmentTable


