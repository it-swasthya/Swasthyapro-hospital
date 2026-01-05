"use client"

import { useMemo, useState } from "react"
import type { Appointment } from "@/app/data/appointment"
import { appointmentData } from "@/app/data/appointment"
import { doctors } from "@/app/data/doctor"

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table"

import { Chip, MenuItem, Select } from "@mui/material"
import { Button } from "@/components/ui/button"
import { AppointmentStatusBadge } from "@/components/common/apt-status-badge"

const AppointmentTable = () => {
  const [data, setData] = useState<Appointment[]>(appointmentData)

  const columns = useMemo<MRT_ColumnDef<Appointment>[]>(
    () => [
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
      {
        accessorKey: "assignedDoctor",
        header: "Assigned Doctor",
        size: 200,
        Cell: ({ row }) => {
          const appointment = row.original
          const isClosed =
            appointment.status === "Completed" ||
            appointment.status === "Cancelled"

          if (isClosed) {
            return (
              <span className="text-muted-foreground">
                {appointment.assignedDoctor ?? "—"}
              </span>
            )
          }

          return (
            <Select
              size="small"
              displayEmpty
              value={appointment.assignedDoctor ?? ""}
              onChange={(e) => {
                const updated = [...data]
                updated[row.index] = {
                  ...appointment,
                  assignedDoctor: e.target.value,
                }
                setData(updated)
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
          )
        },
      },
      {
        header: "Action",
        size: 120,
        Cell: ({ row }) => {
          const appt = row.original
          const disabled =
            appt.status === "Completed" ||
            appt.status === "Cancelled" ||
            !appt.assignedDoctor

          return (
            <Button size="sm" disabled={disabled}>
              Assign
            </Button>
          )
        },
      },
    ],
    [data],
  )

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
  })

  return <MaterialReactTable table={table} />
}

export default AppointmentTable
