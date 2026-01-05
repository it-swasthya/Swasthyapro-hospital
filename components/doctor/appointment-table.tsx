"use client"

import { useMemo } from "react"
import { appointmentData } from "@/app/data/appointment"
import type { Appointment } from "@/app/data/appointment"

import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from "material-react-table"

import { Chip } from "@mui/material"
import { Button } from "../ui/button"

/* ---------------------------------- */
/* Appointment Table */
/* ---------------------------------- */
const AppointmentTable = () => {
    const columns = useMemo<MRT_ColumnDef<Appointment>[]>(
        () => [
             {
                accessorKey: "id",
                header: "Patient ID",
                size: 100,
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
                accessorKey: "status",
                header: "Status",
                size: 120,
                Cell: ({ cell }) => {
                    const status = cell.getValue<string>()

                    return (
                        <Chip
                            label={status}
                            color={
                                status === "Completed"
                                    ? "success"
                                    : status === "Pending"
                                        ? "warning"
                                        : status === "Accepted"
                                            ? "info"
                                            : "error"
                            }
                            size="small"
                        />
                    )
                },
            },
            {
                accessorKey: "timeSlot",
                header: "Time Slot",
                size: 180,
            },

            {
                header: "Action",
                Cell: () => <Button className="bg-blue-700">Action</Button>,
            }

        ],
        [],
    )

    const table = useMaterialReactTable({
        columns,
        data: appointmentData, 
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
