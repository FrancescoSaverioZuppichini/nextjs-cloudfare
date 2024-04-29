"use client";
import CreateAuthorForm from "./create-author-form";
import ConfirmationButton from "./confirmation-button";

export default function CreateAuthorButton() {
  return (
    <ConfirmationButton buttonTitle="New" dialogTitle="Create a New Author">
      {({ onSuccess, onAbort }) => (
        <CreateAuthorForm onSuccess={onSuccess} onAbort={onAbort} />
      )}
    </ConfirmationButton>
  );
}
