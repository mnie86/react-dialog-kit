import { render } from "@testing-library/react";
import { DialogKitProvider } from "../src/provider/DialogKitProvider";
import { DialogRegistry } from "../src/registry/DialogRegistry";

describe("DialogKitProvider autoregister", () => {
    it("registers dialogs only once", () => {
        const spy = jest.spyOn(DialogRegistry, "register");

        const dialogs = [
            {
                key: "test",
                component: () => null
            }
        ];

        const { rerender } = render(
            <DialogKitProvider dialogs={dialogs}>
                <div />
            </DialogKitProvider>
        );

        // Rerender del provider
        rerender(
            <DialogKitProvider dialogs={dialogs}>
                <div />
            </DialogKitProvider>
        );

        // Deve essere chiamato solo una volta
        expect(spy).toHaveBeenCalledTimes(1);

        spy.mockRestore();
    });
});