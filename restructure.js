const fs = require('fs');
const path = require('path');

const desktop = 'C:/Users/singo/OneDrive/デスクトップ';
const src = path.join(desktop, '旅行者マッチングサイト');
const newRoot = path.join(desktop, 'AIエージェント組織');

// コピー関数（再帰）
function copyRecursive(from, to, excludes = []) {
  if (excludes.some(e => from.endsWith(e))) return;
  const stat = fs.statSync(from);
  if (stat.isDirectory()) {
    fs.mkdirSync(to, { recursive: true });
    for (const item of fs.readdirSync(from)) {
      copyRecursive(path.join(from, item), path.join(to, item), excludes);
    }
  } else {
    fs.copyFileSync(from, to);
  }
}

// 移動関数（rename → 失敗したらcopy+delete）
function moveDir(from, to) {
  try {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.renameSync(from, to);
    console.log(`移動: ${path.basename(from)} → ${to.replace(desktop, '')}`);
  } catch (e) {
    copyRecursive(from, to);
    fs.rmSync(from, { recursive: true, force: true });
    console.log(`コピー移動: ${path.basename(from)} → ${to.replace(desktop, '')}`);
  }
}

// 1. 事業部フォルダを AIエージェント組織/ 直下に移動
const divisions = ['01_Health_Care', '02_Travel', '03_Event', '04_Welfare', '05_Education'];
for (const div of divisions) {
  const from = path.join(src, div);
  const to = path.join(newRoot, div);
  if (fs.existsSync(from)) {
    // 02_Travel は既存フォルダとマージが必要
    if (div === '02_Travel' && fs.existsSync(to)) {
      // Agents フォルダだけ移動してマージ
      const agentsFrom = path.join(from, 'Agents');
      const agentsTo = path.join(to, 'Agents');
      if (fs.existsSync(agentsFrom)) {
        moveDir(agentsFrom, agentsTo);
      }
      fs.rmSync(from, { recursive: true, force: true });
      console.log(`02_Travel/Agents をマージしました`);
    } else {
      moveDir(from, to);
    }
  }
}

// 2. サイトソースを 02_Travel/Dev/旅行者マッチングサイト/ にコピー
const devDest = path.join(newRoot, '02_Travel', 'Dev', '旅行者マッチングサイト');
const excludeDirs = ['node_modules', '.next', '01_Health_Care', '02_Travel', '03_Event', '04_Welfare', '05_Education', 'restructure.js'];
console.log(`\nサイトを ${devDest.replace(desktop, '')} にコピー中...`);
fs.mkdirSync(devDest, { recursive: true });
for (const item of fs.readdirSync(src)) {
  if (excludeDirs.includes(item)) continue;
  copyRecursive(path.join(src, item), path.join(devDest, item));
}
console.log('サイトのコピー完了');

// 3. 完成した構造を表示
console.log('\n=== 完成した構造 ===');
function showTree(dir, indent = '') {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === '.next') continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    console.log(indent + (stat.isDirectory() ? '📁 ' : '📄 ') + item);
    if (stat.isDirectory() && indent.length < 12) {
      showTree(full, indent + '  ');
    }
  }
}
showTree(newRoot);

console.log('\n完了！旧フォルダ（旅行者マッチングサイト）はまだデスクトップに残っています。');
console.log('問題なければ手動で削除してください。');
