<p align="center">
  <a href="https://github.com/renchris/liquidmoon-web-app">
    <img alt="LiquidMoon Logo" src="public/images/liquidmoon-logo.png" width="60" />
  </a>
</p>
<h1 align="center">
  LiquidMoon
</h1>

A liquid staking token and DAO for the Moonbeam community developed at [ETHDenver](https://www.ethdenver.com/) for the [Moonbeam](https://www.moonbeam.network/) cross conensus messaging (XCM) track.

## 🤝 Staking and LiquidMoon

**What are Collators and Delegators?**

As a Proof Of Stake Protocol, Moonbeam requires [collators](https://moonbeam.network/community/collators/) to produce blocks and support block liveness on the network. Individuals can be [delegators](https://docs.moonbeam.network/tokens/staking/stake/) by staking their tokens to a collator node to help support and secure the network.

Unique to [Moonbeam tokenomics](https://moonbeam.foundation/glimmer-token/), collator and delegator rewards are tied to the total supply which contrasts to most validator programs that send rewards tied to the total amount of delegations. A collator in the active set, being the top 64 total-bonded collators, receives a consistent reward of the 1,000,000,000 GLMR total supply * 1.5% collator rewards / 64 active set nodes = 234,375 GLMR per year. A delegator in the active set, being the top 300 delegators to the respective delegated collator node in the active set, receives a proportional reward of the 1,000,000,000 GLMR total supply * 2.5% delegator rewards / 64 active set nodes = 390,625 GLMR * your stake in the pool per year.

**What is the Problem at Hand?**

This means there is a high-value reward on principal if you are within the active set, however, your collator and all delegators to your collator will be receiving 0% rewards if the collator is not in the top-64 collator active set, and your delegation will be receiving 0% rewards if the delegation is not in top-300 delegator active set.

If a delegator gets dropped below the minimum bond needed as in below the bond amount of the 300th delegation, the user is at a dilemma. 

1. Delegate more to increase the delegation amount above the minimum delegation amount, bringing your delegation back to receive rewards, however, have your now larger delegation amount at risk of being below the minimum delegation amount receiving 0% rewards as others do the same in a bidding delegation war.

2. Undelegate your delegation to utilize for rewards elsewhere such as a lower minimum bond collator, however, be receiving 0% rewards for the entire un-delegation process of 7-days.

**What is our Product?**

A liquid staking token will make delegation more accessible and reliable for rewards for the Moonbeam community.

Individuals of the community will be able to contribute to the liquid staking token and the DAO treasury will contribute the pool of funds through a single delegation to a node. With the amassed funds, the pool on behalf of the community will be able to stay in the active set well above the minimum bond needed, staying strong together to secure rewards for everyone.

We will initially route our LiquidMoon DAO treasury to delegate to a Moonbeam Network official team node, as if an offical node is dropped down from the active set, they will be automatically delegated back up into the active set; Moonbeam official nodes will never remain out of the active set. This will disregard any risk of loss of rewards from being removed from the active set.

Once the treasury has captured a sufficient amount of capital, the LiquidMoon treasury plans to spin up our own node and re-route our delegation to self-delegate to our the new node to be brought into the active set, and will now recieve consistent collator rewards, providing a income of funds for the treasury and DAO.