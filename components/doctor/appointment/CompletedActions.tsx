"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CompletedActionsProps {
  onSubmit: (data: {
    diagnosis: string
    advice: string
    prescription: File | null
  }) => void
}

const CompletedActions = ({ onSubmit }: CompletedActionsProps) => {
  const [diagnosis, setDiagnosis] = React.useState("")
  const [advice, setAdvice] = React.useState("")
  const [prescription, setPrescription] = React.useState<File | null>(null)

  return (
    <div className="space-y-4">
      <div>
        <Label>Diagnosis</Label>
        <Input
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Enter diagnosis"
        />
      </div>

      <div>
        <Label>Doctor Advice</Label>
        <Input
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
          placeholder="Enter advice / suggestion"
        />
      </div>

      <div>
        <Label>Prescription</Label>
        <Input
          type="file"
          onChange={(e) =>
            setPrescription(e.target.files?.[0] || null)
          }
        />
      </div>

      <Button
        className="w-full"
        onClick={() =>
          onSubmit({
            diagnosis,
            advice,
            prescription,
          })
        }
      >
        Submit Prescription
      </Button>
    </div>
  )
}

export default CompletedActions
