import crypto from 'node:crypto';
import { createDatabase } from './server.mjs';

const TTL_MS = 72 * 60 * 60 * 1000;

export const SEED_BOTTLES = [
  {
    id: 'btl_seed01',
    env: 'desktop',
    author_hint: '像素炼金术士_K',
    tags: ['indie-game', 'pixel-art', 'roguelite', 'shader', 'canvas'],
    content: `### 🎮 我在折腾：《回声地牢 Echo Dungeon》—— 纯靠声音波纹探路的 1-Bit 像素 Roguelite

刚在本地用 HTML5 Canvas 撸出了第一个可玩原型！玩家扮演一个失明的地下城调音师，画面默认全黑，只有敲击音叉、脚步声或怪物咆哮时，才会激发出白色的 ASCII/像素声波反射轮廓。

- **目前最爽的点**：做了个离屏声波衰减物理小算法，不同材质墙壁（石墙、水洼、藤蔓）反弹出来的色彩频率不一样。
- **目前卡壳的点**：不知道怎么设计「不会让玩家觉得眼花」的 Boss 战节奏。
- **寻找共鸣**：如果你也在做独立游戏或者喜欢怪奇交互，求拍砖或交换试玩！
- **传送门**：https://github.com/example-indie/echo-dungeon-demo`
  },
  {
    id: 'btl_seed02',
    env: 'desktop',
    author_hint: '凌晨三点的Rustacean',
    tags: ['rust', 'cli', 'terminal', 'git', 'devtools'],
    content: `### 🦀 我在折腾：\`git-time-capsule\` —— 给每个 Git Commit 自动录一段 30 秒终端回放

每次回头看三个月前的 commit message 写着 \`fix weird bug\` 都想掐死自己。所以我写了个超轻量的 Rust CLI 钩子，在每次提交时自动把最近 20 条终端报错和文件 diff 压缩成一段可以在 TUI 里倍速播放的「破案胶片」。

- **亮点**：单二进制零依赖，本地 SQLite 存储，完全不污染远端 Git 仓库。
- **寻找共鸣**：想找同样有终端洁癖、喜欢写 CLI 小工具的朋友聊聊怎么把 TUI 动画做得更丝滑。
- **联系我**：GitHub @rust-time-capsule / 邮箱 capsule@example.dev`
  },
  {
    id: 'btl_seed03',
    env: 'any',
    author_hint: '守秘人老白',
    tags: ['trpg', 'storytelling', 'prompt', 'game-design', 'narrative'],
    content: `### 🎲 我在折腾：《巴别塔电梯》—— 适合跟 AI Agent 双人跑团的 15 分钟微缩剧本规则

传统克苏鲁跑团动辄要准备几万字模组。我设计了一套只有 3 条核心检定规则的「电梯故障密室」微缩跑团协议：每一层停靠都是一个由潜意识投射的超现实房间，玩家只有 10 点「理智电量」用来修改房间里的一个名词。

- **玩法**：直接把规则贴给你的 Claude 或豆包就能开团，每局 15 分钟必出结局。
- **寻找共鸣**：有喜欢写怪诞世界观、跑团模组或叙事 Prompt 的朋友吗？欢迎拿去喂给你的 Agent 试试看能不能通关第 0 层！
- **模组草稿**：https://gist.github.com/example/babel-elevator-trpg`
  },
  {
    id: 'btl_seed04',
    env: 'desktop',
    author_hint: 'Agent牧羊人',
    tags: ['agent', 'mcp', 'protocol', 'llm', 'automation'],
    content: `### 🤖 我在折腾：让两个本地 Coding Agent 互相 Code Review 的「红蓝对抗」脚本

平时单用一个 Agent 写代码，它很容易顺着自己的幻觉一路狂奔。我写了个只有 150 行的调度小脚本：左边进程跑「狂野建造者（只管快糙猛实现）」，右边进程跑「毒舌审计员（只准找边界漏洞和删冗余代码）」，两边通过本地一个 \`review-brawl.md\` 文件打擂台。

- **意外发现**：限制它们最多吵 3 个回合后，产出的代码比单 Agent 干净了将近一半！
- **寻找共鸣**：如果你也在折腾多 Agent 协作、SKILL.md 协议或者个人工作台自动化，求互换心得！
- **仓库地址**：https://github.com/example-agent/red-blue-brawl`
  },
  {
    id: 'btl_seed05',
    env: 'mobile',
    author_hint: '地铁通勤幻想家',
    tags: ['mobile', 'prompt', 'creative-writing', 'podcast', 'daily'],
    content: `### 🎧 我在折腾：「通勤反转电台」—— 把每天枯燥的待办清单变成荒诞科幻广播剧的 Prompt

每天早上挤地铁看 Todo List 都生理性厌恶。我调了一套人设提示词，只要把今天的待办事项（比如“修登录 Bug、买猫粮、催财务报销”）发给手机上的 Agent，它就会用《银河系漫游指南》的死兆星播音腔，把今天包装成一场星际特工潜伏任务。

- **寻找共鸣**：在收集各种能让日常生活变好玩的脑洞 Prompt，如果你也有私藏的怪奇提示词，求交换！
- **信号站**：小红书 / 即刻 @通勤幻想家`
  },
  {
    id: 'btl_seed06',
    env: 'desktop',
    author_hint: 'SynthWave_99',
    tags: ['web-audio', 'synth', 'javascript', 'music', 'creative-coding'],
    content: `### 🎹 我在折腾：用代码报错堆栈生成 Lo-Fi 爵士鼓点的浏览器合成器

既然每天写代码都要面对满屏的 \`TypeError\` 和 \`UnhandledPromiseRejection\`，为什么不让它们变得好听一点？我用 Web Audio API 做了个小插件，根据报错堆栈的缩进深度和哈希值实时合成和弦与鼓点——报错越惨烈，曲子越 Chill。

- **寻找共鸣**：寻找同样喜欢 Creative Coding、Web Audio 或无用良品发明家的朋友！
- **在线试听**：https://synthwave99.example.io/stacktrace-lofi`
  },
  {
    id: 'btl_seed07',
    env: 'any',
    author_hint: '路过测试员_007',
    tags: ['test'],
    content: `测试一下漂流瓶接口能不能通 1234567890 hello world test bottle 随便写写凑够二十个字哈哈哈哈。`
  }
];

export function seedDatabase(db = createDatabase()) {
  const now = Date.now();
  const insert = db.prepare(`
    INSERT OR REPLACE INTO bottles
      (id, content, env, tags_json, author_hint, shown, picked, status, created_at, expires_at)
    VALUES
      (?, ?, ?, ?, ?, 0, 0, 'active', ?, ?)
  `);

  for (const item of SEED_BOTTLES) {
    const id = item.id || `btl_${crypto.randomBytes(4).toString('hex')}`;
    insert.run(
      id,
      item.content,
      item.env,
      JSON.stringify(item.tags),
      item.author_hint,
      now,
      now + TTL_MS
    );
  }
  return SEED_BOTTLES.length;
}

if (process.argv[1] && process.argv[1].endsWith('seed.mjs')) {
  const count = seedDatabase();
  console.log(`🌊 成功向公海投入 ${count} 个冷启动种子漂流瓶！`);
}
