import {createContext} from "react";

/**
 * React context storing the dialog management API.
 * Contains methods to open/close dialogs and the list of dialogs currently rendered.
 * The provider supplies these values; consumers access them via useDialogKit().
 */
export interface OpenDialogPayload {
    id: string;
    key: string;
    params?: any;
}

export interface DialogKitContextValue {
    openDialog: (key: string, params?: any) => void;
    closeDialog: (id: string) => void;
    dialogsToRender: OpenDialogPayload[];
}

export const DialogKitContext = createContext<DialogKitContextValue | null>(null);