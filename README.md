<p align="center">
  <a href="https://github.com/renchris/liquidmoon-web-app">
    <img alt="LiquidMoon Logo" src="public/images/liquidmoon-logo.png" width="60" />
  </a>
</p>
<h1 align="center">
  LiquidMoon
</h1>

A liquid staking token and DAO for the Moonbeam community developed at [ETHDenver](https://www.ethdenver.com/) for and winning the [Moonbeam](https://www.moonbeam.network/) cross consensus messaging (XCM) track.

## 🤝 Staking and LiquidMoon

**What are Collators and Delegators?**

As a Proof Of Stake Protocol, Moonbeam requires [collators](https://moonbeam.network/community/collators/) to produce blocks and support block liveness on the network. Individuals can be [delegators](https://docs.moonbeam.network/tokens/staking/stake/) by staking their tokens to a collator node to help support and secure the network.

Unique to [Moonbeam tokenomics](https://moonbeam.foundation/glimmer-token/), collator and delegator rewards is respective to Moonbeam's total supply which contrasts to most validator programs that reward node runners with a commission of the total amount of delegations to their node. A collator in the active set, being the top 64 total-bonded collators, receives a consistent reward of the 1,000,000,000 GLMR total supply * 1.5% collator rewards / 64 active set nodes = 234,375 GLMR per year. A delegator in the active set, being the top 300 delegators to the respective delegated collator node in the active set, receives a proportional reward of the 1,000,000,000 GLMR total supply * 2.5% delegator rewards / 64 active set nodes = 390,625 GLMR * your stake in the pool per year.

**What is the Problem at Hand?**

This means there is a high-value and determined reward on principal if you are within the active set, however, your collator and all delegators to your collator will receive 0% rewards if the collator is not in the top-64 collator active set, and your delegation will receive 0% rewards if the delegation is not in top-300 delegator active set of the select node.

If a delegator gets dropped below the minimum bond needed as in below the bond amount of the 300th delegation, the user is at a dilemma. 

1. Delegate more to increase the delegation amount above the minimum delegation amount, bringing your delegation back to receive rewards, however, have your now larger delegation amount at risk of being below the minimum delegation amount receiving 0% rewards as others also below and near the 300th delegation will do the same in a bidding delegation war.

2. Undelegate your delegation to utilize for rewards elsewhere such as a lower minimum bond collator, however, be receiving 0% rewards for the entire un-delegation process of 7-days.

**What is our Product?**

A liquid staking token will make delegation more accessible and reliable for rewards for the Moonbeam community.

Individuals of the community will be able to contribute to the liquid staking token and the DAO treasury will contribute the pool of funds through a single delegation to a node. With the amassed funds, the pool on behalf of the community will be able to stay in the active set well above the minimum bond needed, staying strong together to secure rewards for everyone.

Delegation rewards will be used to buy-back the staked token as a distribution of the rewards back to token holders who will capture that value through the increased value of the staked token.

We will initially route our LiquidMoon DAO treasury to delegate to a Moonbeam Network official team node, as if an official node is dropped down from the active set, they will be automatically delegated back up into the active set; Moonbeam official nodes will never remain out of the active set. This will disregard any risk of loss of rewards from being removed from the active set.

Once the treasury has captured a sufficient amount of capital, the LiquidMoon treasury plans to spin up our own node and re-route our delegation to self-delegate to the new node to be brought into the active set, and will now receive consistent collator rewards, providing an income of funds for the treasury and DAO.

## 💻 Demo

As the XCM token is a new feature, there is documentation on the value and use case of current XCM tokens but not the creation and minting of a new one.

With the consultation with Kevin and Stephen from the Moonbeam team, our demo would be utilizing the xcUNIT token to represent our DAO token. In this demo, we will allow those who held a sufficient amount of the token to be able to interact with the smart contract.

The smart contract will delegate an amount of the DEV tokens to the select collator.

In actuality, we will tokenize our staked token that will inherently invoke the delegations to the collator and issue the buy-backs with the rewards, every round (ie. 6 hours on Moonbeam, 2 hours on Moonriver or Moonbase Alpha).

## 📣 Recognition

This project was completed in collaboration with [anonintern](https://github.com/anonintern). Thank you to [Moonbeam](https://moonbeam.network/) that made creating this project possible and especially to [Kevin Nielson](https://twitter.com/kevinkneilson) for the support.