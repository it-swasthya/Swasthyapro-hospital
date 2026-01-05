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
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"

const appointments = [
  {
    patient: "John Swift",
    date: "2023-06-01",
    time: "10:00 AM",
    doctor: "Dr. Smith",
    department: "Cardiology",
  },
  {
    patient: "Jane Smith",
    date: "2023-06-02",
    time: "11:30 AM",
    doctor: "Dr. Johnson",
    department: "Neurology",
  },
  {
    patient: "Bob Wilson",
    date: "2023-06-03",
    time: "02:00 PM",
    doctor: "Dr. Brown",
    department: "Oncology",
  },
  {
    patient: "Alice Taylor",
    date: "2023-06-04",
    time: "03:30 PM",
    doctor: "Dr. Davis",
    department: "Pediatrics",
  },
    {
    patient: "Jane Smith",
    date: "2023-06-02",
    time: "11:30 AM",
    doctor: "Dr. Johnson",
    department: "Neurology",
  },
  {
    patient: "Bob Wilson",
    date: "2023-06-03",
    time: "02:00 PM",
    doctor: "Dr. Brown",
    department: "Oncology",
  },
  {
    patient: "Alice Taylor",
    date: "2023-06-04",
    time: "03:30 PM",
    doctor: "Dr. Davis",
    department: "Pediatrics",
  },
]

export function UpcomingAppointments() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Appointments</CardTitle>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button variant="outline" size="icon">
            →
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Department</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {appointments.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.patient}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.doctor}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell className="text-right">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}