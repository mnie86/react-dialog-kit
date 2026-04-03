import {DialogRegistry} from "../src/registry/DialogRegistry";

describe("DialogRegistry", () => {
    it("registers and retrieves dialogs", () => {
        const component = () => null;

        DialogRegistry.register("test", {component});

        const def = DialogRegistry.get("test");

        expect(def.component).toBe(component);
    });
});