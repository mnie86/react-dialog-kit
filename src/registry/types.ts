import {ComponentType, ReactNode} from "react";

/**
 * Shared type definitions for dialog configuration.
 * DialogDefinition describes the component, optional validator, and rendering options.
 * DialogRegistryMap defines the internal structure used by the registry.
 */
export interface DialogDefinition {
    component: ComponentType<any>;
    validator?: {
        validate: (data: unknown) => any;
    };
    options?: {};
}

export type DialogRegistryMap = Record<string, DialogDefinition>;