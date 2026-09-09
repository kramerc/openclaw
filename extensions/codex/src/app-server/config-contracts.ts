import type { ProviderAuthAliasLookupParams } from "openclaw/plugin-sdk/agent-runtime";
import type { ParsedCodexPluginConfig, ParsedCodexSupervisionEndpoint } from "./config-parsing.js";
import type { CodexApprovalPolicy, CodexServiceTier, JsonObject } from "./protocol.js";

export type CodexAppServerTransportMode = "stdio" | "websocket" | "unix";
export type CodexAppServerHomeScope = "agent" | "user";
export type CodexAppServerPolicyMode = "yolo" | "guardian";
export type CodexAppServerConnectionClass = "local-loopback" | "remote";
export type CodexAppServerRemoteAppsSubstrate = "preconfigured";
export type OpenClawExecMode = "deny" | "allowlist" | "ask" | "auto" | "full";
export type OpenClawExecSecurity = "deny" | "allowlist" | "full";
export type OpenClawExecAsk = "off" | "on-miss" | "always";
export type OpenClawExecApprovalFloorsForCodexAppServer = {
  security?: OpenClawExecSecurity;
  ask?: OpenClawExecAsk;
};
export type OpenClawExecPolicyForCodexAppServer = {
  mode: OpenClawExecMode;
  security: OpenClawExecSecurity;
  ask: OpenClawExecAsk;
  touched: boolean;
};
export type OpenClawExecPolicy = OpenClawExecPolicyForCodexAppServer;
export type ProviderAuthAliasConfig = NonNullable<ProviderAuthAliasLookupParams>["config"];
export type CodexAppServerDefaultPolicy = {
  mode: CodexAppServerPolicyMode;
  approvalPolicy?: CodexAppServerManagedApprovalPolicy;
  approvalsReviewer?: CodexAppServerApprovalsReviewer;
  sandbox?: CodexAppServerSandboxMode;
  dangerFullAccessAllowed?: boolean;
};
export type CodexAppServerApprovalPolicy = "never" | "on-request";
export type CodexAppServerManagedApprovalPolicy = Extract<CodexApprovalPolicy, string>;
export type CodexAppServerApprovalPolicySource = "config" | "env" | "requirements" | "implicit";
export type CodexAppServerEffectiveApprovalPolicy = CodexApprovalPolicy;
export type CodexAppServerSandboxMode = "read-only" | "workspace-write" | "danger-full-access";
export type CodexAppServerApprovalsReviewer = "user" | "auto_review" | "guardian_subagent";
export type CodexAppServerCommandSource = "managed" | "resolved-managed" | "config" | "env";
export type CodexManagedCommandOrder = "package-first" | "desktop-first";
export type CodexDynamicToolsLoading = "searchable" | "direct";
export type CodexPluginDestructivePolicy = boolean | "auto" | "ask";
export type CodexPluginDestructiveApprovalMode = "allow" | "deny" | "auto" | "ask";

export const CODEX_PLUGINS_MARKETPLACE_NAME = "openai-curated";
export const CODEX_PLUGINS_WORKSPACE_MARKETPLACE_NAME = "workspace-directory";
export const CODEX_PLUGIN_MARKETPLACE_NAME_PATTERN = /^[A-Za-z0-9_-]+$/;
export type CodexPluginMarketplaceName = string;

export type CodexComputerUseConfig = NonNullable<CodexPluginConfig["computerUse"]>;

export type ResolvedCodexComputerUseConfig = {
  enabled: boolean;
  autoInstall: boolean;
  marketplaceDiscoveryTimeoutMs: number;
  liveTestTimeoutMs: number;
  toolCallTimeoutMs: number;
  healthCheckEnabled: boolean;
  healthCheckIntervalMinutes: 30 | 60 | 120 | 240;
  pluginCacheMode: "shared" | "independent";
  strictReadiness: boolean;
  autoRepair: boolean;
  pluginName: string;
  mcpServerName: string;
  marketplaceSource?: string;
  marketplacePath?: string;
  marketplaceName?: string;
};

export type CodexSupervisionEndpoint = ParsedCodexSupervisionEndpoint;

export type CodexAppServerNetworkProxyConfig = NonNullable<
  NonNullable<CodexPluginConfig["appServer"]>["networkProxy"]
>;

export type ResolvedCodexAppServerNetworkProxyConfig = {
  profileName: string;
  configFingerprint: string;
  configPatch: JsonObject;
};

export type ResolvedCodexPluginPolicy = {
  configKey: string;
  marketplaceName: CodexPluginMarketplaceName;
  pluginName: string;
  enabled: boolean;
  allowDestructiveActions: boolean;
  destructiveApprovalMode: CodexPluginDestructiveApprovalMode;
};

export type ResolvedCodexPluginsPolicy = {
  configured: boolean;
  enabled: boolean;
  allowAllPlugins: boolean;
  allowDestructiveActions: boolean;
  destructiveApprovalMode: CodexPluginDestructiveApprovalMode;
  pluginPolicies: ResolvedCodexPluginPolicy[];
};

export type CodexAppServerStartOptions = {
  transport: CodexAppServerTransportMode;
  homeScope?: CodexAppServerHomeScope;
  command: string;
  commandSource?: CodexAppServerCommandSource;
  /** Desktop-first is reserved for the macOS app process that owns Computer Use permissions. */
  managedCommandOrder?: CodexManagedCommandOrder;
  /** Native plugin names checked at the final managed spawn boundary. */
  managedComputerUsePluginNames?: string[];
  managedFallbackCommandPaths?: string[];
  args: string[];
  /** Process working directory for shipped Supervisor stdio endpoint compatibility. */
  cwd?: string;
  url?: string;
  authToken?: string;
  headers: Record<string, string>;
  env?: Record<string, string>;
  clearEnv?: string[];
};

export type CodexAppServerRuntimeOptions = {
  start: CodexAppServerStartOptions;
  connectionClass: CodexAppServerConnectionClass;
  remoteAppsSubstrate: CodexAppServerRemoteAppsSubstrate;
  remoteWorkspaceRoot?: string;
  codeModeOnly: boolean;
  loopDetectionPreToolUseRelay: boolean;
  requestTimeoutMs: number;
  approvalPolicy: CodexAppServerEffectiveApprovalPolicy;
  approvalPolicySource?: CodexAppServerApprovalPolicySource;
  sandbox: CodexAppServerSandboxMode;
  approvalsReviewer: CodexAppServerApprovalsReviewer;
  /** Prepared boundary for an explicit session permission mode. */
  sessionRoot?: string;
  serviceTier?: CodexServiceTier | null;
  networkProxy?: ResolvedCodexAppServerNetworkProxyConfig;
};

export type CodexModelBackedReviewerContext = {
  modelProvider?: string;
  model?: string;
  config?: ProviderAuthAliasConfig;
  env?: NodeJS.ProcessEnv;
  agentDir?: string;
  codexConfigToml?: string | null;
  homeScope?: CodexAppServerHomeScope;
  codexArgs?: readonly string[];
};

export type CodexPluginConfig = ParsedCodexPluginConfig;
