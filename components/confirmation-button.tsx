"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import CreateAuthorForm from "./create-author-form";
import { useState } from "react";

interface ConfirmationFormProps {
  onSuccess: () => void;
  onAbort: () => void;
}

interface ConfirmationButtonProps extends Omit<ButtonProps, "children"> {
  children: (props: ConfirmationFormProps) => React.ReactNode;
  buttonTitle: string;
  dialogTitle: string;
  dialogDescription?: string;
}

export default function ConfirmationButton({
  buttonTitle,
  dialogTitle,
  dialogDescription,
  children,
  ...props
}: ConfirmationButtonProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button {...props} onClick={() => handleOpen()}>
          {buttonTitle}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {dialogDescription && <p className="pb-4">{dialogDescription}</p>}
            {children({ onSuccess: handleClose, onAbort: handleClose })}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
