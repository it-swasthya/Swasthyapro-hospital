"use client"

import { useMemo, useState } from "react"
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table"
import { Chip } from "@mui/material"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { Appointment } from "@/app/data/appointment"

/* ============================
   HARD-CODED DOCTOR LIST
============================ */
const DOCTORS = [
  "Dr. Ashish Gupta",
  "Dr. Neha Sharma",
  "Dr. Rahul Verma",
  "Dr. Pooja Singh",
]

const HospitalAppointmentTable = ({ data }: { data: Appointment[] }) => {
  const [tableData, setTableData] = useState<Appointment[]>(data)

  /* ============================
      TABLE COLUMNS
  ============================ */
  const columns = useMemo<MRT_ColumnDef<Appointment>[]>(
    () => [
      { accessorKey: "patientName", header: "Patient Name" },
      { accessorKey: "contact", header: "Contact" },
      { accessorKey: "symptoms", header: "Symptoms" },
      { accessorKey: "speciality", header: "Speciality" },
      {
        accessorKey: "assignedDoctor",
        header: "Doctor",
        Cell: ({ row }) => {
          const appointment = row.original

          return (
            <Select
              value={appointment.assignedDoctor ?? ""}
              onValueChange={(val) => {
                setTableData((prev) =>
                  prev.map((item) =>
                    item.id === appointment.id
                      ? {
                          ...item,
                          assignedDoctor: val,
                          status: val ? "Scheduled" : "Allotted",
                        }
                      : item
                  )
                )
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Assign Doctor" />
              </SelectTrigger>
              <SelectContent>
                {DOCTORS.map((doctor) => (
                  <SelectItem key={doctor} value={doctor}>
                    {doctor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        },
      },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "timeSlot", header: "Time Slot" },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          const status = cell.getValue<string>()
          return (
            <Chip
              label={status}
              size="small"
              color={
                status === "Allotted"
                  ? "success"
                  : status === "Scheduled"
                  ? "warning"
                  : status === "Completed"
                  ? "info"
                  : "error"
              }
            />
          )
        },
      },
    ],
    []
  )

  /* ============================
      TABLE INSTANCE
  ============================ */
  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableSorting: true,
    enablePagination: true,
    enableColumnActions: false,
  })

  return <MaterialReactTable table={table} />
}

export default HospitalAppointmentTable
