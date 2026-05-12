import type { WeekPlan } from "./types";

export const WEEK_PLANS: WeekPlan[] = [
  {
    week: 1, phase: 1,
    title: { en: "Claude Code in Action + Claude 101", he: "Claude Code in Action + Claude 101" },
    domains: ["D3"],
    milestone: { en: "Explain the CLAUDE.md hierarchy, Skills, and Hooks design philosophy", he: "להסביר את היררכיית CLAUDE.md, Skills ופילוסופיית Hooks" },
    resources: [
      { name: "Claude Code in Action", url: "https://anthropic.skilljar.com/claude-code-in-action", category: "course" },
      { name: "Claude 101",            url: "https://anthropic.skilljar.com/claude-101",            category: "course" },
      { name: "Claude Code Docs",      url: "https://docs.anthropic.com/en/docs/claude-code",      category: "docs"   },
    ],
    tasks: [
      { en: "Complete the Claude Code in Action course", he: "סיימו את קורס Claude Code in Action" },
      { en: "Skim Claude 101 (skip familiar parts)",     he: "סקירת Claude 101 (דלגו על חלקים מוכרים)" },
      { en: "Add a CLAUDE.md to your own project",       he: "הוסיפו CLAUDE.md לפרויקט שלכם" },
      { en: "Write up Skills/Hooks design notes",        he: "סכמו בכתב את עקרונות העיצוב של Skills/Hooks" },
    ],
  },
  {
    week: 2, phase: 1,
    title: { en: "Claude Code in Action + Claude 101 (consolidation)", he: "Claude Code in Action + Claude 101 (הטמעה)" },
    domains: ["D3"],
    milestone: { en: "Explain the CLAUDE.md hierarchy, Skills, and Hooks design philosophy", he: "להסביר את היררכיית CLAUDE.md, Skills ופילוסופיית Hooks" },
    resources: [
      { name: "Claude Code Best Practices",   url: "https://docs.anthropic.com/en/docs/claude-code/best-practices", category: "docs" },
      { name: "Claude Code Settings & Hooks", url: "https://docs.anthropic.com/en/docs/claude-code/hooks",         category: "docs" },
    ],
    tasks: [
      { en: "Set up a 3-tier CLAUDE.md (global / project / sub)", he: "הקימו CLAUDE.md תלת-שכבתי (גלובלי / פרויקט / משנה)" },
      { en: "Prototype one PreToolUse hook",                       he: "נסו hook ראשון של PreToolUse" },
      { en: "Create one skill under .claude/skills/",              he: "צרו skill אחד תחת .claude/skills/" },
      { en: "Build the habit of logging study to the tracker",     he: "פתחו הרגל של תיעוד לימוד למעקב" },
    ],
  },
  {
    week: 3, phase: 1,
    title: { en: "Building with the Claude API", he: "בנייה עם Claude API" },
    domains: ["D4", "D1"],
    milestone: { en: "Implement tool use, structured output, and prompt caching in your own project", he: "ממשו tool use, structured output ו-prompt caching בפרויקט שלכם" },
    resources: [
      { name: "Building with the Claude API",  url: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",      category: "course" },
      { name: "Tool Use Documentation",        url: "https://platform.claude.com/docs/en/build-with-claude/tool-use",    category: "docs"   },
      { name: "anthropics/courses (GitHub)",   url: "https://github.com/anthropics/courses",                              category: "github" },
    ],
    tasks: [
      { en: "Finish the tool use section of the API course",       he: "סיימו את חלק ה-tool use של קורס ה-API" },
      { en: "Finish the structured output (JSON schema) section",  he: "סיימו את חלק ה-structured output (JSON schema)" },
      { en: "Finish prompt caching + extended thinking sections",  he: "סיימו את החלקים של prompt caching ו-extended thinking" },
      { en: "Ship one feature using the API in a real project",    he: "שלחו פיצ׳ר אמיתי שמשתמש ב-API בפרויקט אמיתי" },
    ],
  },
  {
    week: 4, phase: 1,
    title: { en: "Building with the Claude API (hands-on)", he: "בנייה עם Claude API (תרגול מעשי)" },
    domains: ["D4", "D1"],
    milestone: { en: "Implement tool use, structured output, and prompt caching in your own project", he: "ממשו tool use, structured output ו-prompt caching בפרויקט שלכם" },
    resources: [
      { name: "Prompt Caching",                       url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",    category: "docs"   },
      { name: "Extended Thinking",                    url: "https://platform.claude.com/docs/en/build-with-claude/extended-thinking", category: "docs"   },
      { name: "anthropics/courses Tool Use Notebook", url: "https://github.com/anthropics/courses/tree/master/tool_use",              category: "github" },
    ],
    tasks: [
      { en: "Run the Tool Use notebook from anthropics/courses", he: "הריצו את ה-notebook של Tool Use מ-anthropics/courses" },
      { en: "Run the Prompt Eval notebook",                       he: "הריצו את ה-notebook של Prompt Eval" },
      { en: "Add prompt caching to your project",                 he: "הוסיפו prompt caching לפרויקט שלכם" },
      { en: "Implement structured output via JSON schema",        he: "ממשו structured output דרך JSON schema" },
    ],
  },
  {
    week: 5, phase: 2,
    title: { en: "MCP (Model Context Protocol)", he: "MCP (Model Context Protocol)" },
    domains: ["D2"],
    milestone: { en: "Build and run a small MCP server", he: "בנו והריצו שרת MCP קטן" },
    resources: [
      { name: "Intro to MCP",         url: "https://learn.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic", category: "course" },
      { name: "MCP Documentation",    url: "https://modelcontextprotocol.io/docs",                                                  category: "docs"   },
      { name: "MCP GitHub",           url: "https://github.com/modelcontextprotocol",                                                category: "github" },
    ],
    tasks: [
      { en: "Complete the Intro to MCP course",                            he: "סיימו את קורס Intro to MCP" },
      { en: "Map the 3 primitives (tools, resources, prompts)",            he: "מפו את 3 ה-primitives (tools, resources, prompts)" },
      { en: "Build a Hello World MCP server with the SDK",                 he: "בנו שרת MCP בסיסי (Hello World) עם ה-SDK" },
      { en: "Connect it to Claude Code and verify it works",               he: "חברו אותו ל-Claude Code ואמתו שעובד" },
    ],
  },
  {
    week: 6, phase: 2,
    title: { en: "MCP Advanced Topics", he: "MCP — נושאים מתקדמים" },
    domains: ["D2"],
    milestone: { en: "Build and run a small MCP server", he: "בנו והריצו שרת MCP קטן" },
    resources: [
      { name: "MCP Documentation",    url: "https://modelcontextprotocol.io/docs",                       category: "docs"   },
      { name: "MCP Servers Registry", url: "https://github.com/modelcontextprotocol/servers",            category: "github" },
    ],
    tasks: [
      { en: "Complete MCP Advanced Topics",                       he: "סיימו את MCP Advanced Topics" },
      { en: "Build an MCP server for an Obsidian pipeline",       he: "בנו שרת MCP ל-pipeline של Obsidian" },
      { en: "Implement resources and prompts primitives",         he: "ממשו את ה-primitives של resources ו-prompts" },
      { en: "Think through error handling and security",          he: "חשבו על טיפול בשגיאות ועל אבטחה" },
    ],
  },
  {
    week: 7, phase: 2,
    title: { en: "Advanced Claude Code config & agent design", he: "הגדרות מתקדמות של Claude Code ועיצוב סוכנים" },
    domains: ["D3", "D1"],
    milestone: { en: "Wire up a 3-tier CLAUDE.md + Hooks + Skills + Subagents in your project", he: "חברו CLAUDE.md תלת-שכבתי + Hooks + Skills + Subagents בפרויקט שלכם" },
    resources: [
      { name: "Claude Code Best Practices", url: "https://docs.anthropic.com/en/docs/claude-code/best-practices", category: "docs" },
      { name: "Claude Code Subagents",      url: "https://docs.anthropic.com/en/docs/claude-code/sub-agents",     category: "docs" },
    ],
    tasks: [
      { en: "Read code.claude.com/docs/en/best-practices closely",   he: "קראו את code.claude.com/docs/en/best-practices היטב" },
      { en: "Build the 3-tier CLAUDE.md hierarchy",                  he: "בנו את היררכיית CLAUDE.md התלת-שכבתית" },
      { en: "Implement PreToolUse / PostToolUse hooks",              he: "ממשו hooks של PreToolUse / PostToolUse" },
      { en: "Add a project-specific skill under .claude/skills/",    he: "הוסיפו skill ספציפי לפרויקט תחת .claude/skills/" },
    ],
  },
  {
    week: 8, phase: 2,
    title: { en: "Advanced Claude Code config & Subagents in practice", he: "Claude Code מתקדם ותרגול Subagents" },
    domains: ["D3", "D1"],
    milestone: { en: "Wire up a 3-tier CLAUDE.md + Hooks + Skills + Subagents in your project", he: "חברו CLAUDE.md תלת-שכבתי + Hooks + Skills + Subagents בפרויקט שלכם" },
    resources: [
      { name: "Claude Code Overview",  url: "https://code.claude.com/docs/en/overview",                  category: "docs" },
      { name: "Multi-agent Patterns",  url: "https://platform.claude.com/docs/en/agent-sdk/subagents",   category: "docs" },
    ],
    tasks: [
      { en: "Experiment with subagent design patterns",          he: "התנסו בדפוסי עיצוב של subagents" },
      { en: "Tune settings.json permissions",                    he: "כיילו הרשאות ב-settings.json" },
      { en: "Plan Claude Code integration into CI/CD",           he: "תכננו אינטגרציית Claude Code ב-CI/CD" },
      { en: "Organize the hooks structure in your project",      he: "ארגנו את מערך ה-hooks בפרויקט" },
    ],
  },
  {
    week: 9, phase: 2,
    title: { en: "Agentic Architecture in practice", he: "ארכיטקטורת סוכנים בפועל" },
    domains: ["D1"],
    milestone: { en: "Build a multi-agent system with the coordinator–subagent pattern", he: "בנו מערכת רב-סוכנית בדפוס coordinator–subagent" },
    resources: [
      { name: "Claude Agent SDK",          url: "https://platform.claude.com/docs/en/agent-sdk/overview",  category: "docs" },
      { name: "Multi-agent Orchestration", url: "https://platform.claude.com/docs/en/agent-sdk/subagents", category: "docs" },
    ],
    tasks: [
      { en: "Study the Agent SDK docs end-to-end",                  he: "למדו את תיעוד Agent SDK מתחילתו לסופו" },
      { en: "Implement a coordinator-subagent flow in a project",   he: "ממשו זרימת coordinator-subagent בפרויקט" },
      { en: "Design token economics (prevent context leak)",        he: "תכננו טוקנים-אקונומיקס (מנע context leak)" },
      { en: "Write notes on inter-agent communication patterns",    he: "תעדו דפוסי תקשורת בין סוכנים" },
    ],
  },
  {
    week: 10, phase: 2,
    title: { en: "Agentic Architecture + CI/CD integration", he: "ארכיטקטורת סוכנים + אינטגרציית CI/CD" },
    domains: ["D1"],
    milestone: { en: "Build a multi-agent system with the coordinator–subagent pattern", he: "בנו מערכת רב-סוכנית בדפוס coordinator–subagent" },
    resources: [
      { name: "GitHub Actions + Claude Code", url: "https://docs.anthropic.com/en/docs/claude-code/github-actions", category: "docs" },
      { name: "Claude Code -p flag",          url: "https://docs.anthropic.com/en/docs/claude-code/cli",            category: "docs" },
    ],
    tasks: [
      { en: "Integrate Claude Code into CI/CD", he: "שילבו Claude Code ב-CI/CD" },
      { en: "Implement error recovery for autonomous agents", he: "ממשו error recovery לסוכנים אוטונומיים" },
      { en: "Sketch a test strategy for multi-agent systems", he: "בנו אסטרטגיית בדיקות למערכות רב-סוכניות" },
      { en: "Review Phase 2 end-to-end, identify weak spots", he: "סקרו את Phase 2 מקצה לקצה וזהו נקודות חולשה" },
    ],
  },
  {
    week: 11, phase: 3,
    title: { en: "Structured Output & Context Management", he: "Structured Output וניהול הקשר" },
    domains: ["D4", "D5"],
    milestone: { en: "Implement a validation-retry loop and an escalation pattern", he: "ממשו validation-retry loop ו-escalation pattern" },
    resources: [
      { name: "Structured Output Documentation", url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs", category: "docs" },
      { name: "Context Window Management",       url: "https://platform.claude.com/docs/en/build-with-claude/token-counting",     category: "docs" },
    ],
    tasks: [
      { en: "Implement JSON schema + validation-retry loop",     he: "ממשו JSON schema + validation-retry loop" },
      { en: "Tune few-shot prompting",                            he: "כיילו few-shot prompting" },
      { en: "Set up a multi-pass review pattern",                 he: "הקימו דפוס multi-pass review" },
      { en: "Understand the risks of progressive summarization",  he: "הבינו את הסיכונים של progressive summarization" },
    ],
  },
  {
    week: 12, phase: 3,
    title: { en: "Context Management deep dive", he: "ניהול הקשר — צלילה לעומק" },
    domains: ["D4", "D5"],
    milestone: { en: "Implement a validation-retry loop and an escalation pattern", he: "ממשו validation-retry loop ו-escalation pattern" },
    resources: [
      { name: "Prompt Engineering Guide",   url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", category: "docs" },
      { name: "Error Handling & Reliability", url: "https://platform.claude.com/docs/en/build-with-claude/error-handling",            category: "docs" },
    ],
    tasks: [
      { en: "Experiment with context positioning (start vs end)", he: "התנסו ב-context positioning (התחלה לעומת סוף)" },
      { en: "Implement an escalation pattern",                     he: "ממשו escalation pattern" },
      { en: "Measure performance on large contexts",               he: "מדדו ביצועים על הקשרים גדולים" },
      { en: "Mid-phase review of Phase 3",                         he: "סקירת אמצע של Phase 3" },
    ],
  },
  {
    week: 13, phase: 3,
    title: { en: "Mock exam + shore up weak areas", he: "מבחן דמה + חיזוק נקודות חלשות" },
    domains: ["D1", "D2", "D3", "D4", "D5"],
    milestone: { en: "Complete architecture briefs for all 6 exam scenarios", he: "השלימו מסמכי ארכיטקטורה ל-6 תרחישי המבחן" },
    resources: [
      { name: "CCA Practice Questions",      url: "https://claudecertifications.com", category: "exam-prep" },
      { name: "Anthropic Documentation Hub", url: "https://docs.anthropic.com",        category: "docs"      },
    ],
    tasks: [
      { en: "Work through D1/D2/D3 practice questions",                                he: "פתרו שאלות תרגול של D1/D2/D3" },
      { en: "Write 1-2 page architecture briefs for 3 of 6 scenarios",                 he: "כתבו מסמכי ארכיטקטורה של 1-2 עמודים ל-3 מ-6 התרחישים" },
      { en: "Extra study on weak domains",                                              he: "לימוד נוסף בדומיינים חלשים" },
      { en: "Build cross-domain mental models",                                         he: "בנו מודלים מנטליים חוצי-דומיינים" },
    ],
  },
  {
    week: 14, phase: 3,
    title: { en: "Mock exam + final polish", he: "מבחן דמה + ליטוש סופי" },
    domains: ["D1", "D2", "D3", "D4", "D5"],
    milestone: { en: "Complete architecture briefs for all 6 exam scenarios", he: "השלימו מסמכי ארכיטקטורה ל-6 תרחישי המבחן" },
    resources: [
      { name: "CCA Practice Questions", url: "https://claudecertifications.com",   category: "exam-prep" },
      { name: "Claude Community",       url: "https://community.anthropic.com",     category: "community" },
    ],
    tasks: [
      { en: "Work through D4/D5 practice questions",                                  he: "פתרו שאלות תרגול של D4/D5" },
      { en: "Architecture briefs for the remaining 3 scenarios",                       he: "מסמכי ארכיטקטורה ל-3 התרחישים שנותרו" },
      { en: "Review all 16 weeks of study logs",                                       he: "עברו על כל יומני הלימוד של 16 השבועות" },
      { en: "Lock in your exam date",                                                  he: "קבעו את תאריך המבחן" },
    ],
  },
  {
    week: 15, phase: 3,
    title: { en: "Ambassador application + exam prep", he: "הגשת Ambassador + הכנה למבחן" },
    domains: ["D1", "D2", "D3", "D4", "D5"],
    milestone: { en: "Submit Ambassador application and complete CCA Foundations", he: "להגיש בקשת Ambassador ולהשלים CCA Foundations" },
    resources: [
      { name: "Claude Community Ambassador Program", url: "https://community.anthropic.com/ambassador",     category: "community" },
      { name: "CCA Foundations Exam",                url: "https://claudecertifications.com/foundations",   category: "exam-prep" },
    ],
    tasks: [
      { en: "Draft and submit the Ambassador application", he: "כתבו והגישו את בקשת ה-Ambassador" },
      { en: "Propose a local meetup",                       he: "הציעו meetup מקומי" },
      { en: "First half of final review (all domains)",     he: "מחצית ראשונה של הסקירה הסופית (כל הדומיינים)" },
      { en: "Confirm exam environment + booking",           he: "אמתו את סביבת המבחן וההרשמה" },
    ],
  },
  {
    week: 16, phase: 3,
    title: { en: "Take the CCA Foundations exam", he: "מבחן CCA Foundations" },
    domains: ["D1", "D2", "D3", "D4", "D5"],
    milestone: { en: "Submit Ambassador application and complete CCA Foundations", he: "להגיש בקשת Ambassador ולהשלים CCA Foundations" },
    resources: [
      { name: "CCA Foundations Exam",        url: "https://claudecertifications.com/foundations", category: "exam-prep" },
      { name: "Anthropic Documentation Hub", url: "https://docs.anthropic.com",                   category: "docs"      },
    ],
    tasks: [
      { en: "Second half of final review (all domains)",                he: "מחצית שנייה של הסקירה הסופית (כל הדומיינים)" },
      { en: "Take the CCA Foundations exam",                             he: "גשו למבחן CCA Foundations" },
      { en: "Reflect on and log the exam experience",                    he: "הרהרו ותעדו את חוויית המבחן" },
      { en: "Plan next steps (Ambassador activity, advanced certs)",     he: "תכננו את הצעדים הבאים (פעילות Ambassador, תעודות מתקדמות)" },
    ],
  },
];
