# 共享单位数据池（跨分类复用，避免每篇重复抓取/重复引用同一批数据）

维护说明：这不是全量数据库（游戏共 353 个单位），是"已经逐个打开 Fandom 独立页面
核实过"的单位清单。2026-09-13 按用户批准的扩量任务，从 10 个扩到 23 个
（20 个当前可获得 + 3 个已下架仅供参考），覆盖 5 个稀有度档（Uncommon→Godly）和
9 种功能类型。每行都有可点开复核的来源 URL。Cost Efficiency 只在 wiki 页面明确
给出时才填，没给出的一律写"未提供"，不代替 wiki 计算（wiki 的算法是"满级DPS÷
全部升级总花费×1000"，不是简单的"满级DPS÷初始摆放成本"，自己算容易算错）。

## 当前可获得（20 个）

| 单位 | 稀有度 | 类型 | 满级 DPS | Cost Efficiency | Placement Cost | 获取方式 | 来源 |
|---|---|---|---|---|---|---|---|
| Venus Flytrap | Godly | 单体 | 3750 | 71.9 | 2900 | Enchanted Summon 0.01% | wiki/Venus_Flytrap |
| Bouncing Shroom | Godly | AoE（沿路径弹跳） | 3200 | 22.1 | 3200 | Greenhouse Summon 0.005% | wiki/Bouncing_Shroom |
| Rafflesia | Godly | 陷阱（吸附怪物） | 1500 | **162.2**（已知最高） | 1250 | Mystery Trader 商店 20% | wiki/Rafflesia |
| Beehive | Godly | 生成器（无限射程） | ~900（推算） | 32.1 | 1500 | Bee Summon 0.01% | wiki/Beehive |
| Confusion Plant | Godly | 控制（击退/转向敌人） | 734 | 19.3 | 2750 | Tropical Summon 0.01% | wiki/Confusion_Plant |
| Stun Flower | Godly | 控制（眩晕） | 450 | 38.3 | 800 | Tropical Summon 0.14% | wiki/Stun_Flower |
| Lucky Clover | Godly | 辅助（增益：暴击率+10%全队增伤） | 无（自身不输出） | 0 | 1500 | Sun Summon 0.005% | wiki/Lucky_Clover |
| Laser Plant | Legendary | 单体（Burst倍率） | 667 | 未提供 | 1500 | Enchanted Summon 0.99% | wiki/Laser_Plant |
| Watermelon | Legendary | 单体（Burst倍率） | 480 | 未提供 | 1000 | Classic Summon 1% | wiki/Watermelon |
| Peas In A Pod | Legendary | 单体 | 375 | 未提供 | 1000 | Classic Summon 1% | wiki/Peas_In_A_Pod |
| Sunflower | Legendary | 单体（新手可及） | 397 | 未提供 | 1200 | Classic Summon 0.99% | wiki/Sunflower |
| Repair Worker | Legendary | 辅助（回复基地血量，无输出） | 无 | 不适用 | 500 | Bee Summon 1% | wiki/Repair_Worker |
| Broccoli | Epic | 单体（近战冲撞） | 667 | 未提供 | 800 | Classic Summon 1% | wiki/Broccoli |
| Palm Tree | Epic | 单体 | 454 | 未提供 | 500 | Classic Summon 4-5% | wiki/Palm_Tree |
| Drone | Epic | 生成器（无限射程） | 350 | 未提供 | 1250 | Mystery Trader 16.66% | wiki/Drone |
| Umbra | Epic | 侦查（可攻击隐身敌人） | 300 | 未提供 | 1500 | Tropical Summon 4% | wiki/Umbra |
| Ghost Pepper | Rare | 单体（附带持续燃烧伤害） | 177 | 未提供 | 400 | Enchanted Summon 14% | wiki/Ghost_Pepper |
| Bamboo | Rare | 单体 | 150 | 未提供 | 500 | Classic Summon 10% | wiki/Bamboo |
| Money Tree | Rare | 农场（产 Seeds，无输出） | 无 | 不适用 | 400 | Classic Summon 11% | wiki/Money_Tree |
| Farmer | Uncommon | 单体（新手可及） | 102 | 未提供 | 200 | Classic Summon 15-17% | wiki/Farmer |

## 已下架 / 不可获得（3 个，仅供参考，不进任何"推荐"名单）

| 单位 | 稀有度 | 满级 DPS | Cost Efficiency | 状态 | 来源 |
|---|---|---|---|---|---|
| Golem | Exclusive | 2167 | 52 | 2025-06 限时下线 | wiki/Golem |
| Astraflora | Exclusive | 7050 | 61.7 | 限量 10,101 份已售罄 | wiki/Astraflora |
| Seedmill | Legendary | 不适用（农场增益型） | 不适用 | Spring Bundle 已下架 | wiki/Seedmill |

（以上来源 URL 前缀均为 `https://gtd.fandom.com/`）

## 各分类页引用规则（沿用两轮同伴 review 后的共识，扩量后依然适用）

- 每篇排名类正文开头必须写清楚"本页按什么排序"，六篇不用同一个排序依据：
  - Best DPS → 只看满级 DPS 数值，纯排序，只列当前可获得单位
  - Best Units → DPS 与 Cost Efficiency 综合，只用 wiki 明确给出 Cost Efficiency
    的单位
  - Tier List → 官方稀有度分档为骨架 + 少量深挖案例（含无输出的辅助型单位，
    说明"不是所有单位都能塞进DPS排名"）
  - Plants → 方法论页，不是排名，例子尽量选和其他页不同的单位
  - Early Game → 只看 Classic Summon（最便宜起始钥匙）里能抽到的单位
  - Loadout → 按角色分工（单体/AoE/陷阱/生成器/控制/辅助/侦查），不是数值排序，
    这是唯一需要覆盖"无输出支援型"单位的页面
- 已下架单位（Golem/Astraflora/Seedmill）一律放在文末独立的"不可获得/仅供参考"
  区块，不出现在任何推荐名单里。
- 同一个单位不刻意堆在同一批"推荐名单"里；Venus Flytrap / Rafflesia 因为数值
  本身突出（分别是"当前可获得最高DPS"和"当前已知最高性价比"），允许在多篇
  出现，但每篇引用它们的角度不同（DPS排名 / 性价比排名 / 稀有度框架案例），
  不是简单复制同一段文字。
- 这个数据池目前 23 个单位，不是全量。是否要给每篇排名页加第二个非 Fandom
  来源（实测视频/交易市场数据）——见下方"第二来源"任务，只对 Loadout/Endless/
  PvP 三篇执行，其余页面维持 Fandom 单一来源（游戏内客观数值已经满足用户标准
  第1类，不强制要求）。
