import { writeFileSync } from "fs";
import { loadArmorData } from "./lib/load-armor-data";
import { loadDecorationData, indexDecorationsBySkill } from "./lib/load-decoration-data";
import { pruneArmor } from "./lib/prune-armor";
import { generateCombinations } from "./lib/generate-combinations";
import { buildSkillTree } from "./lib/build-tree";
import { CombinationData } from "./lib/types";
import { ArmorKind } from "../src/app/api/mhdb/armor/Armor";

async function main() {
  console.log("=== Skill Tree Generation ===\n");

  // Step 1: Load armor and decoration data
  const armorByKind = await loadArmorData();
  const decorations = await loadDecorationData();
  const decorationIndex = indexDecorationsBySkill(decorations);

  console.log(`\nIndexed ${decorationIndex.size} skills across decorations`);

  // Step 2: Prune dominated armor pieces
  console.log("\nPruning dominated armor pieces...");
  const prunedArmor = new Map<ArmorKind, ReturnType<typeof pruneArmor>>();

  for (const kind of [
    ArmorKind.head,
    ArmorKind.chest,
    ArmorKind.arms,
    ArmorKind.waist,
    ArmorKind.legs,
  ]) {
    const pieces = armorByKind.get(kind) || [];
    prunedArmor.set(kind, pruneArmor(pieces));
  }

  // Step 3: Generate all combinations (with decoration slot consideration)
  console.log("\n");
  const combinations: CombinationData[] = [];

  for (const combo of generateCombinations(prunedArmor, decorationIndex)) {
    combinations.push(combo);
  }

  console.log(`Total combinations: ${combinations.length.toLocaleString()}`);

  // Step 4: Build skill tree
  const tree = buildSkillTree(combinations);

  // Step 5: Export to JSON
  console.log("\nExporting to JSON...");
  const outputPath = "./public/data/skill-tree.json";

  const json = JSON.stringify(tree, null, 2);
  writeFileSync(outputPath, json);

  const sizeKB = Buffer.byteLength(json) / 1024;
  const sizeMB = sizeKB / 1024;

  console.log(`Exported to ${outputPath}`);
  console.log(`File size: ${sizeMB.toFixed(2)} MB (${sizeKB.toFixed(0)} KB)`);

  // Calculate tree statistics
  const stats = calculateTreeStats(tree);
  console.log("\nTree Statistics:");
  console.log(`  Total nodes: ${stats.totalNodes}`);
  console.log(`  Leaf nodes: ${stats.leafNodes}`);
  console.log(`  Max depth: ${stats.maxDepth}`);
  console.log(`  Avg depth: ${stats.avgDepth.toFixed(1)}`);

  console.log("\n=== Generation Complete ===");
}

function calculateTreeStats(node: ReturnType<typeof buildSkillTree>, depth: number = 0): {
  totalNodes: number;
  leafNodes: number;
  maxDepth: number;
  totalDepth: number;
  leafCount: number;
  avgDepth: number;
} {
  let totalNodes = 1;
  let leafNodes = 0;
  let maxDepth = depth;
  let totalDepth = 0;
  let leafCount = 0;

  if (node.combinations !== undefined) {
    // This is a leaf node
    leafNodes = 1;
    totalDepth = depth;
    leafCount = 1;
  } else {
    // Traverse children
    for (const key in node.children) {
      const childStats = calculateTreeStats(node.children[key], depth + 1);
      totalNodes += childStats.totalNodes;
      leafNodes += childStats.leafNodes;
      maxDepth = Math.max(maxDepth, childStats.maxDepth);
      totalDepth += childStats.totalDepth;
      leafCount += childStats.leafCount;
    }
  }

  return {
    totalNodes,
    leafNodes,
    maxDepth,
    totalDepth,
    leafCount,
    avgDepth: leafCount > 0 ? totalDepth / leafCount : 0,
  };
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
