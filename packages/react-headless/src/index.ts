// React bindings over @openuidev/chat-core. All framework-free logic moved there.
export {
  useActiveDetailedView,
  useArtifactList,
  useArtifactRenderer,
  useDetailedView,
  useDetailedViewPortalTarget,
  useThread,
  useThreadList,
  useToolActivities,
} from "./hooks";
export { MessageContext, MessageProvider, useMessage } from "./hooks/useMessage";

export { defineArtifactCategories } from "./store/artifactCategories";
export type { ArtifactCategoryGroup } from "./store/artifactCategories";
export { useArtifactCategories } from "./store/ArtifactCategoriesContext";
export {
  ArtifactRenderersContext,
  lookupArtifactRenderer,
  lookupArtifactRendererByType,
  useArtifactRendererRegistry,
} from "./store/ArtifactRenderersContext";
export { defineArtifactRenderer } from "./store/artifactRendererTypes";
export type {
  ArtifactRendererConfig,
  ArtifactRendererControls,
  ParsedArtifact,
} from "./store/artifactRendererTypes";
export { useArtifactStorage } from "./store/ArtifactStorageContext";
export { ChatProvider } from "./store/ChatProvider";
export type { ChatProviderProps } from "./store/ChatProvider";
export { DetailedViewContext, useDetailedViewStore } from "./store/DetailedViewContext";
export { ThreadContextContext, useThreadContextStore } from "./store/ThreadContextContext";

// ── Re-export everything framework-free from chat-core ──
export * from "@openuidev/chat-core";
