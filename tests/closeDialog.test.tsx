import { renderHook, act } from "@testing-library/react";
import { DialogKitProvider } from "../src/provider/DialogKitProvider";
import { useDialogKit } from "../src/hooks/useDialogKit";

const dialogs = [
    {
        key: "test",
        component: () => null
    }
];

const wrapper = ({ children }: any) => (
    <DialogKitProvider dialogs={dialogs}>
        {children}
    </DialogKitProvider>
);

describe("closeDialog", () => {
    it("removes dialog from the stack", () => {
        const { result } = renderHook(() => useDialogKit(), { wrapper });

        // Apri una dialog
        act(() => {
            result.current.openDialog("test", { foo: 1 });
        });

        const id = result.current.dialogsToRender[0].id;

        // Chiudi la dialog
        act(() => {
            result.current.closeDialog(id);
        });

        expect(result.current.dialogsToRender.length).toBe(0);
    });
});