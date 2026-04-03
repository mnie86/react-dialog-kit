import {DialogDefinition, DialogRegistryMap} from "./types";

/**
 * Central registry that stores all dialog definitions.
 * Ensures dialogs are registered only once and can be retrieved by key.
 * Used internally by the provider to resolve components, validators, and options.
 */
class DialogRegistryClass {
    private registry: DialogRegistryMap = {};

    register(key: string, definition: DialogDefinition) {
        if (this.registry[key]) {
            throw new Error(`Dialog "${key}" is already registered.`);
        }
        this.registry[key] = definition;
    }

    get(key: string) {
        const def = this.registry[key];
        if (!def) {
            throw new Error(`Dialog "${key}" is not registered.`);
        }
        return def;
    }
}

export const DialogRegistry = new DialogRegistryClass();