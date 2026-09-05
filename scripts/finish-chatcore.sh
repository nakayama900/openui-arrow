#!/bin/bash
# finish-chatcore.sh — arrow-headlessをchat-core消費に切替してcommitする最後の1ステップ
# 使い方: bash ~/work/openui-arrow/scripts/finish-chatcore.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== 1. 旧コピペ13ファイル削除 (git rm, 履歴に残るので復元可)"
git rm -q -r packages/arrow-headless/src/store packages/arrow-headless/src/stream packages/arrow-headless/src/types 2>/dev/null || true

echo "== 2. index.ts を chat-core再export に書換"
cat > packages/arrow-headless/src/index.ts <<'EOF'
export { createArrowChatStore } from "./createArrowChatStore.js";
export type { ArrowChatStore } from "./createArrowChatStore.js";
export { selectThread, selectThreadList } from "./selectors.js";
export type { ThreadListSlice, ThreadSlice } from "./selectors.js";

// ── Re-export everything framework-free from chat-core ──
export * from "@openuidev/chat-core";
EOF

echo "== 3. createArrowChatStore.ts の import を chat-core へ"
python3 - <<'PYEOF'
s = open('packages/arrow-headless/src/createArrowChatStore.ts').read()
s = s.replace('import { createChatStore } from "./store/createChatStore.js";',
              'import { createChatStore } from "@openuidev/chat-core";')
s = s.replace('import type { ChatProviderProps, ChatStore } from "./store/types.js";',
              'import type { ChatCoreProviderProps, ChatStore } from "@openuidev/chat-core";')
s = s.replace('type ArrowChatStoreConfig = ChatProviderProps;',
              'type ArrowChatStoreConfig = Omit<ChatCoreProviderProps, "children">;')
open('packages/arrow-headless/src/createArrowChatStore.ts', 'w').write(s)

t = open('packages/arrow-headless/src/__tests__/createArrowChatStore.test.ts').read()
t = t.replace('from "../store/types.js"', 'from "@openuidev/chat-core"')
open('packages/arrow-headless/src/__tests__/createArrowChatStore.test.ts', 'w').write(t)

# arrow-headless package.json にchat-core依存を追加
import json
p = 'packages/arrow-headless/package.json'
d = json.load(open(p))
d.setdefault('dependencies', {})['@openuidev/chat-core'] = 'workspace:^'
json.dump(d, open(p, 'w'), indent=2)
print('imports fixed')
PYEOF

echo "== 4. lockfile 更新 (mainの解決を維持)"
CI=true npm_config_registry=https://registry.npmjs.org npx -y pnpm@9.15.9 install --no-frozen-lockfile

echo "== 5. 検証: arrow-headless + 周辺パッケージ"
for p in chat-core arrow-headless react-headless arrow-ui; do
  echo "--- $p"
  (cd "packages/$p" && npx pnpm@9.15.9 run typecheck >/dev/null 2>&1 && echo "typecheck OK" || echo "typecheck FAIL")
  (cd "packages/$p" && npx pnpm@9.15.9 run test 2>&1 | grep -E 'Test Files|Tests ' | tail -2)
done

echo "== 6. prettier (CI版 3.9.6)"
npx -y prettier@3.9.6 --write packages/arrow-headless/src >/dev/null 2>&1 || true

echo "== 7. commit (pushはしない)"
git add -A packages/arrow-headless packages/chat-core packages/react-headless pnpm-lock.yaml
git commit -m "refactor: extract @openuidev/chat-core; arrow-headless and react-headless consume it

- Move 35 React-free files (store/stream/types/adapters) from react-headless to chat-core
- arrow-headless drops its 13 stale copies of react-headless code; re-exports chat-core
- react-headless keeps React bindings (hooks/providers/contexts) only
- React.RefObject -> { current } structural type in createChatStore"

echo "DONE. git push は手動で: git push origin chat-core-extraction"
