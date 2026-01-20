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

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import type { Appointment } from "@/app/data/appointment"
import { getAllAppointmentDoctorLists, updateAppointmentStatus } from "@/app/services/appointment/appointment.service"
import { mapApiAppointmentToUI } from "@/app/utils/mapAppointment"
// import { updateAppointmentStatus } from "@/app/services/appointment/appointment.service"
import { getActiveUserAppointment } from "@/app/services/appointment/appointment.service"





import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogPortal,   // ✅ ADD THIS

} from "@/components/ui/dialog"
import AppointmentDialog from "./appointment/AppointmentDialog"


/* ============================
   STATUS STYLE
============================ */
const statusVariant = (status: string) => {
    switch (status) {
        case "Allotted":
            return "success"
        case "Scheduled":
            return "warning"
        case "Completed":
            return "info"
        default:
            return "destructive"
    }
}

const AllDoctorAppointmentTable = () => {
    const [data, setData] = React.useState<Appointment[]>([])
    const [loading, setLoading] = React.useState(true)
    const [sorting, setSorting] = React.useState<any>([])

    /* dialog state */
    const [open, setOpen] = React.useState(false)
    const [action, setAction] = React.useState<"accept" | "reject" | null>(null)

    // const [selectedId, setSelectedId] = React.useState<string | null>(null)
    const [selectedAppointment, setSelectedAppointment] =
        React.useState<Appointment | null>(null)



        React.useEffect(() => {
        const loadActiveAppointment = async () => {
            try {
                const token = localStorage.getItem("accessToken")

                if (!token) {
                    console.error("No token found")
                    return
                }

                const res = await getActiveUserAppointment(token)

                // 👇 map API → UI
                const mappedData = mapApiAppointmentToUI(res.data)
                setData(mappedData)
            } catch (error) {
                console.error("Failed to fetch active appointment", error)
            } finally {
                setLoading(false)
            }
        }

        loadActiveAppointment()
    }, [])





    const handleUpdateStatus = async (
        appointmentId: string,
        action: "schedule" | "cancel"
    ) => {
        try {
            await updateAppointmentStatus(
                appointmentId,
                action,

                "Dr. Ashish Gupta"
            )

            setData((prev) =>
                prev.map((item) =>
                    item.id === appointmentId
                        ? {
                            ...item,
                            status: action === "schedule" ? "Scheduled" : "Cancelled",
                        }
                        : item
                )
            )
        } catch (error) {
            console.error("Failed to update appointment status", error)
        }
    }



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
                    const status = getValue<string>()
                    return (
                        <Badge variant={statusVariant(status) as any}>
                            {status}
                        </Badge>
                    )
                },
            },
            {
                id: "action",
                header: "Action",
                cell: ({ row }) => {
                    const { status, id } = row.original

                    if (status !== "Allotted") {
                        return <span className="text-muted-foreground">—</span>
                    }

                    return (
                        <div className="flex gap-2">
                            <Button size="sm" onClick={() => openDialog(row.original, "accept")}>
                                Accept
                            </Button>

                            <Button variant="destructive" onClick={() => openDialog(row.original, "reject")}>
                                Reject
                            </Button>

                        </div>
                    )
                },
            },
        ],
        []
    )
    const openDialog = (appointment: Appointment, type: "accept" | "reject") => {
        setSelectedAppointment(appointment)
        setAction(type)
        setOpen(true)
    }


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
    })

    /* ============================
       LOADING STATE
    ============================ */
    if (loading) {
        return (
            <div className="rounded-md border p-6 text-center text-muted-foreground">
                Loading appointments...
            </div>
        )
    }
    const handleConfirm = async () => {
        if (!selectedAppointment || !action) return

        const apiAction = action === "accept" ? "schedule" : "cancel"

        await handleUpdateStatus(selectedAppointment.id, apiAction)

        setSelectedAppointment(null)
        setAction(null)
        setOpen(false)
    }



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
                                    <TableRow key={row.id}>
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
    )
}

export default AllDoctorAppointmentTable
