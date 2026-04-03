import React, {useState, ReactNode, useRef, useEffect} from "react";
import {DialogKitContext, OpenDialogPayload} from "./DialogKitContext";
import {DialogRegistry} from "../registry/DialogRegistry";
import {DialogDefinition} from "../registry/types";

/**
 * Core provider responsible for:
 * - Registering dialogs in the global DialogRegistry (once per mount)
 * - Managing the stack of active dialogs
 * - Validating dialog parameters before opening
 * - Rendering dialogs, optionally wrapped in a delayed fallback for lazy imports
 *
 * This component must wrap the application to enable dialog usage.
 */

interface DialogToRegister {
    key: string;
    component: DialogDefinition["component"];
    validator?: DialogDefinition["validator"];
    options?: DialogDefinition["options"];
}

interface DialogKitProviderProps {
    dialogs: DialogToRegister[];
    children: ReactNode;
}

export const DialogKitProvider = ({dialogs, children}: DialogKitProviderProps) => {
    const registeredRef = useRef(false);

    useEffect(() => {
        if (!registeredRef.current) {
            dialogs.forEach(({key, component, options, validator}) => {
                DialogRegistry.register(key, {component, validator, options});
            });
            registeredRef.current = true;
        }
    }, [dialogs]);

    const [dialogsToRender, setDialogsToRender] = useState<OpenDialogPayload[]>([]);

    const openDialog = (key: string, params: object) => {
        const {validator} = DialogRegistry.get(key);
        const validated = validator ? validator.validate(params) : params;
        const id = crypto.randomUUID();
        setDialogsToRender(prev => [...prev, {id, key, params: validated}]);
    };

    const closeDialog = (id: string) => {
        setDialogsToRender(prev => prev.filter(dialog => dialog.id !== id));
    };

    return (
        <DialogKitContext.Provider value={{openDialog, closeDialog, dialogsToRender}}>
            {children}

            {dialogsToRender.map(({id, key, params}) => {
                const {component: Component} = DialogRegistry.get(key);

                return (
                    <Component
                        key={id}
                        params={params}
                        closeDialog={() => closeDialog(id)}
                    />
                );
            })}
        </DialogKitContext.Provider>
    );
};