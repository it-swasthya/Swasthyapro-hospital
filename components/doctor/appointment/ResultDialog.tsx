import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface ActionResultDialogProps {
  open: boolean;
  success: boolean;
  message: string;
  onClose: () => void;
}

export const ActionResultDialog = ({
  open,
  success,
  message,
  onClose,
}: ActionResultDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {success ? "Action Completed" : "Action Failed"}
          </AlertDialogTitle>

          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
