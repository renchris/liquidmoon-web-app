import '../bootstrap'
import '../styles/index.css'
import '@fontsource/dm-sans/index.css'
import 'react-virtualized/styles.css'
import 'react-tabs/style/react-tabs.css'
import 'react-datetime/css/react-datetime.css'

import * as plurals from 'make-plural/plurals'

import React, { Fragment, FunctionComponent, useState } from 'react'
import { NextComponentType, NextPageContext } from 'next'

import type { AppProps } from 'next/app'
import ApplicationUpdater from '../state/application/updater'
import DefaultLayout from '../layouts/Default'
import Head from 'next/head'
import { I18nProvider } from '@lingui/react'
import ListsUpdater from '../state/lists/updater'
import MulticallUpdater from '../state/multicall/updater'
import { PersistGate } from 'redux-persist/integration/react'
import ReactGA from 'react-ga'
import { Provider as ReduxProvider } from 'react-redux'
import TransactionUpdater from '../state/transactions/updater'
import UserUpdater from '../state/user/updater'
import Web3ReactManager from '../components/Web3ReactManager'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import dynamic from 'next/dynamic'
import getLibrary from '../functions/getLibrary'
import { i18n } from '@lingui/core'
import store from '../state'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import PriceProvider from '../contexts/priceContext'
import FarmContext from '../contexts/farmContext'
import { usePricesApi } from '../features/farm/hooks'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Contract, ethers } from 'ethers'

import * as abi from '../abi.json'
//import { ERC20_ABI } from '../constants/abis/erc20'
import { Interface } from '@ethersproject/abi'
import Button from '../components/Button'
import { Web3Provider } from '@ethersproject/providers'
import { resolve } from 'path'

const Web3ProviderNetwork = dynamic(() => import('../components/Web3ProviderNetwork'), { ssr: false })
const Web3ProviderNetworkBridge = dynamic(() => import('../components/Web3ProviderBridge'), { ssr: false })

if (typeof window !== 'undefined' && !!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

function MyApp({
  Component,
  pageProps,
}: AppProps & {
  Component: NextComponentType<NextPageContext> & {
    Guard: FunctionComponent
    Layout: FunctionComponent
    Provider: FunctionComponent
  }
}) {
  const router = useRouter()

  // const [provider, setProvider] = useState(Web3Provider);
  // const [contract, setContract] = useState(Contract);

  const { pathname, query, locale } = router

  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, { testMode: process.env.NODE_ENV === 'development' })

    const errorHandler = (error) => {
      ReactGA.exception({
        description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
        fatal: true,
      })
    }

    window.addEventListener('error', errorHandler)

    return () => window.removeEventListener('error', errorHandler)
  }, [])

  useEffect(() => {
    //loadWeb3()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // setProvider(provider)
    const signer = provider.getSigner()
  }, [])


  useEffect(() => {
    ReactGA.pageview(`${pathname}${query}`)
  }, [pathname, query])

  useEffect(() => {
    async function load(locale) {
      const { messages } = await import(`@lingui/loader!./../../locale/${locale}.po`)
      i18n.loadLocaleData(locale, { plurals: plurals[locale.toLowerCase() == 'pt-br' ? 'pt' : 'en'] })
      i18n.load(locale, messages)
      i18n.activate(locale)
    }
    load(locale)
  }, [locale])

  // Allows for conditionally setting a provider to be hoisted per page
  const Provider = Component.Provider || Fragment

  // Allows for conditionally setting a layout to be hoisted per page
  const Layout = Component.Layout || DefaultLayout

  // Allows for conditionally setting a guard to be hoisted per page
  const Guard = Component.Guard || Fragment

  const parachainStakingAddress = '0x0000000000000000000000000000000000000800'
  const parachainStakingABI = new Interface([
    {
      "inputs": [],
      "name": "cancel_candidate_bond_less",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "cancel_delegation_request",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidateCount",
          "type": "uint256"
        }
      ],
      "name": "cancel_leave_candidates",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cancel_leave_delegators",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "less",
          "type": "uint256"
        }
      ],
      "name": "candidate_bond_less",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "more",
          "type": "uint256"
        }
      ],
      "name": "candidate_bond_more",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "candidate_count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "candidate_delegation_count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "collator",
          "type": "address"
        }
      ],
      "name": "collator_nomination_count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "candidateDelegationCount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "delegatorDelegationCount",
          "type": "uint256"
        }
      ],
      "name": "delegate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "more",
          "type": "uint256"
        }
      ],
      "name": "delegator_bond_more",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "delegator",
          "type": "address"
        }
      ],
      "name": "delegator_delegation_count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "execute_candidate_bond_less",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "delegator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "execute_delegation_request",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "candidateDelegationCount",
          "type": "uint256"
        }
      ],
      "name": "execute_leave_candidates",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "delegator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "delegatorDelegationCount",
          "type": "uint256"
        }
      ],
      "name": "execute_leave_delegators",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "go_offline",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "go_online",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "is_candidate",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "delegator",
          "type": "address"
        }
      ],
      "name": "is_delegator",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "nominator",
          "type": "address"
        }
      ],
      "name": "is_nominator",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "is_selected_candidate",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "candidateCount",
          "type": "uint256"
        }
      ],
      "name": "join_candidates",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidateCount",
          "type": "uint256"
        }
      ],
      "name": "leave_candidates",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "nominatorNominationCount",
          "type": "uint256"
        }
      ],
      "name": "leave_nominators",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "min_delegation",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "min_nomination",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "collator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "collatorNominationCount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "nominatorNominationCount",
          "type": "uint256"
        }
      ],
      "name": "nominate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "less",
          "type": "uint256"
        }
      ],
      "name": "nominator_bond_less",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "more",
          "type": "uint256"
        }
      ],
      "name": "nominator_bond_more",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "nominator",
          "type": "address"
        }
      ],
      "name": "nominator_nomination_count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "round",
          "type": "uint256"
        }
      ],
      "name": "points",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "collator",
          "type": "address"
        }
      ],
      "name": "revoke_nomination",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "less",
          "type": "uint256"
        }
      ],
      "name": "schedule_candidate_bond_less",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "less",
          "type": "uint256"
        }
      ],
      "name": "schedule_delegator_bond_less",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidateCount",
          "type": "uint256"
        }
      ],
      "name": "schedule_leave_candidates",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "schedule_leave_delegators",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "schedule_revoke_delegation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ])
  const ierc20Address = '0xffffffff1fcacbd218edc0eba20fc2308c778080'
  const erc20ABI = new Interface([
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
])
  const selectCollatorAddress = '0x7aF6c67EE0F1eC83C3d05e62fB0200B3841c7F36' //ethkiller
  const selectCollatorAddressTwo = '0x8b0F8e5E3F3CEa24F05A1b215fFE1D18524564C7' //psi-13

  const getDelegationCount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const myContract = new ethers.Contract(parachainStakingAddress, parachainStakingABI, provider)
    const delegationCount = await myContract.candidate_delegation_count(selectCollatorAddress)
    console.log('result: ', delegationCount.toNumber())
    return delegationCount.toNumber()
  }
  
  const checkBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    console.log('address:', address)
    const balance = await provider.getBalance(address)
    console.log('DEV balance:', balance.toString())
    const myContract = new ethers.Contract(ierc20Address, erc20ABI, provider)
    const xcUnitBalance = await myContract.balanceOf(address)
    console.log('xcUnitBalance:', xcUnitBalance.toNumber())
    return xcUnitBalance.toNumber()
  }

  const callContract = async () => {
    const balance = await checkBalance().then(xcUnitBalance => { return xcUnitBalance})
    const tenEther = 10000000000000
    if(balance >= tenEther){
      delegateTokens()
    }
  }

  const delegateTokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const providerContract = new ethers.Contract(parachainStakingAddress, parachainStakingABI, provider)
    const signerContract = new ethers.Contract(parachainStakingAddress, parachainStakingABI, signer)
    const fiveEther = 5000000000000000000
    const pointOneEther = 100000000000000000
    const collatorDelegationCount =  await getDelegationCount().then(delegations => { return delegations})
    const delegatorDelegationCount = await providerContract.delegator_delegation_count(address)
    try{
      await signerContract.delegate(selectCollatorAddressTwo, fiveEther.toString(), collatorDelegationCount, delegatorDelegationCount.toNumber())
    } catch(err){
      console.log('failed to delegate:', err)
    }
    await signerContract.delegator_bond_more(selectCollatorAddressTwo, pointOneEther.toString())
  }



  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <title key="title">Solarbeam</title>

        <meta key="description" name="description" content="Solarbeam - AMM on Moonriver." />

        <meta name="application-name" content="Solarbeam App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Solarbeam App" />

        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#F338C3" />

        <meta key="twitter:card" name="twitter:card" content="app" />
        <meta key="twitter:title" name="twitter:title" content="Solarbeam App" />
        <meta key="twitter:url" name="twitter:url" content="https://solarbeam.io" />
        <meta key="twitter:description" name="twitter:description" content="Solarbeam - AMM on Moonriver." />
        <meta key="twitter:image" name="twitter:image" content="https://solarbeam.io/icons/icon.png" />
        <meta key="twitter:creator" name="twitter:creator" content="@solarbeam.io" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:site_name" property="og:site_name" content="Solarbeam App" />
        <meta key="og:url" property="og:url" content="https://solarbeam.io" />
        <meta key="og:image" property="og:image" content="https://solarbeam.io/icon.png" />
        <meta key="og:description" property="og:description" content="Solarbeam - AMM on Moonriver." />
      </Head>

      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <Web3ProviderNetworkBridge getLibrary={getLibrary}>
              <Web3ReactManager>
                <ReduxProvider store={store}>
                  <PriceProvider>
                    <>
                      <ListsUpdater />
                      <UserUpdater />
                      <ApplicationUpdater />
                      <TransactionUpdater />
                      <MulticallUpdater />
                    </>
                    <Provider>
                      <Layout>
                        <Guard>
                          <Button onClick={getDelegationCount}>
                            Delegation Count
                          </Button>
                          <Button onClick={callContract}>
                            Delegate to Collator
                          </Button>
                          <Component {...pageProps} />
                        </Guard>
                      </Layout>
                    </Provider>
                  </PriceProvider>
                </ReduxProvider>
              </Web3ReactManager>
            </Web3ProviderNetworkBridge>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </I18nProvider>
    </Fragment>
  )
}

async function loadWeb3() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(`provider`, provider)
  console.log(`provider.getSigner()`, provider.getSigner());
}

export default MyApp
