import {useContext} from "react";
import {DialogKitContext} from "../provider/DialogKitContext";

/**
 * Convenience hook that exposes the DialogKit context.
 * Ensures that consumers are wrapped in a <DialogKitProvider>.
 * Provides access to openDialog, closeDialog, and the current dialog stack.
 */
export const useDialogKit = () => {
    const ctx = useContext(DialogKitContext);
    if (!ctx) throw new Error("useDialogKit must be used inside <DialogKitProvider>");
    return ctx;
};