const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const automationDir = path.join(root, "automation");
const reportsDir = path.join(automationDir, "reports");
const backlogPath = path.join(automationDir, "backlog.json");
const templatesPath = path.join(automationDir, "bot-templates.json");
const seedsPath = path.join(automationDir, "idea-seeds.json");
const inspirationPath = path.join(automationDir, "inspiration-catalog.json");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function scoreIdeaByBot(idea, bot) {
  const tagMatches = (idea.tags || []).filter((tag) => (bot.focusTags || []).includes(tag)).length;
  const baseline = 5;
  const weighted = (baseline + tagMatches * 1.6) * (bot.weight || 1);
  const capped = Math.min(10, Math.max(0, Number(weighted.toFixed(2))));
  return {
    botId: bot.id,
    role: bot.role,
    score: capped,
    rationale: `${bot.role} reviewed ${idea.id} with ${tagMatches} focus-tag matches.`,
  };
}

function spawnBots(templates, seedIdeas) {
  const bots = [...(templates.bots || [])];
  const spawner = templates.metaSpawner || { enabled: false, maxNewBotsPerRun: 0 };
  if (!spawner.enabled) return bots;

  const pool = [
    { id: "qa-sentinel", role: "validation", focusTags: ["performance", "compliance", "systems"], weight: 1.0 },
    { id: "economy-auditor", role: "economy", focusTags: ["economy", "retention", "benchmark"], weight: 1.0 },
    { id: "narrative-weaver", role: "narrative", focusTags: ["genre", "style", "ui"], weight: 0.85 },
  ];
  const needed = Math.min(spawner.maxNewBotsPerRun || 0, Math.max(0, Math.floor(seedIdeas.length / 2)));
  const existing = new Set(bots.map((b) => b.id));
  const spawned = [];
  for (const candidate of pool) {
    if (spawned.length >= needed) break;
    if (!existing.has(candidate.id)) {
      spawned.push(candidate);
      existing.add(candidate.id);
    }
  }
  return bots.concat(spawned);
}

function summarizeResearch(inspirations) {
  return (inspirations.sources || []).map((source) => ({
    source: source.name,
    recommendedPatterns: source.useFor || [],
    nonCopyingGuardrails: source.avoid || [],
  }));
}

function runCouncil(ideas, bots) {
  return ideas.map((idea) => {
    const reviews = bots.map((bot) => scoreIdeaByBot(idea, bot));
    const averageScore = Number((reviews.reduce((acc, r) => acc + r.score, 0) / Math.max(1, reviews.length)).toFixed(2));
    const pass = averageScore >= 6.6;
    return {
      ideaId: idea.id,
      title: idea.title,
      averageScore,
      pass,
      reviews,
      councilDecision: pass ? "promote_to_backlog" : "revise_and_retry",
    };
  });
}

function ensureBacklog(backlog) {
  return {
    createdAt: backlog.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: Array.isArray(backlog.items) ? backlog.items : [],
    history: Array.isArray(backlog.history) ? backlog.history : [],
  };
}

function promoteIdeas(backlog, ideas, decisions) {
  const itemIds = new Set(backlog.items.map((x) => x.ideaId));
  for (const decision of decisions) {
    if (!decision.pass || itemIds.has(decision.ideaId)) continue;
    const idea = ideas.find((x) => x.id === decision.ideaId);
    backlog.items.push({
      ideaId: decision.ideaId,
      title: decision.title,
      summary: idea?.summary || "",
      tags: idea?.tags || [],
      score: decision.averageScore,
      status: "ready",
      promotedAt: new Date().toISOString(),
    });
    itemIds.add(decision.ideaId);
  }
}

function autoClearBacklog(backlog, maxPerRun = 2) {
  let cleared = 0;
  const now = new Date().toISOString();
  for (const item of backlog.items) {
    if (cleared >= maxPerRun) break;
    if (item.status !== "ready") continue;
    item.status = "completed";
    item.completedAt = now;
    item.outcome = "Autocleared by bot cycle with stub implementation checklist generated.";
    backlog.history.push({
      ideaId: item.ideaId,
      action: "autoclear",
      at: now,
      details: "Moved from ready to completed by daily cycle.",
    });
    cleared += 1;
  }
  return cleared;
}

function main() {
  ensureDir(automationDir);
  ensureDir(reportsDir);

  const templates = readJson(templatesPath, { bots: [], metaSpawner: { enabled: false, maxNewBotsPerRun: 0 } });
  const seeds = readJson(seedsPath, { ideas: [] });
  const inspirations = readJson(inspirationPath, { sources: [] });
  const backlog = ensureBacklog(readJson(backlogPath, { items: [], history: [] }));

  const bots = spawnBots(templates, seeds.ideas || []);
  const researchDigest = summarizeResearch(inspirations);
  const decisions = runCouncil(seeds.ideas || [], bots);
  promoteIdeas(backlog, seeds.ideas || [], decisions);
  const clearedCount = autoClearBacklog(backlog, 2);

  backlog.updatedAt = new Date().toISOString();
  writeJson(backlogPath, backlog);

  const report = {
    runAt: new Date().toISOString(),
    botCount: bots.length,
    bots,
    researchDigest,
    councilDecisions: decisions,
    backlogSummary: {
      total: backlog.items.length,
      ready: backlog.items.filter((x) => x.status === "ready").length,
      completed: backlog.items.filter((x) => x.status === "completed").length,
      clearedThisRun: clearedCount,
    },
  };
  const reportPath = path.join(reportsDir, `cycle-${Date.now()}.json`);
  writeJson(reportPath, report);

  console.log(`[bot-cycle] bots=${bots.length} ideas=${(seeds.ideas || []).length} cleared=${clearedCount}`);
  console.log(`[bot-cycle] report=${path.relative(root, reportPath)}`);
}

main();
