import {renderHook, act} from "@testing-library/react";
import {DialogKitProvider} from "../src/provider/DialogKitProvider";
import {useDialogKit} from "../src/hooks/useDialogKit";

const dialogs = [
    {
        key: "testDialog",
        component: () => null
    }
];

const wrapper = ({ children }: any) => (
    <DialogKitProvider dialogs={dialogs}>
        {children}
    </DialogKitProvider>
);

describe("DialogKitProvider", () => {
    it("adds dialogs to the stack", () => {
        const {result} = renderHook(() => useDialogKit(), {wrapper});

        act(() => {
            result.current.openDialog("testDialog", {foo: 123});
        });

        expect(result.current.dialogsToRender.length).toBe(1);
        expect(result.current.dialogsToRender[0].params.foo).toBe(123);
    });
});