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
import { getAllAppointmentDoctorLists } from "@/app/services/appointment/appointment.service"
import { mapApiAppointmentToUI } from "@/app/utils/mapAppointment"



import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



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

const AppointmentTable = () => {
    const [data, setData] = React.useState<Appointment[]>([])
    const [loading, setLoading] = React.useState(true)
    const [sorting, setSorting] = React.useState<any>([])

    /* dialog state */
    const [open, setOpen] = React.useState(false)
    const [action, setAction] = React.useState<"accept" | "reject" | null>(null)
    const [selectedId, setSelectedId] = React.useState<string | null>(null)

    /* ============================
       FETCH DATA
    ============================ */
    React.useEffect(() => {
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

    /* ============================
       ACTION HANDLER
    ============================ */
    const handleUpdateStatus = (id: string, status: string) => {
        console.log("Update:", id, status)
        // 🔥 call API here later
    }

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
                            <Button
                                size="sm"
                                onClick={() => {
                                    setSelectedId(id)
                                    setAction("accept")
                                    setOpen(true)
                                }}
                            >
                                Accept
                            </Button>

                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                    setSelectedId(id)
                                    setAction("reject")
                                    setOpen(true)
                                }}
                            >
                                Reject
                            </Button>
                        </div>
                    )
                },
            },
        ],
        []
    )

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
            </div>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent
                    className="
      fixed
      left-1/2
      top-1/2
      -translate-x-1/2
      -translate-y-1/2
      z-[9999]
    "
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {action === "accept"
                                ? "Accept this appointment?"
                                : "Reject this appointment?"}
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            {action === "accept"
                                ? "This will change the status to Scheduled."
                                : "This action cannot be undone."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (!selectedId || !action) return

                                handleUpdateStatus(
                                    selectedId,
                                    action === "accept" ? "Scheduled" : "Cancelled"
                                )

                                setOpen(false)
                            }}
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            


        </>
    )
}

export default AppointmentTable
