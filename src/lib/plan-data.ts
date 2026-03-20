import type { WeekPlan } from "./types";

export const WEEK_PLANS: WeekPlan[] = [
  // ── Phase 1: 基盤固め (Week 1-4) ──────────────────────────────
  {
    week: 1,
    phase: 1,
    title: "Claude Code in Action + Claude 101",
    domains: ["D3"],
    milestone: "CLAUDE.md階層・Skills・Hooksの設計思想を説明できる",
    resources: [
      {
        name: "Claude Code in Action",
        url: "https://anthropic.skilljar.com/claude-code-in-action",
        category: "course",
      },
      {
        name: "Claude 101",
        url: "https://anthropic.skilljar.com/claude-101",
        category: "course",
      },
      {
        name: "Claude Code Docs",
        url: "https://docs.anthropic.com/en/docs/claude-code",
        category: "docs",
      },
    ],
    tasks: [
      "Claude Code in Actionコース完了",
      "Claude 101コース確認（既知部分はスキップ）",
      "自プロジェクトにCLAUDE.mdを作成・整備",
      "Skills/Hooks設計思想をメモにまとめる",
    ],
  },
  {
    week: 2,
    phase: 1,
    title: "Claude Code in Action + Claude 101（定着）",
    domains: ["D3"],
    milestone: "CLAUDE.md階層・Skills・Hooksの設計思想を説明できる",
    resources: [
      {
        name: "Claude Code Best Practices",
        url: "https://docs.anthropic.com/en/docs/claude-code/best-practices",
        category: "docs",
      },
      {
        name: "Claude Code Settings & Hooks",
        url: "https://docs.anthropic.com/en/docs/claude-code/hooks",
        category: "docs",
      },
    ],
    tasks: [
      "CLAUDE.md階層（global / project / sub）を整備",
      "PreToolUse hookを1つ試作",
      ".claude/skills/ に1スキル作成",
      "学んだことをトラッカーに記録する習慣を確立",
    ],
  },
  {
    week: 3,
    phase: 1,
    title: "Building with the Claude API",
    domains: ["D4", "D1"],
    milestone: "Tool use, structured output, prompt cachingを自プロジェクトに実装",
    resources: [
      {
        name: "Building with the Claude API",
        url: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
        category: "course",
      },
      {
        name: "Tool Use Documentation",
        url: "https://platform.claude.com/docs/en/build-with-claude/tool-use",
        category: "docs",
      },
      {
        name: "anthropics/courses (GitHub)",
        url: "https://github.com/anthropics/courses",
        category: "github",
      },
    ],
    tasks: [
      "APIコースのtool useセクション完了",
      "structured output (JSON schema)セクション完了",
      "prompt caching, extended thinkingセクション完了",
      "Career Explorerに1機能実装",
    ],
  },
  {
    week: 4,
    phase: 1,
    title: "Building with the Claude API（実践）",
    domains: ["D4", "D1"],
    milestone: "Tool use, structured output, prompt cachingを自プロジェクトに実装",
    resources: [
      {
        name: "Prompt Caching",
        url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
        category: "docs",
      },
      {
        name: "Extended Thinking",
        url: "https://platform.claude.com/docs/en/build-with-claude/extended-thinking",
        category: "docs",
      },
      {
        name: "anthropics/courses Tool Use Notebook",
        url: "https://github.com/anthropics/courses/tree/master/tool_use",
        category: "github",
      },
    ],
    tasks: [
      "GitHub anthropics/coursesのTool Useノートブック実行",
      "Prompt Evalノートブック実行",
      "自プロジェクトにprompt cachingを実装",
      "structured outputをJSON schemaで実装",
    ],
  },

  // ── Phase 2: 専門領域の深掘り (Week 5-10) ────────────────────
  {
    week: 5,
    phase: 2,
    title: "MCP (Model Context Protocol)",
    domains: ["D2"],
    milestone: "小規模MCPサーバーを1つ構築・動作確認",
    resources: [
      {
        name: "Intro to MCP",
        url: "https://learn.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic",
        category: "course",
      },
      {
        name: "MCP Documentation",
        url: "https://modelcontextprotocol.io/docs",
        category: "docs",
      },
      {
        name: "MCP GitHub",
        url: "https://github.com/modelcontextprotocol",
        category: "github",
      },
    ],
    tasks: [
      "Intro to MCPコース完了",
      "3プリミティブ（tools, resources, prompts）整理",
      "MCP SDKでHello World MCPサーバー作成",
      "Claude Codeに接続して動作確認",
    ],
  },
  {
    week: 6,
    phase: 2,
    title: "MCP Advanced Topics",
    domains: ["D2"],
    milestone: "小規模MCPサーバーを1つ構築・動作確認",
    resources: [
      {
        name: "MCP Documentation",
        url: "https://modelcontextprotocol.io/docs",
        category: "docs",
      },
      {
        name: "MCP Servers Registry",
        url: "https://github.com/modelcontextprotocol/servers",
        category: "github",
      },
    ],
    tasks: [
      "MCP Advanced Topicsコース完了",
      "Obsidianパイプライン用MCPサーバー構築",
      "resourcesとpromptsプリミティブを実装",
      "エラーハンドリングとセキュリティ考慮",
    ],
  },
  {
    week: 7,
    phase: 2,
    title: "Claude Code上級設定 & エージェント設計",
    domains: ["D3", "D1"],
    milestone: "3層CLAUDE.md + Hooks + Skills + Subagentを自プロジェクトに実装",
    resources: [
      {
        name: "Claude Code Best Practices",
        url: "https://docs.anthropic.com/en/docs/claude-code/best-practices",
        category: "docs",
      },
      {
        name: "Claude Code Subagents",
        url: "https://docs.anthropic.com/en/docs/claude-code/sub-agents",
        category: "docs",
      },
    ],
    tasks: [
      "code.claude.com/docs/en/best-practices 精読",
      "3層CLAUDE.md階層構築",
      "PreToolUse/PostToolUse hooks実装",
      ".claude/skills/ にプロジェクト固有スキル作成",
    ],
  },
  {
    week: 8,
    phase: 2,
    title: "Claude Code上級設定 & Subagent実践",
    domains: ["D3", "D1"],
    milestone: "3層CLAUDE.md + Hooks + Skills + Subagentを自プロジェクトに実装",
    resources: [
      {
        name: "Claude Code Overview",
        url: "https://code.claude.com/docs/en/overview",
        category: "docs",
      },
      {
        name: "Multi-agent Patterns",
        url: "https://platform.claude.com/docs/en/agent-sdk/subagents",
        category: "docs",
      },
    ],
    tasks: [
      "Subagent設計パターン試行",
      "settings.jsonのpermissions設定最適化",
      "CI/CDパイプラインにClaude Code組み込み検討",
      "自プロジェクトのhooks体系を整備",
    ],
  },
  {
    week: 9,
    phase: 2,
    title: "Agentic Architecture実践",
    domains: ["D1"],
    milestone: "Coordinator-subagentパターンでマルチエージェントシステム構築",
    resources: [
      {
        name: "Claude Agent SDK",
        url: "https://platform.claude.com/docs/en/agent-sdk/overview",
        category: "docs",
      },
      {
        name: "Multi-agent Orchestration",
        url: "https://platform.claude.com/docs/en/agent-sdk/subagents",
        category: "docs",
      },
    ],
    tasks: [
      "Agent SDK調査・ドキュメント読み込み",
      "Career Explorerにcoordinator-subagent実装",
      "トークンエコノミクス（context leak防止）設計",
      "エージェント間通信パターンのメモ作成",
    ],
  },
  {
    week: 10,
    phase: 2,
    title: "Agentic Architecture実践 + CI/CD統合",
    domains: ["D1"],
    milestone: "Coordinator-subagentパターンでマルチエージェントシステム構築",
    resources: [
      {
        name: "GitHub Actions + Claude Code",
        url: "https://docs.anthropic.com/en/docs/claude-code/github-actions",
        category: "docs",
      },
      {
        name: "Claude Code -p flag",
        url: "https://docs.anthropic.com/en/docs/claude-code/cli",
        category: "docs",
      },
    ],
    tasks: [
      "CI/CDにClaude Code統合（-pフラグ、GitHub Actions）",
      "自律エージェントのエラーリカバリーパターン実装",
      "マルチエージェントシステムのテスト戦略整理",
      "Phase 2総復習・弱点確認",
    ],
  },

  // ── Phase 3: 試験準備 + Ambassador準備 (Week 11-16) ──────────
  {
    week: 11,
    phase: 3,
    title: "Structured Output & Context Management",
    domains: ["D4", "D5"],
    milestone: "Validation-retry loop, escalation pattern実装",
    resources: [
      {
        name: "Structured Output Documentation",
        url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
        category: "docs",
      },
      {
        name: "Context Window Management",
        url: "https://platform.claude.com/docs/en/build-with-claude/token-counting",
        category: "docs",
      },
    ],
    tasks: [
      "JSON schema + validation-retry loop実装",
      "few-shot prompting最適化",
      "multi-pass reviewパターン構築",
      "progressive summarizationリスク理解",
    ],
  },
  {
    week: 12,
    phase: 3,
    title: "Context Management深掘り",
    domains: ["D4", "D5"],
    milestone: "Validation-retry loop, escalation pattern実装",
    resources: [
      {
        name: "Prompt Engineering Guide",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        category: "docs",
      },
      {
        name: "Error Handling & Reliability",
        url: "https://platform.claude.com/docs/en/build-with-claude/error-handling",
        category: "docs",
      },
    ],
    tasks: [
      "context positioning実験（先頭vs末尾の効果比較）",
      "escalation patternの実装",
      "大規模コンテキストでのパフォーマンス測定",
      "Phase 3前半の総復習",
    ],
  },
  {
    week: 13,
    phase: 3,
    title: "模擬試験 & 弱点補強",
    domains: ["D1", "D2", "D3", "D4", "D5"],
    milestone: "6シナリオ全てのアーキテクチャ設計書完成",
    resources: [
      {
        name: "CCA Practice Questions",
        url: "https://claudecertifications.com",
        category: "exam-prep",
      },
      {
        name: "Anthropic Documentation Hub",
        url: "https://docs.anthropic.com",
        category: "docs",
      },
    ],
    tasks: [
      "claudecertifications.com練習問題消化（D1, D2, D3）",
      "6シナリオ各1-2ページのアーキテクチャ設計書作成（前半3つ）",
      "弱点ドメインの追加学習",
      "ドメイン横断のメンタルモデル整理",
    ],
  },
  {
    week: 14,
    phase: 3,
    title: "模擬試験 & 最終仕上げ",
    domains: ["D1", "D2", "D3", "D4", "D5"],
    milestone: "6シナリオ全てのアーキテクチャ設計書完成",
    resources: [
      {
        name: "CCA Practice Questions",
        url: "https://claudecertifications.com",
        category: "exam-prep",
      },
      {
        name: "Claude Community",
        url: "https://community.anthropic.com",
        category: "community",
      },
    ],
    tasks: [
      "claudecertifications.com練習問題消化（D4, D5）",
      "6シナリオ各1-2ページのアーキテクチャ設計書作成（後半3つ）",
      "全16週の学習ログを振り返り",
      "受験スケジュール確定",
    ],
  },
  {
    week: 15,
    phase: 3,
    title: "Ambassador申請 & 受験準備",
    domains: ["D1", "D2", "D3", "D4", "D5"],
    milestone: "Ambassador申請提出 + CCA受験完了",
    resources: [
      {
        name: "Claude Community Ambassador Program",
        url: "https://community.anthropic.com/ambassador",
        category: "community",
      },
      {
        name: "CCA Foundations Exam",
        url: "https://claudecertifications.com/foundations",
        category: "exam-prep",
      },
    ],
    tasks: [
      "Ambassador申請書作成・提出",
      "東京ミートアップ企画案作成",
      "最終レビュー（全ドメイン総復習）前半",
      "受験環境確認・予約",
    ],
  },
  {
    week: 16,
    phase: 3,
    title: "CCA Foundations受験",
    domains: ["D1", "D2", "D3", "D4", "D5"],
    milestone: "Ambassador申請提出 + CCA受験完了",
    resources: [
      {
        name: "CCA Foundations Exam",
        url: "https://claudecertifications.com/foundations",
        category: "exam-prep",
      },
      {
        name: "Anthropic Documentation Hub",
        url: "https://docs.anthropic.com",
        category: "docs",
      },
    ],
    tasks: [
      "最終レビュー（全ドメイン総復習）後半",
      "CCA Foundations受験",
      "受験結果の振り返り・記録",
      "次のステップ計画（Ambassador活動、上位資格）",
    ],
  },
];
