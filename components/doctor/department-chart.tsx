"use client"

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"

const data = [
    { name: "Gastro", value: 60 },
    { name: "Cardiology", value: 45 },
    { name: "Neurology", value: 30 },
    { name: "Orthopedics", value: 25 },
    { name: "Dermatologist", value: 30 }
]

const COLORS = [
    " #00cc66",
    "#00e6e6",
    "#ffad99",
    "#9999ff",
    "#ff1a8c"
]

export function DepartmentChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Patients by Department</CardTitle>
            </CardHeader>

            <CardContent className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
