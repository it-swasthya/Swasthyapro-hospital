import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"


const patients = [
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        procedure: "Appendectomy",
        date: "2025-05-20",
    },
    {
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        procedure: "Knee Arthroscopy",
        date: "2025-05-18",
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        procedure: "Cataract Surgery",
        date: "2025-05-15",
    },
    {
        name: "William Chen",
        email: "william.chen@email.com",
        procedure: "Colonoscopy",
        date: "2025-05-12",
    },
    {
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        procedure: "Knee Arthroscopy",
        date: "2025-05-18",
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        procedure: "Cataract Surgery",
        date: "2025-05-15",
    },
    {
        name: "William Chen",
        email: "william.chen@email.com",
        procedure: "Colonoscopy",
        date: "2025-05-12",
    },
]

export function PatientsLastProcedure() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Patients with Last Procedure</CardTitle>
                <Button variant="outline" size="sm">
                    View All →
                </Button>
            </CardHeader>

            <CardContent className="space-y-4">
                {patients.map((patient, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback>
                                    {patient.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="text-sm font-medium">
                                    {patient.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {patient.email}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-sm">
                                {patient.procedure}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {patient.date}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
