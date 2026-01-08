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
                cell: () => (
                    <Button size="sm" variant="outline">
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
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">Open</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you&apos;re done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <div className="grid gap-3">
                                <Label htmlFor="sheet-demo-name">Name</Label>
                                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="sheet-demo-username">Username</Label>
                                <Input id="sheet-demo-username" defaultValue="@peduarte" />
                            </div>
                        </div>
                        <SheetFooter>
                            <Button type="submit">Save changes</Button>
                            <SheetClose asChild>
                                <Button variant="outline">Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

        </div>
    )
}

export default AppointmentTable
