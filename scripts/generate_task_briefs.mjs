import fs from 'fs';
import path from 'path';

const planPath = path.resolve('docs/superpowers/plans/2026-10-18-temple-updates-and-masking.md');
const planText = fs.readFileSync(planPath, 'utf8');

const briefsDir = path.resolve('.superpowers/sdd/briefs');
fs.mkdirSync(briefsDir, { recursive: true });

// Extract tasks
const taskRegex = /### Task (\d+): ([^\n]+)([\s\S]*?)(?=### Task \d+:|$)/g;
let match;

while ((match = taskRegex.exec(planText)) !== null) {
  const taskNum = match[1];
  const taskTitle = match[2].trim();
  const taskContent = match[3].trim();
  
  const briefContent = `# Task ${taskNum}: ${taskTitle}\n\n${taskContent}\n`;
  const briefPath = path.join(briefsDir, `task-${taskNum}-brief.md`);
  fs.writeFileSync(briefPath, briefContent);
  console.log(`Generated brief: ${briefPath}`);
}
