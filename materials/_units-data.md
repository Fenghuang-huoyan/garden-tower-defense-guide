# 共享单位数据池（跨分类复用，避免每篇重复抓取/重复引用同一批数据）

维护说明：这不是全量数据库，是"已经逐个打开 Fandom 独立页面核实过"的单位清单，
随各关键词调研逐步扩充。每行都有可点开复核的来源 URL。截至 2026-09-13 共 10 个。

## 当前可获得

| 单位 | 稀有度 | 类型 | 满级 DPS | Cost Efficiency (DPS/$1000) | Placement Cost | Placement Limit | 获取方式 | 来源 |
|---|---|---|---|---|---|---|---|---|
| Venus Flytrap | Godly | 单体输出 | 3750 | 71.9 | 2900 | 4 | Enchanted Summon 0.01% | gtd.fandom.com/wiki/Venus_Flytrap |
| Bouncing Shroom | Godly | AoE（沿路径弹跳） | 3200 | 22.1 | 3200 | 4 | Greenhouse Summon 0.005% | gtd.fandom.com/wiki/Bouncing_Shroom |
| Rafflesia | Godly | 陷阱（吸附怪物） | 1500 | **162.2**（已知最高） | 1250 | 6 | Mystery Trader 商店 20% 概率，75000 或 649 | gtd.fandom.com/wiki/Rafflesia |
| Beehive | Godly | 生成器（召唤蜜蜂，无限射程） | 约 900（由 Damage 2250 / Interval 2.5s 推算，wiki 未直接给 DPS 字段） | 32.1 | 1500 | 3 | Bee Summon 0.01% | gtd.fandom.com/wiki/Beehive |
| Money Tree | Rare | 农场（产钱，非战斗） | 不适用（无 DPS，产 Income） | 不适用 | 400 | 6 | Classic Summon 11% | gtd.fandom.com/wiki/Money_Tree |
| Sunflower | Legendary | 单体输出（新手可及） | 397 | 未提供 | 1200 | 8 | Classic Summon 0.99% | gtd.fandom.com/wiki/Sunflower |
| Farmer | Uncommon | 单体输出（新手可及） | 102 | 未提供 | 200 | N/A | Classic Summon 15%–17% | gtd.fandom.com/wiki/Farmer |

## 已下架 / 不可获得（仅供参考，不进任何"推荐"名单）

| 单位 | 稀有度 | 满级 DPS | Cost Efficiency | 状态 | 来源 |
|---|---|---|---|---|---|
| Golem | Exclusive | 2167 | 52 | 2025-06 限时下线 | gtd.fandom.com/wiki/Golem |
| Astraflora | Exclusive | 7050 | 61.7 | 限量 10,101 份已售罄 | gtd.fandom.com/wiki/Astraflora |
| Seedmill | Legendary | 不适用（农场增益型） | 不适用 | Spring Bundle 已下架 | gtd.fandom.com/wiki/Seedmill |

## 各分类页引用规则（这次同伴会话 review 后达成的一致意见）

- 每篇排名类正文开头必须写清楚"本页按什么排序"，五篇不能用同一个排序依据：
  - Best DPS → 只看满级 DPS 数值，纯排序
  - Best Units → DPS 与 Cost Efficiency 综合
  - Tier List → 官方稀有度分档为骨架 + 少量深挖案例
  - Loadout → 按角色分工（单体/AoE/陷阱/生成器/控制），不是数值排序
  - Plants → 不是排名，是"怎么看懂这些字段"的方法论页
- 已下架单位（Golem/Astraflora/Seedmill）一律放在文末独立的"不可获得/仅供参考"
  区块，不出现在任何推荐名单里。
- 这个数据池目前 10 个单位，不是全量（游戏里有 353 个单位），后续如果要扩到
  20-30 个规模、或者给每篇排名页加第二个非 Fandom 来源交叉验证，这是范围扩张，
  留给用户决定，不在本轮自动执行。
