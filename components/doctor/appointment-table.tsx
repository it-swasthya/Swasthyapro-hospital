"use client"

import { useEffect, useMemo, useState } from "react"
import type { Appointment } from "@/app/data/appointment"
import { getDoctorAppointments } from "@/app/services/appointment/appointment.service"
import { mapApiAppointmentToUI } from "@/app/utils/mapAppointment"

import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from "material-react-table"

import { Chip } from "@mui/material"
import { Button } from "@/components/ui/button"
import { log } from "console"

const AppointmentTable = () => {
    const [data, setData] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getDoctorAppointments(
                    "Dr. Ashish Gupta"
                )
                console.log(response);

                const mappedData = mapApiAppointmentToUI(response.data)
                setData(mappedData)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    const columns = useMemo<MRT_ColumnDef<Appointment>[]>(
        () => [
            //   { accessorKey: "id", header: "Appointment ID" },
            { accessorKey: "patientName", header: "Patient Name" },
            { accessorKey: "contact", header: "Contact" },
            { accessorKey: "symptoms", header: "Symptoms" },
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
                            color={
                                status === "Allotted"
                                    ? "success"
                                    : status === "Scheduled"
                                        ? "warning"
                                        : status === "Completed"
                                            ? "info"
                                            : "error" // Cancelled
                            }
                            size="small"
                        />

                    )
                },
            },
            {
                header: "Action",
                Cell: () => (
                    <Button size="sm">
                        View
                    </Button>
                ),
            },
        ],
        []
    )

    const table = useMaterialReactTable({
        columns,
        data,
        state: { isLoading: loading },
        enableColumnActions: false,
        enableSorting: true,
        enablePagination: true,
    })

    return <MaterialReactTable table={table} />
}

export default AppointmentTable
