"use client"

import { useEffect, useMemo, useState } from "react"
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from "material-react-table"
import { Chip } from "@mui/material"
import { Button } from "@/components/ui/button"

import type { Appointment } from "@/app/data/appointment"
import { getAllAppointmentDoctorLists } from "@/app/services/appointment/appointment.service"
import { mapApiAppointmentToUI } from "@/app/utils/mapAppointment"

const AppointmentTable = () => {
    const [data, setData] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getAllAppointmentDoctorLists()
                const mappedData = mapApiAppointmentToUI(res.allAppointments)
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
            { accessorKey: "patientName", header: "Patient Name" },
            { accessorKey: "contact", header: "Contact" },
            { accessorKey: "symptoms", header: "Symptoms" },
            { accessorKey: "speciality", header: "Speciality" },
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
            {
                header: "Action",
                Cell: ({ row }) => {
                    const { status, id } = row.original

                    if (status !== "Allotted") {
                        return <span style={{ color: "#888" }}>—</span>
                    }

                    function handleUpdateStatus(id: string, arg1: string) {
                        console.log(id, arg1);

                        // throw new Error("Function not implemented.")
                    }

                    return (
                        <div style={{ display: "flex", gap: 8 }}>
                            <Button
                                size="sm"
                                onClick={() => {
                                    if (confirm("Are you sure you want to reject this appointment?")) {
                                        handleUpdateStatus(id, "Cancelled")
                                    }
                                }}
                            >
                                Accept
                            </Button>

                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                    if (confirm("Are you sure you want to reject this appointment?")) {
                                        handleUpdateStatus(id, "Cancelled")
                                    }
                                }}
                            >
                                Reject
                            </Button>
                        </div>
                    )
                },
            }

        ],
        []
    )

    const table = useMaterialReactTable({
        columns,
        data,
        state: { isLoading: loading },
        enableSorting: true,
        enablePagination: true,
        enableColumnActions: false,
    })

    return <MaterialReactTable table={table} />
}

export default AppointmentTable
