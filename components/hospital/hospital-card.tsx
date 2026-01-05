"use client"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { doctorAppointmentData } from "@/app/data/doctor-appointment"
import { AppointmentStatusBadge } from "../common/badge-status"
// import { StatusBadge } from "@/components/common/status-badge"

export function DoctorsAppointmentTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Doctors Appointment Overview
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Speciality</TableHead>
                            <TableHead className="text-center">
                                Pending
                            </TableHead>
                            <TableHead className="text-center">
                                Completed
                            </TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {doctorAppointmentData.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell className="font-medium">
                                    {doc.name}
                                </TableCell>

                                <TableCell>
                                    {doc.speciality}
                                </TableCell>

                                <TableCell className="text-center">
                                    {doc.pending}
                                </TableCell>

                                <TableCell className="text-center">
                                    {doc.completed}
                                </TableCell>

                                <TableCell>
                                    <AppointmentStatusBadge status={doc.status} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
