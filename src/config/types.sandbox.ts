// Defines sandbox execution configuration types.
import type { z } from "zod";
import type {
  SandboxBrowserSchema,
  SandboxDockerSchema,
  SandboxPruneSchema,
  SandboxSshSchema,
} from "./zod-schema.agent-runtime.js";

export type SandboxDockerSettings = NonNullable<z.output<typeof SandboxDockerSchema>>;

export type SandboxBrowserSettings = NonNullable<z.input<typeof SandboxBrowserSchema>> & {
  /** @deprecated Doctor-only legacy input. */
  enableNoVnc?: boolean;
};

export type SandboxPruneSettings = NonNullable<z.input<typeof SandboxPruneSchema>>;

export type SandboxSshSettings = NonNullable<z.input<typeof SandboxSshSchema>>;
