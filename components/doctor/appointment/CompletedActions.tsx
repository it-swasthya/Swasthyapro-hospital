import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitConsultationReport } from "@/app/services/appointment/appointment.service"

export default function CompletedActions({
  appointmentId,
  onSuccess,
}: {
  appointmentId: string
  onSuccess: () => void
}) {
  const [diagnosis, setDiagnosis] = useState("")
  const [advice, setAdvice] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!appointmentId) {
      alert("Missing appointment ID")
      return
    }

    if (!diagnosis || !advice || !file) {
      alert("All fields are required")
      return
    }

    try {
      setLoading(true)

     
      await submitConsultationReport({
        appointmentId,
        diagnosis,
        advice,
        file,
      })

      onSuccess()
    } catch (err: any) {
      alert(err?.response?.data?.message || "Submission failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 border rounded-lg p-4 bg-muted/40">
      <h4 className="font-medium">Submit Consultation Report</h4>

      <Input
        placeholder="Diagnosis"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
      />

      <Input
        placeholder="Medical Advice"
        value={advice}
        onChange={(e) => setAdvice(e.target.value)}
      />

      <Input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <Button disabled={loading} className="w-full" onClick={handleSubmit}>
        {loading ? "Submitting..." : "Submit Report"}
      </Button>
    </div>
  )
}

