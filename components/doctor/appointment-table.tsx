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
import { Label } from "@/components/ui/label"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
// import { SheetTitle } from "@/components/ui/sheet"

import AllottedActions from "@/components/doctor/appointment/AllottedActions"
import CompletedActions from "@/components/doctor/appointment/CompletedActions"




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
import { getDoctorAppointments } from "@/app/services/appointment/appointment.service"
import { mapApiAppointmentToUI } from "@/app/utils/mapAppointment"
import { Input } from "../ui/input"

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
    const [openSheet, setOpenSheet] = React.useState(false)
    const [selectedAppointment, setSelectedAppointment] =
        React.useState<Appointment | null>(null)


    /* ============================
       FETCH DATA
    ============================ */
    React.useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getDoctorAppointments("Dr. Ashish Gupta")
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

    /* ============================
       COLUMNS
    ============================ */
    const columns = React.useMemo<ColumnDef<Appointment>[]>(
        () => [
            {
                accessorKey: "patientName",
                header: "Patient Name",
            },
            {
                accessorKey: "contact",
                header: "Contact",
            },
            {
                accessorKey: "symptoms",
                header: "Symptoms",
            },
            {
                accessorKey: "date",
                header: "Date",
            },
            {
                accessorKey: "timeSlot",
                header: "Time Slot",
            },
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
                cell: ({ row }) => (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            setSelectedAppointment(row.original)
                            setOpenSheet(true)
                        }}
                    >
                        View
                    </Button>
                ),
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
        <div className="space-y-4">
            {/* TABLE */}
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

                <Sheet open={openSheet} onOpenChange={setOpenSheet} >
                    <SheetContent className="w-[520px] sm:w-[480px] p-0">
                        {/* HEADER */}
                        <VisuallyHidden>
                            <SheetTitle>Appointment Details</SheetTitle>
                        </VisuallyHidden>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold">Appointment Details</h2>
                            <p className="text-sm text-muted-foreground">
                                Review patient information and take action
                            </p>
                        </div>


                        {selectedAppointment && (
                            <div className="space-y-6 px-6 py-5">

                                {/* PATIENT INFO */}
                                <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-medium">
                                            {selectedAppointment.patientName}
                                        </h3>

                                        <Badge variant={statusVariant(selectedAppointment.status) as any}>
                                            {selectedAppointment.status}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Contact</p>
                                            <p className="font-medium">{selectedAppointment.contact}</p>
                                        </div>

                                        <div>
                                            <p className="text-muted-foreground">Date</p>
                                            <p className="font-medium">{selectedAppointment.date}</p>
                                        </div>

                                        <div>
                                            <p className="text-muted-foreground">Time Slot</p>
                                            <p className="font-medium">{selectedAppointment.timeSlot}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* SYMPTOMS */}
                                <div className="rounded-lg border p-4">
                                    <p className="text-xs text-muted-foreground mb-1">Symptoms</p>
                                    <p className="text-sm">{selectedAppointment.symptoms}</p>
                                </div>

                                {/* STATUS ACTIONS */}
                                {selectedAppointment.status === "Allotted" && (
                                    <AllottedActions
                                        onAccept={() => {
                                            console.log("Accept", selectedAppointment.id)
                                            setOpenSheet(false)
                                        }}
                                        onReject={() => {
                                            console.log("Reject", selectedAppointment.id)
                                            setOpenSheet(false)
                                        }}
                                    />
                                )}

                                {selectedAppointment.status === "Completed" && (
                                    <CompletedActions
                                        onSubmit={(data) => {
                                            console.log("Prescription Data", data)
                                            setOpenSheet(false)
                                        }}
                                    />
                                )}
                            </div>
                        )}

                        {/* FOOTER */}
                        <div className="border-t px-6 py-4">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setOpenSheet(false)}
                            >
                                Close
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>


            </div>

        </div>
    )
}

export default AppointmentTable
