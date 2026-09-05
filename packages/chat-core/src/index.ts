// Framework-free exports: everything React-agnostic from the former react-headless.
// React bindings (hooks, providers, contexts) live in @openuidev/react-headless.
export {
  EVE_INPUT_REQUESTED_EVENT,
  agUIAdapter,
  eveAdapter,
  langGraphAdapter,
  openAIAdapter,
  openAIReadableStreamAdapter,
  openAIResponsesAdapter,
  vercelAIAdapter,
} from "./stream/adapters";
export {
  langGraphMessageFormat,
  openAIConversationMessageFormat,
  openAIMessageFormat,
  vercelAIMessageFormat,
} from "./stream/formats";
export { processStreamedMessage } from "./stream/processStreamedMessage";

export {
  createDefaultInMemoryStorage,
  fetchLLM,
  getResponseErrorMessage,
  restStorage,
} from "./adapters";
export type {
  Artifact,
  ArtifactCategory,
  ArtifactListParams,
  ArtifactStorage,
  ArtifactSummary,
  ChatLLM,
  ChatStorage,
  FetchLLMOptions,
  RestStorageOptions,
  ThreadStorage,
} from "./adapters";

export { artifactViewId, parseArtifactViewId } from "./store/artifactViewId";
export { createChatStore } from "./store/createChatStore";
export type { CreateChatStoreConfig } from "./store/createChatStore";
export { createDetailedViewStore } from "./store/createDetailedViewStore";
export { createThreadContextStore } from "./store/createThreadContextStore";
export { pairToolActivity, partialJSONParse } from "./store/toolActivity";
export { identityMessageFormat } from "./types/messageFormat";

export type {
  DetailedViewActions,
  DetailedViewState,
  DetailedViewStore,
} from "./store/detailedViewTypes";
export type {
  ArtifactEntry,
  ThreadContextActions,
  ThreadContextState,
  ThreadContextStore,
} from "./store/threadContextTypes";
export type { ToolActivity, ToolCallStatus } from "./store/toolActivity";
export type {
  ChatCoreProviderProps,
  ChatStore,
  CreateMessage,
  Thread,
  ThreadActions,
  ThreadListActions,
  ThreadListState,
  ThreadState,
} from "./store/types";
export type {
  EveAdapterOptions,
  EveInputOption,
  EveInputRequest,
  EveStreamEvent,
} from "./stream/adapters/eve";
export type { LangGraphAdapterOptions } from "./stream/adapters/langgraph";
export type { LangGraphMessageFormat } from "./stream/formats/langgraph-message-format";
export type {
  ActivityMessage,
  AssistantMessage,
  BinaryInputContent,
  DeveloperMessage,
  FunctionCall,
  InputContent,
  Message,
  ReasoningMessage,
  SystemMessage,
  TextInputContent,
  ToolCall,
  ToolMessage,
  UserMessage,
} from "./types/message";
export type { MessageFormat } from "./types/messageFormat";
export { EventType } from "./types/stream";
export type { AGUIEvent, StreamProtocolAdapter } from "./types/stream";
