"use client"

import { Button } from "@/components/ui/button"

interface AllottedActionsProps {
  onAccept: () => void
  onReject: () => void
}

const AllottedActions = ({ onAccept, onReject }: AllottedActionsProps) => {
  return (
    <div className="flex gap-3">
      <Button
        className="flex-1 bg-green-600 hover:bg-green-700"
        onClick={onAccept}
      >
        Accept
      </Button>

      <Button
        variant="destructive"
        className="flex-1"
        onClick={onReject}
      >
        Reject
      </Button>
    </div>
  )
}

export default AllottedActions
