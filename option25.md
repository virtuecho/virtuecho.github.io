# 期权策略分级表

## 一级（最基础，风险有限）
| 中文名称 | 英文名称 | 一句话解释 | 举例 | 风险 |
|----------|----------|------------|------|------|
| 持保看涨 | Covered Call | 持有股票并卖出对应Call，赚取权利金 | 买100股AAPL + 卖1张AAPL 200 Call | 部分有限风险（下跌无限，下行风险来自股票） |
| 持保篮子看涨 | Covered Call on Portfolio | 基于ETF或组合做Covered Call | 买SPY ETF + 卖SPY Call | 部分有限风险 |
| 买股卖权 | Buy-Write | 买股票同时写出Call（等同Covered Call） | 买100股MSFT + 卖1张Call | 部分有限风险 |

---

## 二级（包含一级 + 期权买入策略）
| 中文名称 | 英文名称 | 一句话解释 | 举例 | 风险 |
|----------|----------|------------|------|------|
| 买入看涨 | Long Call | 直接买Call，赌股价上涨 | 买AAPL 200 Call | 有限风险（最大亏损=权利金） |
| 买入看跌 | Long Put | 直接买Put，赌股价下跌 | 买AAPL 180 Put | 有限风险 |
| 备兑看跌 | Cash-Secured Put | 卖Put并准备现金买入标的 | 卖AAPL 180 Put，备足现金 | 有限风险（最大亏损=买入成本-权利金） |
| 保护性看涨 | Protective Call | 空头仓位买Call保护 | 卖空100股AAPL + 买200 Call | 有限风险 |
| 保护性看跌 | Protective Put | 多头仓位买Put保护 | 买100股AAPL + 买180 Put | 有限风险 |
| 买入跨式 | Long Straddle | 同价同期限买Call+Put，赌大波动 | 买AAPL 200 Call + 200 Put | 有限风险（最大亏损=总权利金） |
| 买入宽跨式 | Long Strangle | 不同行权价买Call+Put，赌大波动 | 买AAPL 210 Call + 190 Put | 有限风险 |
| 转换 | Conversion | 股票+期权组合锁定套利 | 买股票+买Put+卖Call | 有限风险（接近套利） |
| 买入看涨价差 | Bull Call Spread | 买低行权Call，卖高行权Call | 买190 Call，卖200 Call | 有限风险 |
| 买入看跌价差 | Bear Put Spread | 买高行权Put，卖低行权Put | 买200 Put，卖190 Put | 有限风险 |

---

## 三级（包含一二级 + 卖出有限风险策略）
| 中文名称 | 英文名称 | 一句话解释 | 举例 | 风险 |
|----------|----------|------------|------|------|
| 卖出看跌 | Short Put | 卖Put，赌股价不大跌 | 卖AAPL 180 Put | 无限风险（股价归零） |
| 卖出看跌价差 | Short Put Spread | 卖Put并买更低Put，限制风险 | 卖190 Put，买180 Put | 有限风险 |
| 卖出蝶式 | Short Butterfly Spread | 卖蝶式组合，赌股价不在中间 | 卖190/200/210蝶式 | 有限风险 |
| 合成 | Synthetic Position | 用期权模拟股票仓位 | Long Call + Short Put ≈ 多头股票 | 部分无限风险（取决于方向） |
| 卖出铁鹰式 | Short Iron Condor | 卖区间组合，赌股价维持区间 | 卖190 Put、买180 Put、卖210 Call、买220 Call | 有限风险 |
| 买入日历价差 | Long Calendar Spread | 买远期卖近期期权，赌波动上升 | 买200 Call(6月)，卖200 Call(4月) | 有限风险 |
| 逆转 | Reverse Conversion | 反向组合套利 | 卖股票+买Call+卖Put | 部分有限风险 |
| 买入蝶式 | Long Butterfly Spread | 用3行权价构建，赌收敛 | 买190 Call，卖2×200 Call，买210 Call | 有限风险 |
| 对角线价差 | Diagonal Spread | 不同到期+不同行权价组合 | 买200 Call(6月)，卖210 Call(4月) | 有限风险 |
| 卖出看涨价差 | Short Call Spread | 卖低Call，买高Call，赌不上涨 | 卖200 Call，买210 Call | 有限风险 |
| 非平衡蝶式 | Broken-Wing Butterfly | 调整蝶式倾斜风险 | 买190 Call，卖2×200 Call，买215 Call | 有限风险 |

---

## 四级（最高，含裸卖期权，无限风险）
| 中文名称 | 英文名称 | 一句话解释 | 举例 | 风险 |
|----------|----------|------------|------|------|
| 卖出裸看涨 | Naked Call | 无持股卖Call，风险无限 | 卖200 Call，无股票支撑 | 无限风险（股价无限上涨） |
| 卖出跨式 | Short Straddle | 卖同价Call+Put，赌股价稳定 | 卖200 Call + 卖200 Put | 无限风险 |
| 卖出宽跨式 | Short Strangle | 卖不同行权Call+Put，赌区间震荡 | 卖210 Call + 卖190 Put | 无限风险 |
| 卖出合成 | Synthetic Short | 用期权模拟空头 | Short Call + Long Put | 部分无限风险 |
| 买入铁鹰式 | Long Iron Condor | 买保护版铁鹰，风险有限 | 买180 Put、卖190 Put、卖210 Call、买220 Call | 有限风险 |
| 买入盒式价差 | Long Box Spread | 套利结构，锁定利率 | Bull Call Spread + Bear Put Spread | 有限风险 |
| 领式 | Collar | 股票+买Put+卖Call保护 | 买100股，买180 Put，卖210 Call | 有限风险 |
| 卖出领式 | Short Collar | 反向领式，风险更大 | 卖100股，卖180 Put，买210 Call | 部分无限风险 |
| 卖出日历价差 | Short Calendar Spread | 卖远期买近期，赌波动下降 | 卖200 Call(6月)，买200 Call(4月) | 无限风险 |
| 对角线价差（买入边先到期） | Diagonal Spread (Near Leg Long) | 特殊Diagonal，博弈时间/价差 | 买近月Call，卖远月不同价Call | 有限风险 |

---

# 1. The purchase of an American Style option contract is 购买美式期权合约是:
- A contract which does not require payment until expiration of the contract.
  - ❌ 购买期权时，权利金是立即支付的，不是到期才付。
- A contract which enables the buyer to exercise the option after expiration.
  - ❌ American style option 可以 在到期前任何时间行权，不是“到期后”。
- A contract which conveys to its holder the right, but not the obligation, to buy (for a call) or sell (for a put) the underlying product at a specified price on or before the expiration date.
  - ✅ 这是标准定义：期权买方拥有权利（但没有义务）在到期日之前或当天，以约定价格买入或卖出标的。
- A contract which requires the holder to buy (for a call) or sell (for a put) the underlying product at a specified price if the seller exercises the option on or before expiration date.
  - ❌ 期权买方不是必须履约的，只有卖方（writer）在被指派时才是“义务方”。
---
# 2. Option premium is 期权溢价/权利金是:
- The amount collected by the seller of a call option upon expiration of the contract.
  - ❌ 卖方是在期权成交时就收取权利金，不是到期才收。
- The price of the option which is paid by the buyer to the seller at the time of the transaction.
  - ✅ 这是标准定义：期权溢价 = 买方支付给卖方的期权价格。
- The amount that must be paid by the buyer to exercise the option contract.
  - ❌ 行权时支付的是执行价，不是溢价。
- The amount that the strike price is above the price of the underlying at time of purchase.
  - ❌ 这是描述期权的内在价值，不是溢价。
---
# 3. Which of the following investors will purchase stock if the option is exercised 如果行使期权，下列哪位投资者将购买股票?
* **Owner of a call（买入看涨期权的人）**
  行权时，他有权 **买入** 股票 → ✔ 会买入股票。
* **Owner of a put（买入看跌期权的人）**
  行权时，他有权 **卖出** 股票 → ❌ 他卖，不是买。
* **Writer of a call（卖出看涨期权的人）**
  如果被指派，他必须 **卖出** 股票 → ❌ 他卖，不是买。
* **Writer of a put（卖出看跌期权的人）**
  如果被指派，他必须 **买入** 股票 → ✔ 会买入股票。
所以最终：
* 会买股票的人是 **Call 买方** 和 **Put 卖方**。
---
# 4. As the underlying stock price increases, the premium of a call option will generally 随着标的股票价格上涨，看涨期权的权利金通常会:
- Increase ✅
- Decrease
- Remain the same
- Be negatively correlated
* **Call option（看涨期权）** 赋予买方在行权价买入标的的权利。
* 当标的股票价格上涨时，期权更有价值，因为买方可以用低于市场的价格买入。
* 因此，**股票价格↑ → Call 期权价值↑ → 溢价也随之增加**。
---
# 5. Who issues a U.S. listed option 谁发行美国上市期权?
- The member firm of the option writer
  - ❌ 券商只是中介，不是发行者。
- The exchange on which the option is purchased
  - ❌ 交易所只提供市场和规则，不负责发行。
- The investor who writes the option
  - ❌ 投资者是参与者，但并不是“发行者”。
- The Options Clearing Corp ✅
  - 在美国，所有标准化上市期权都是由 OCC 发行和担保的。OCC 作为中央对手方，保证交易履约，消除对手方风险。
---
# 6. A call is "in-the-money" when the market price of the underlying stock is 当标的股票的市场价格为 什么 时，看涨期权为“实值状态/价内期权”:
- Equal to the strike price
- Higher than the strike price **高于行权价​​** ✅
- Lower than the strike price
- Equal to the strike price plus or minus the premium
* **Call option（看涨期权）** 赋予买方以执行价买入股票的权利。
* 如果**市场价 > 执行价**，就可以用更低的价格买入 → 期权有内在价值 = In The Money。
* 其他情况：
  * Equal to strike → At The Money 平值
  * Lower than strike → Out of The Money 虚值
---
# 7. XYZ stock is trading at $25.75 and XYZ Jul 25 calls are trading at a premium of $2. What is the time value of the Jul 25 calls XYZ股票的交易价格为25.75美元，XYZ 7月25日看涨期权的交易价格为溢价2美元。7月25日看涨期权的时间价值是多少?
- $0
- $75
- $125 ✅
- $200
---
我们来分解一下：
* **标的价格 (Stock Price)** = 25.75
* **执行价 (Strike Price)** = 25
* **期权溢价 (Premium)** = 2
---
### 第一步：算内在价值 (Intrinsic Value)
Call 内在价值 = Max(0, Stock Price – Strike Price)
= 25.75 – 25 = **0.75**
---
### 第二步：算时间价值 (Time Value)
时间价值 = 期权溢价 – 内在价值
= 2 – 0.75 = **1.25**
---
### 第三步：转换为美元金额
1 份美式期权合约 = 100 股
所以时间价值 = 1.25 × 100 = **125 美元** ✅
---
**正确答案：$125**
---
# 8. Which of the following options strategies are bearish 以下哪种期权策略是看跌的?
* **Buyer of a call（买入看涨期权）** → 看多 → ❌。
* **Writer of a call（卖出看涨期权）** → 看跌或看平 → ✅。
* **Buyer of a put（买入看跌期权）** → 看跌 → ✅。
* **Writer of a put（卖出看跌期权）** → 看多 → ❌。
所以看跌策略是 **卖出 call** 和 **买入 put**。
---
# 9. Which two of the following options are "in-the-money" 以下哪两个期权是“实值状态/价内期权”?
我们逐个分析：
---
### **I. PQR 35 put when PQR is trading at $32**
* Put 是看跌期权。
* In-the-money 条件：Strike Price > Stock Price。
  35 > 32 → ✅ **ITM**
---
### **II. PQR 35 call when PQR is trading at $32**
* Call 是看涨期权。
* In-the-money 条件：Stock Price > Strike Price。
  32 < 35 → ❌ **OTM**
---
### **III. PQR 15 call when PQR is trading at $15**
* Stock Price = Strike Price → At-the-money（ATM），不是 ITM → ❌
---
### **IV. PQR 15 call when PQR is trading at $18**
* 18 > 15 → ✅ **ITM**
---
# 10. An investor sells an ABC Mar 35 call. To establish a straddle, he would also 一位投资者卖出一份ABC Mar 35看涨期权。为了建立跨式期权，他还需:
- Sell an ABC Mar 35 call
- Buy an ABC Mar 35 put
- Sell an ABC Mar 35 put
- Buy an ABC Mar 40 call
---
我们来仔细分析一下：
---
### **题目解析**
* 卖出 **ABC Mar 35 call** 是已知的动作。
* **Straddle（跨式组合）** 定义：同时买入（或卖出）**同一标的、同一到期日、同一执行价的看涨期权和看跌期权**。
**注意**：
* 如果是 **买入跨式（long straddle）** → 买call + 买put
* 如果是 **卖出跨式（short straddle）** → 卖call + 卖put
题目中投资者 **卖出 call**，要建立跨式，必须 **卖出 put**（同一到期日、执行价）。
---
### **逐项判断**：
1. **Sell an ABC Mar 35 call** → 已经做了，不是新动作。
2. **Buy an ABC Mar 35 put** → 这是买入跨式，不符合卖出call后的组合要求 → ❌。
3. **Sell an ABC Mar 35 put** → 正确！这是建立 **卖出跨式**（short straddle）的组合。✅
4. **Buy an ABC Mar 40 call** → 与跨式无关 → ❌。
---
**正确答案：Sell an ABC Mar 35 put**
---
# 11. All of the following are possible objectives of call buyers EXCEPT 以下都是 Call 买方 可能的目标，除了:
### 解析：
**Call 买方（buyer of a call）**的常见目的：
1. **Speculating for profit on the rise in price of a stock 投机股票价格上涨以获利** → ✅ 主要目的之一。
2. **Delaying a decision to buy a stock** → ✅ 买call可以用较低成本锁定价格，等待决定。
3. **Diversifying the investment portfolio** → ✅ 买call可以作为一种投资组合策略。
**但是**：
* **Hedging a long stock position against falling prices 对冲股票多头仓位以应对价格下跌** → ❌
  * 这是**put期权**的作用，买put是保护已有股票免受下跌风险的策略，而不是call。
---
# 12. Which of the following is the riskiest option strategy 下列哪项是风险最高的期权策略?
1. **Covered call writing（备兑看涨）** → 风险有限，因为你已经持有标的股票，亏损仅限于股票下跌的风险。
2. **Uncovered call writing（裸卖看涨）** → ✅ 风险**无限**，因为如果股价大幅上涨，你必须以执行价卖出股票，但市场价格可以无限高，亏损无上限。
3. **Writing puts（卖出看跌）** → 风险很高，但最大亏损 = 执行价 × 合约股数（股价跌到0），有上限。
4. **Buying puts（买入看跌）** → 风险有限，最多亏权利金。
所以 **裸卖看涨** 是期权策略中风险最高的，因为理论亏损没有上限。
---
# 13. When an index option is exercised, cash settlement takes place how many business days after exercise 指数期权行使时，现金结算在行使后多少个工作日进行?
* **指数期权（Index option）** 与股票期权不同，不交割实物股票，而是**现金结算**（Cash Settlement）。
* 在美国，指数期权的行权通常**在行权后的下一个交易日**完成现金结算 → **T+1**（一个工作日）。
---
# 14. The S&P 100 Index and the AMEX Major Market Index are examples of 标准普尔 100 指数和美国证券交易所主要市场指数是以下例子:
* **Narrow based indexes** → 涵盖少数股票，通常特定行业或小范围板块，如 semiconductor index（半导体指数）。
* **Broad based indexes** → ✅ 涵盖大量股票，代表整个市场或大部分市场，比如 **S&P 100 Index**、**AMEX Major Market Index (XMI)**。
* **Equity options** → 指对单只股票的期权，不是指数。
* **Debt options** → 指债券相关期权，与股票指数无关。
因此 S&P 100 和 AMEX Major Market Index 都是 **broad based indexes**。
---
# 15. On May 4th, an investor writes one S&P 100 Jan 185 put at 6. His maximum potential gain on this position is 5 月 4 日，某投资者以 6 的价格卖出一份标准普尔 100 指数 1 月 185 看跌期权。他在该头寸上的最大潜在收益为:
- $600
- $185
- $106
- $400
---
我们一步步算：
---
### 已知条件
* 写出（卖出）**S&P 100 Jan 185 put**
* 权利金 = 6
* 每份合约 = 100 × 指数单位
* 写put的最大盈利 = 收到的权利金
---
### 计算：
最大盈利 = 权利金 × 合约单位
= 6 × 100 = **600 美元** ✅
---
**正确答案：$600**
---
💡 小提示：
卖出期权（call或put）的最大盈利就是收到的权利金，因为如果期权到期时对方不行权，你就不用履约，赚取的就是权利金。
---
# 16. An investor writes an AMEX Major Market Index 250 call at 13. The market closes that day at $262.34. The investor will break even on his short call if, on the expiration date, the index closes at 一位投资者以13美元的价格卖出一份美国证券交易所主要市场指数250的看涨期权。当天市场收盘价为262.34美元。如果到期日该指数收于 什么价位，该投资者将实现看涨期权的盈亏平衡。:
- $237
- $250
- $262.34
- $263
---
我们一步步算：
---
### 已知条件
* 写出（卖出）**AMEX Major Market Index 250 call**
* 权利金 = 13
* 执行价 = 250
* 要求**平衡点**（break-even）
---
### 平衡点公式
对于卖出call：
**Break-even = Strike Price + Premium**
= 250 + 13 = **263** ✅
---
**正确答案：$263**
---
💡 小技巧：
* 卖call → 平衡点 = 执行价 + 权利金
* 买call → 平衡点 = 执行价 + 权利金
  （其实相同公式，但意义不同）
---
# 17. If a holder of a call option tenders an exercise notice on the day prior to the ex-dividend date for an ordinary cash dividend, he will be 如果看涨期权持有人在普通现金股息除息日前一天提交行权通知，他将:
- Required to pay the dividend to the writer.
- Required to pay the dividend to the writer only if the writer owns the underlying security.
- Entitled to the dividend. ✅
- Entitled to the dividend only if the holder owns the underlying stock.
---
### 解析：
* **Call option holder** 并不拥有标的股票，只有在行权后才变为股票的实际持有者。
* 如果在**除息日前一天**行权，持有人就会在除息日成为股票的登记持有人（record date之前），因此有权获得股息。
* 行权行为会把期权买方转变为股票持有者，从而获得股息权利。
所以答案是：**Entitled to the dividend**。
---
# 18. If an investor does not anticipate that the price of a stock will change and wished to take an option position, he would most likely 如果投资者不预期股票价格会发生变化，并希望持有期权头寸，他很可能会:
- Buy a call
- Sell a call
- Buy a straddle
- Sell an uncovered straddle ✅
---
### 解析：
* 投资者 **不预期股票价格会有大的变化** → 希望赚取时间价值（权利金），而不是依赖价格变动。
* **Straddle** = 同时买入或卖出同一标的、相同行权价、到期日的 call 和 put。
* 如果 **买 straddle** → 需要股价大幅波动才能盈利 → 不适合“不预期价格变化”的情况。
* **卖 uncovered straddle（裸卖跨式）** → 收取较高的权利金，且期望标的价格尽量维持不变，到期两边期权均不被行权，从而赚取全部权利金。
因此：**不预期价格变化 → 卖裸跨式（Sell uncovered straddle）**。
---
# 19. Upon exercise of a call option, the holder of the call will realize a profit if the price of the underlying 行使看涨期权时，如果标的资产的价格满足以下条件，看涨期权持有人将获得利润:
- Falls below the exercise price
- Falls below the exercise price minus the premium paid
- Exceeds the exercise price
- Exceeds the exercise price plus the premium paid ✅
---
### 解析：
* **Call option**：赋予买方以执行价买入标的资产的权利。
* 买入call的总成本 = 执行价 + 权利金。
* 要实现利润，标的价格必须 **高于总成本** → **执行价 + 权利金**。
例子：
* 执行价 = 50
* 权利金 = 3
* 股票价格必须 > 53 才能盈利。
---
# 20. If buying listed call options instead of the underlying stock, which of the following is NOT an advantage 如果购买上市看涨期权而非标的股票，以下哪项不是优势?
- Buying a call would require a smaller capital commitment 购买看涨期权所需的资本投入较少.
- Buying a call has a lower dollar loss potential than buying the stock 购买看涨期权的潜在损失低于购买股票.
- The call has intrinsic value in addition to the time value which gradually diminishes 除了逐渐递减的时间价值外，看涨期权还具有内在价值. ✅
- Buying a call allows greater leverage than buying the underlying stock 购买看涨期权比购买标的股票允许更高的杠杆率.
---
### 解析：
* 买入call的优势包括：
  1. **较小的资金投入** → 只需支付权利金，而不是全额买股票。
  2. **较低的最大亏损** → 最大亏损就是权利金，而不是整个股票价值。
  3. **更高杠杆** → 小投入可控制更大价值的标的。
* 题目中的 **"The call has intrinsic value in addition to the time value which gradually diminishes"** 实际上是对call期权的一个特性描述，而不是**优势**。
  * 时间价值会随时间流逝而减少（时间衰减），这是期权的缺点之一，不是优势。
---
# 21. The holder of a long put will realize a profit upon the exercise of the option if the price of the underlying stock 如果标的股票价格 怎么样，看跌期权多头的持有者将在行使期权时获利:
- Falls below the exercise price
- Falls below the exercise price minus the premium paid ✅
- Exceeds the exercise price
- Exceeds the exercise price plus the premium paid
---
### 解析：
* **Long put（买入看跌期权）**：赋予买方在执行价卖出标的的权利。
* 买入put的总成本 = 权利金。
* 要实现利润，标的价格必须 **低于执行价减去权利金**。
公式：
**Breakeven = Strike Price − Premium Paid**
只有标的价格跌到低于这一点，才会盈利。
**例子**：
* 执行价 = 50
* 权利金 = 3
* Breakeven = 50 − 3 = 47
* 股票价格 < 47 → 盈利
---
# 22. All of the following generally result in a profit to a naked call writer EXCEPT 以下所有情况通常都会使裸看涨期权的卖方获利，除了:
- The option expires without being exercised 期权到期未行使.
- The price of the underlying falls below and remains below the exercise price of the option 标的资产价格跌破并持续低于期权的行权价.
- The call is exercised and the price of the underlying is greater than the exercise price 看涨期权被行使，且标的资产价格高于行权价. ✅
- The price of the option contract declines 期权合约价格下跌.
---
### 解析：
**Naked call writer（裸卖看涨期权）**：卖出看涨期权但不持有标的股票，风险最大。
利润来源：
1. **期权到期不被行权** → 收到的权利金就是利润。
2. **标的价格低于行权价** → 买方不会行权，卖方保留权利金。
3. **期权价格下降** → 卖方可平仓赚取差价。
**亏损情况**：
* 当期权被行权且标的价格高于执行价时 → 卖方必须以较低价格卖出标的股票，亏损 = (市场价 − 行权价) − 权利金，且这种亏损可能无限。
因此，选项 **"The call is exercised and the price of the underlying is greater than the exercise price"** 是裸卖看涨期权的亏损情景，而不是盈利情景。
---
# 23. In early April, an investor buys 1 XYZ Oct 60 call for $9 and sells 1 XYZ Jul 70 call for $4. If the investor buys back the Jul call for $1 and sells the Oct call for $12, what will the pretax profit or loss be 4月初，一位投资者以9美元买入1份XYZ 10月行权价60美元的看涨期权，并以4美元卖出1份XYZ 7月行权价70美元的看涨期权。如果该投资者以1美元的价格回购7月行权价看涨期权，并以12美元的价格卖出10月行权价看涨期权，那么税前利润或亏损是多少?
- $100 loss
- $100 profit
- $600 loss
- $600 profit
---
我们一步步算 ✅
---
### **已知条件**
1. 买入 **1 XYZ Oct 60 call** → 花费 $9
2. 卖出 **1 XYZ Jul 70 call** → 收入 $4
3. 买回 Jul call → 支出 $1
4. 卖出 Oct call → 收入 $12
---
### **第一步：计算初始净成本**
买 Oct call → −$9
卖 Jul call → +$4
初始净成本 = −9 + 4 = **−$5** （支出 $5）
---
### **第二步：后续交易盈亏**
买回 Jul call → −$1
卖出 Oct call → +$12
后续净收益 = −1 + 12 = **+11**
---
### **第三步：总体盈亏**
总体 = 后续净收益 − 初始净成本
= 11 − 5 = **+6**（单位：$100 × 合约数 = $600）
---
**正确答案：$600 profit** ✅
---
# 24. With no other positions, an investor sells short 100 XYZ at $40 and sells 1 XYZ Oct 40 put at $5. If the put is exercised when the market price of the stock is $35 and the stock received is used to cover the short position, what would the investor's profit or loss be 在没有其他头寸的情况下，投资者以40美元的价格卖出100股XYZ股票，并以5美元的价格卖出1份XYZ股票10月40日看跌期权。如果在股票市场价格为35美元时行使看跌期权，并且用获得的股票来弥补空头头寸，投资者的盈亏是多少?
- $500 loss
- $500 profit ✅
- $0 profit
- $1000 profit
---
我们一步步算 ✅
---
### **已知条件**
* 卖空 **100 XYZ** → 收入 = $40 × 100 = **$4,000**
* 卖出 **1 XYZ Oct 40 put** → 收到 = $5 × 100 = **$500**
* Put 被行权，行权价 = $40，市场价 = $35
* 行权意味着投资者必须以 $40 买入股票（每股），用来平掉空头仓位。
---
### **第一步：平仓成本**
行权买入价格 = $40 × 100 = **$4,000**
---
### **第二步：卖空时收入**
卖空股票价格 = $40 × 100 = **$4,000**
所以，股票交易的盈亏 = $4,000 − $4,000 = **$0**
---
### **第三步：加上卖put的权利金收入**
权利金 = $5 × 100 = **$500**
最终总盈亏 = **$500 profit** ✅
---
**正确答案：$500 profit**
---
# 25. If a Customer seeks to liquidate an open position at or near the prevailing market, the following is correct 如果客户寻求以现行市场价格或接近现行市场价格清算未平仓头寸，则以下说法是正确的:
正确答案是：
---
### 解析：
1. **第一项** ❌
   并不是在任何时候都能以当前市场价格平仓，尤其在市场快速波动、流动性差或系统故障时。
2. **第二项** ✅
   这是事实：在锁定限价市场（locked limit market）、快速波动市场、流动性不足的市场，或系统故障/延迟时，客户可能无法以接近市场价格平仓。
3. **第三项** ❌
   Interactive Brokers 或其他经纪商通常不对因市场情况导致的损失负责，除非有特殊合同条款。
---
因此正确答案是 **第二项**。
