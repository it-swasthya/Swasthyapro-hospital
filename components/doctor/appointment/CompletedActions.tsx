

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitConsultationReport } from "@/app/services/appointment/appointment.service"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function CompletedActions({
  appointmentId,
  onSuccess,
}: {
  appointmentId: string
  onSuccess: (response: any) => void
}) {
  const [diagnosis, setDiagnosis] = useState("")
  const [advice, setAdvice] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  // dialog control
  const [dialogType, setDialogType] = useState<
    "validation" | "confirm" | "success" | null
  >(null)
  const [validationMessage, setValidationMessage] = useState("")

  const validateAndConfirm = () => {
    if (!diagnosis.trim()) {
      setValidationMessage("Please enter diagnosis.")
      setDialogType("validation")
      return
    }

    if (!advice.trim()) {
      setValidationMessage("Please enter medical advice.")
      setDialogType("validation")
      return
    }

    if (!file) {
      setValidationMessage("Please upload prescription file.")
      setDialogType("validation")
      return
    }

    setDialogType("confirm")
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const response = await submitConsultationReport({
        appointmentId,
        diagnosis,
        advice,
        file,
      })

      setDialogType("success")
      onSuccess(response)
    } catch (err: any) {
      setValidationMessage(
        err?.response?.data?.message || "Submission failed"
      )
      setDialogType("validation")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
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

        <Button
          disabled={loading}
          className="w-full"
          onClick={validateAndConfirm}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </Button>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={!!dialogType} onOpenChange={() => setDialogType(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogType === "validation" && "Missing Information"}
              {dialogType === "confirm" && "Confirm Submission"}
              {dialogType === "success" && "Success"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {dialogType === "validation" && validationMessage}

              {dialogType === "confirm" &&
                "Are you sure you want to submit this consultation report? This action cannot be edited later."}

              {dialogType === "success" &&
                "Consultation report submitted successfully."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            {dialogType === "confirm" && (
              <>
                <AlertDialogCancel disabled={loading}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction disabled={loading} onClick={handleSubmit}>
                  Continue
                </AlertDialogAction>
              </>
            )}

            {dialogType !== "confirm" && (
              <AlertDialogAction>OK</AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
