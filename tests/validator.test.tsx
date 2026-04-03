import { renderHook, act } from "@testing-library/react";
import { useDialogKit } from "../src/hooks/useDialogKit";
import {DialogKitProvider} from "../src/provider/DialogKitProvider";

const validator = {
    validate: jest.fn((data) => ({ ...data, validated: true }))
};

const testDialogs = [
    {
        key: "test",
        component: () => null,
        validator
    }
];

const wrapper = ({children}: any) => (
    <DialogKitProvider dialogs={testDialogs}>
        {children}
    </DialogKitProvider>
);

describe("Validator", () => {
    it("applies validator before opening dialog", () => {
        const { result } = renderHook(() => useDialogKit(), { wrapper });

        act(() => {
            result.current.openDialog("test", { foo: 1 });
        });

        expect(validator.validate).toHaveBeenCalled();
        expect(result.current.dialogsToRender[0].params.validated).toBe(true);
    });
});