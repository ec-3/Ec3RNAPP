// Credit: https://github.com/nova-wallet/nova-utils/blob/master/dapps/dapps_dev.json

import { PredefinedDApps } from 'types/browser';

export const DAppIconMap: Record<string, string> = {
  'kintsugi.interlay.io': 'https://kintsugi.interlay.io/kintsugi/apple-touch-icon.png',
  'kanaria.rmrk.app': 'https://rmrk-unrestricted.mypinata.cloud/ipfs/QmSkVkPiMsr1Ryu7122KHoAHqsCrgQCWthNniykLKqbA5H',
  'distribution.acala.network': 'https://avatars.githubusercontent.com/u/54881907?s=200&v=4',
  'www.xdao.app': 'https://moonbeam.network/wp-content/uploads/2022/03/xDAO.png',
  'crowdloan.interlay.io': 'https://assets.coingecko.com/coins/images/26180/small/Interlay-Coinbase-2.png',
  'ace.web3go.xyz': 'https://ace.web3go.xyz/favicon.ico',
  'www.avault.network': 'https://www.avault.network/logo.png',
  'astr.domains': 'https://astr.domains/logo/logo_cic.png',
  'tfalpha.xyz': 'https://tfalpha.xyz/img/tfa-logo.png',
};

export const DAppTitleMap: Record<string, string> = {
  'singular.app': 'Singular: Kusama-native NFTs #RMRK #NFT',
  'singular.rmrk.app': 'Singular: Kusama-native NFTs #RMRK #NFT',
  'kanaria.rmrk.app': 'KANARIA',
  'bifrost.app': 'Bifrost',
  'portal.astar.network': 'Astar Portal - Astar & Shiden Network',
  'app.subsocial.network': 'Subsocial - Decentralized social network on Polkadot & IPFS',
  'polkadot.js.org': 'Polkadot/Substrate Portal',
  'kodadot.xyz': 'KodaDot - Kusama NFT Market Explorer',
  'dotmarketcap.com': 'DotMarketCap',
  'app.parallel.fi': 'Parallel Finance',
  'polkadot.polkassembly.io': 'Polkassembly',
  'ksmcrowdloan.bit.country': 'Crowdloan - Bit.Country Pioneer Network',
  'crowdloan.parallel.fi': 'Parallel Finance',
  'kintsugi.interlay.io': 'Kintsugi',
  'distribution.acala.network': 'Acala Distribution Query',
  'dapp.robonomics.network': 'Dapp Robonomics network',
  'apps.moonbeam.network': 'Moonbeam Network Apps',
  'app.solarflare.io': 'Solarflare',
  'app.solarbeam.io': 'Solarbeam',
  'app.beamswap.io': 'Beamswap',
  'app.stellaswap.com': 'StellaSwap - Leading Moonbeam DEX & DeFi Gateway',
  'app.impossible.finance': 'Impossible Finance',
  'clover.huckleberry.finance': 'Huckleberry',
  'moonriver.huckleberry.finance': 'moonriver.huckleberry.finance',
  'singular-rmrk2-dev.vercel.app': 'Singular: Kusama-native NFTs #RMRK #NFT',
  'centrifuge.io': 'Centrifuge: Real World DeFi',
  'dappradar.com': 'DappRadar - The World’s Dapp Store',
  'tofunft.com': 'tofuNFT.com',
  'app.arthswap.org': 'ArthSwap',
  'cbridge.celer.network': 'cBridge',
  'www.xdao.app': 'XDAO – MultiChain DAO Ecosystem',
  'crowdloan.interlay.io': 'Interlay',
  'kusama.lido.fi': 'Lido',
  'polkadot.lido.fi': 'Lido',
  'moonwell.fi': 'Moonwell Apollo',
  'apps.litentry.com': 'Litmus Network',
  'apps.darwinia.network': 'Darwinia',
  'polkawatch.app': 'Polkawatch',
  'damnedpiratessociety.io': 'Damned Pirates Society',
  'staking.polkadot.network': 'Polkadot Staking Dashboard',
  'marketplace.moonsama.com': 'Moonsama',
  'game.evrloot.com': 'Join the Adventure -- evrloot',
  'www.dtmb.xyz': 'DOWNTOWN MOONBEAM',
  'portal.evolution.land': 'Evolution Land',
  'app.basilisk.cloud': 'Basilisk',
  'moonbeam.curve.fi': 'Curve.fi',
  'app.gmordie.com': 'GM - Say it back!',
  'pioneer.bit.country': 'Bit Country - Metaverses made of 1 and 0 bits',
  'app.zeitgeist.pm': 'The Zeitgeist Prediction Markets App',
  'ace.web3go.xyz': 'ACE',
  'mf-raffle-game.web.app': 'Moonfit - Raffle game',
  'dev-event.moonfit.xyz': 'Moonfit - Raffle game',
  'connect.subwallet.app': 'SubWallet Connect',
  'www.dotinsights.xyz': 'dotinsights | Polkadot & Kusama Ecosystem Map',
  'dotinsights.subwallet.app': 'dotinsights | Polkadot & Kusama Ecosystem Map',
  'app.phala.network': 'Phala App',
  'dex.zenlink.pro': 'Zenlink',
  'www.avault.network': 'Avault',
  'panoramaswap.app': 'Panorama Swap',
  'app.taigaprotocol.io': 'TAIGA',
  'astr.domains': 'Astar Web3 Domains (.astr) - Your Perfect NFT Domains',
  'event.tfalpha.xyz': 'Raffle & Claim Rewards',
  'tfalpha.xyz': 'Utopia & TF Alpha',
  'moons.money': 'Moon Web3 identity',
  'www.subsquare.io': 'SubSquare - Empower the governance of substrate.',
};

export const predefinedDApps: PredefinedDApps = {
  categories: [
    {
      name: 'DeFi',
      id: 'defi',
    },
    {
      name: 'NFT',
      id: 'nft',
    },
    {
      name: 'EVM',
      id: 'evm',
    },
    {
      name: 'Community',
      id: 'community',
    },
    {
      name: 'Utilities',
      id: 'utilities',
    },
    {
      name: 'Crowdloans',
      id: 'crowdloans',
    },
    {
      name: 'Staking',
      id: 'staking',
    },
    {
      name: 'Test',
      id: 'test',
    },
    {
      name: 'Data',
      id: 'data',
    },
  ],
  dapps: [
    {
      name: 'dotinsights | Polkadot & Kusama Ecosystem Map',
      url: 'https://www.dotinsights.xyz',
      icon: 'https://dotinsights.subwallet.app/assets/images/favicon/favicon-180x180.png',
      categories: ['data', 'utilities'],
      // isSupportSubstrateAccount: true,
    },
    {
      name: 'dotinsights | Polkadot & Kusama Ecosystem Map',
      url: 'https://dotinsights.subwallet.app/',
      icon: 'https://dotinsights.subwallet.app/assets/images/favicon/favicon-180x180.png',
      categories: ['data', 'utilities'],
      // isSupportSubstrateAccount: true,
    },
    {
      name: 'Singular 2.0',
      url: 'https://singular.app/',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Singular_2.0.svg',
      categories: ['nft'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Singular',
      url: 'https://singular.rmrk.app/',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Singular.svg',
      categories: ['nft'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Kanaria',
      url: 'https://kanaria.rmrk.app/',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Kanaria.svg',
      categories: ['nft'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Bifrost App',
      url: 'https://bifrost.app/',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/Bifrost.svg',
      categories: ['defi', 'crowdloans'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Astar DApp Hub',
      url: 'https://portal.astar.network/',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Astar.png',
      categories: ['defi', 'staking', 'evm'],
      // isSupportSubstrateAccount: true,
      // isSupportEthereumAccount: true,
    },
    {
      name: 'Subsocial App',
      url: 'https://app.subsocial.network/',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/Subsocial.png',
      categories: ['community'],
      isSupportSubstrateAccount: true,
    },
    // {
    //   name: 'Sub.ID',
    //   url: 'https://sub.id/#/',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Sub.ID.png',
    //   categories: ['utilities'],
    // },
    {
      name: 'Polkadot.js',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Polkadot.js.svg',
      url: 'https://polkadot.js.org/apps/#',
      categories: ['utilities'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'KodaDot',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/KodaDot.png',
      url: 'https://kodadot.xyz/',
      categories: ['nft'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Dotmarketcap',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Dotmarketcap.svg',
      url: 'https://dotmarketcap.com/',
      categories: ['utilities'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Parallel Finance App',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/Parallel-Heiko.svg',
      url: 'https://app.parallel.fi/',
      categories: ['defi'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Polkassembly',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Polkassembly.svg',
      url: 'https://polkadot.polkassembly.io/',
      categories: ['community'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Astar Web3 Domains',
      icon: 'https://astr.domains/logo/logo_cic.png',
      url: 'https://astr.domains/buy',
      categories: ['community'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Utopia & TF Alpha',
      icon: 'https://tfalpha.xyz/img/tfa-logo.png',
      url: 'https://tfalpha.xyz/',
      categories: ['community'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Raffle & Claim Rewards',
      icon: 'https://event.tfalpha.xyz/logo-32x32.ico',
      url: 'https://event.tfalpha.xyz/',
      categories: ['community'],
      isSupportEthereumAccount: true,
    },
    // {
    //   name: 'Talisman App',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Talisman.svg',
    //   url: 'https://app.talisman.xyz/portfolio',
    //   categories: ['defi', 'crowdloans'],
    // },
    {
      name: 'Phala App',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/Phala.svg',
      url: 'https://app.phala.network/',
      categories: ['defi', 'staking'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Bit.Country Pioneer Rewards Claim',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/white/Bit.Country.svg',
      url: 'https://ksmcrowdloan.bit.country/reward',
      categories: ['crowdloans'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Parallel Rewards Claim',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/Parallel-Heiko.svg',
      url: 'https://crowdloan.parallel.fi/',
      categories: ['crowdloans'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Kintsugi Hub',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/Kintsugi.svg',
      url: 'https://kintsugi.interlay.io/',
      categories: ['staking', 'defi', 'crowdloans'],
      isSupportSubstrateAccount: true,
    },
    // {
    //   name: 'Altair Rewards Claim',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/Altair.svg',
    //   url: 'https://centrifuge.io/altair/crowdloan/',
    //   categories: ['crowdloans'],
    // },
    // {
    //   name: 'Clover Rewards Claim',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/Clover.svg',
    //   url: 'https://lucky.clover.finance/',
    //   categories: ['crowdloans'],
    // },
    // {
    //   name: 'Karura App (not mobile-friendly yet)',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/Karura.svg',
    //   url: 'https://apps.karura.network/',
    //   categories: ['defi', 'staking', 'community'],
    // },
    // {
    //   name: 'KILT Stakeboard (not mobile-friendly yet)',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/KILT.svg',
    //   url: 'https://stakeboard.kilt.io/',
    //   categories: ['staking'],
    // },
    // {
    //   name: 'Subsquare. Khala network',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/SubSquare.svg',
    //   url: 'https://khala.subsquare.io/',
    //   categories: ['community'],
    // },
    // {
    //   name: 'Subsquare',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/SubSquare.svg',
    //   url: 'https://polkadot.subsquare.io/',
    //   categories: ['community'],
    // },
    {
      name: 'Subsquare',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/SubSquare.svg',
      url: 'https://www.subsquare.io/',
      categories: ['community'],
    },
    {
      name: 'Acala Rewards Claim',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Acala.png',
      url: 'https://distribution.acala.network/claim/acala',
      categories: ['crowdloans'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Robonomics',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Robonomics.svg',
      url: 'https://dapp.robonomics.network/#/staking/',
      categories: ['staking'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Moonbeam',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Moonbeam.svg',
      url: 'https://apps.moonbeam.network/moonbeam',
      categories: ['staking', 'crowdloans', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Moonriver',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Moonriver.svg',
      url: 'https://apps.moonbeam.network/moonriver',
      categories: ['staking', 'crowdloans', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Solarflare',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Solarflare.png',
      url: 'https://app.solarflare.io/exchange/swap',
      categories: ['defi', 'staking', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Solarbeam',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Solarbeam.png',
      url: 'https://app.solarbeam.io/exchange/swap',
      categories: ['defi', 'staking', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Beamswap',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Beamswap.svg',
      url: 'https://app.beamswap.io/exchange/swap',
      categories: ['defi', 'staking', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Stellaswap',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/StellaSwap.svg',
      url: 'https://app.stellaswap.com/exchange/swap',
      categories: ['defi', 'staking', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Moon Web3 identity',
      icon: 'https://moons.money/logo/logo.png?=2',
      url: 'https://moons.money/app',
      categories: ['evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Impossible Finance',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/ImpossibleFinance.svg',
      url: 'https://app.impossible.finance/explore',
      categories: ['defi', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Huckleberry Finance',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Huckleberry.svg',
      url: 'https://clover.huckleberry.finance/#/swap',
      categories: ['defi', 'staking', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Huckleberry Finance',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Huckleberry.svg',
      url: 'https://moonriver.huckleberry.finance/#/swap',
      categories: ['defi', 'staking', 'evm'],
      isSupportEthereumAccount: true,
    },
    // {
    //   name: 'MyTrade',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/MyTrade.svg',
    //   url: 'https://mytrade.org/',
    //   categories: ['defi', 'evm'],
    // },
    // {
    //   name: 'Kintsugi TESTNET',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/Kintsugi.svg',
    //   url: 'https://bridge.interlay.io/bridge?tab=issue',
    //   categories: ['test'],
    // },
    {
      name: 'Singular',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Singular_2.0.svg',
      url: 'https://singular-rmrk2-dev.vercel.app/',
      categories: ['test'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Centrifuge Rewards Claim',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/white/Centrifuge.svg',
      url: 'https://centrifuge.io/parachain/crowdloan/',
      categories: ['crowdloans'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'DappRadar',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/DappRadar.svg',
      url: 'https://dappradar.com/',
      categories: ['utilities'],
      isSupportEthereumAccount: true,
    },
    // {
    //   name: 'PolkaEx',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/PolkaEx.svg',
    //   url: 'https://app.polkaex.io/swap',
    //   categories: ['defi', 'staking', 'evm'],
    // },
    {
      name: 'TofuNFT',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/TofuNFT.svg',
      url: 'https://tofunft.com/',
      categories: ['nft', 'evm'],
      isSupportEthereumAccount: true,
    },
    // {
    //   name: '1Beam',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/1beam.png',
    //   url: 'https://1beam.io/',
    //   categories: ['defi', 'staking', 'evm'],
    // },
    {
      name: 'ArthSwap',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/ArthSwap.svg',
      url: 'https://app.arthswap.org/#/swap',
      categories: ['defi', 'staking', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'cBRIDGE',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/cBRIDGE.png',
      url: 'https://cbridge.celer.network/#/transfer',
      categories: ['defi', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'XDAO',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/XDAO.svg',
      url: 'https://www.xdao.app/137',
      categories: ['defi', 'evm'],
      isSupportEthereumAccount: true,
    },
    // {
    //   name: 'SiriusFinance',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/SiriusFinance.svg',
    //   url: 'https://app.sirius.finance/#/swap',
    //   categories: ['defi', 'staking', 'evm'],
    // },
    {
      name: 'Interlay Rewards Claim',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/white/Interlay.svg',
      url: 'https://crowdloan.interlay.io/',
      categories: ['crowdloans'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Kusama Lido',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/LIDO_KSM.svg',
      url: 'https://kusama.lido.fi/',
      categories: ['staking', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Polkadot Lido',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/LIDO_DOT.svg',
      url: 'https://polkadot.lido.fi/',
      categories: ['staking', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Moonwell Apollo',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Moonwell.svg',
      url: 'https://moonwell.fi/apollo/MOVR',
      categories: ['defi', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Litmus App',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/color/Litmus-original.svg',
      url: 'https://apps.litentry.com/',
      categories: ['crowdloans'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Darwinia App',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/white/Darwinia.svg',
      url: 'https://apps.darwinia.network/',
      categories: ['staking'],
    },
    // {
    //   name: 'SubBridge',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/SubBridge.svg',
    //   url: 'https://subbridge.io/',
    //   categories: ['defi', 'evm'],
    // },
    {
      name: 'Moonwell Artemis',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/MoonwellArtemis.svg',
      url: 'https://moonwell.fi/artemis/GLMR',
      categories: ['defi', 'evm'],
      isSupportEthereumAccount: true,
    },
    // {
    //   name: 'Skybreach',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Skybreach.png',
    //   url: 'https://skybreach.app/',
    //   categories: ['nft', 'evm'],
    // },
    {
      name: 'Polkawatch',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Polkawatch.svg',
      url: 'https://polkawatch.app/',
      categories: ['staking'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Damned Pirates Society',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Damnedpiratessociety.svg',
      url: 'https://damnedpiratessociety.io/',
      categories: ['nft', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Polkadot Staking Dashboard',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/StakingDashboard.svg',
      url: 'https://staking.polkadot.network/dashboard#/overview',
      categories: ['staking'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Moonsama',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Moonsama.svg',
      url: 'https://marketplace.moonsama.com/',
      categories: ['nft', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'EVRLOOT',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/EVRLOOT.svg',
      url: 'https://game.evrloot.com/game',
      categories: ['nft'],
      isSupportSubstrateAccount: true,
    },
    // {
    //   name: 'Downtown Moonbeam',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/DowntownMoonbeam.png',
    //   url: 'https://dtmb.xyz',
    //   categories: ['evm', 'utilities'],
    // },
    {
      name: 'Evolution Land. Columbus',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Evolutionland.png',
      url: 'https://portal.evolution.land/land/3/market/land',
      categories: ['nft', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Basilisk Snek Swap',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/SnekSwap.svg',
      url: 'https://app.basilisk.cloud/#/trade',
      categories: ['defi'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Moonbeam Curve',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/MoonbeamCurve.svg',
      url: 'https://moonbeam.curve.fi/',
      categories: ['defi', 'evm'],
      isSupportEthereumAccount: true,
    },
    // {
    //   name: 'Nomad',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Nomad.svg',
    //   url: 'https://app.nomad.xyz/',
    //   categories: ['defi', 'evm'],
    // },
    {
      name: 'GM! Say it back',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/GM.svg',
      url: 'https://app.gmordie.com/',
      categories: ['community'],
      isSupportSubstrateAccount: true,
    },
    // {
    //   name: 'Tinkernet Rewards Claim',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Tinkernet.svg',
    //   url: 'https://www.tinker.network/claim',
    //   categories: ['crowdloans'],
    // },
    // {
    //   name: 'Raresama',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Raresama.svg',
    //   url: 'https://raresama.com/',
    //   categories: ['nft'],
    // },
    {
      name: 'Bit.Country Pioneer Metaverse',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/white/Bit.Country.svg',
      url: 'https://pioneer.bit.country/',
      categories: ['nft', 'staking'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Zenlink',
      icon: 'https://dex.zenlink.pro/favicon.png',
      url: 'https://dex.zenlink.pro/#/swap',
      categories: ['defi'],
    },
    {
      name: 'Avault',
      icon: 'https://www.avault.network/logo.png',
      url: 'https://www.avault.network/vault',
      categories: ['evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Panorama Swap',
      icon: 'https://panoramaswap.app/favicon.ico',
      url: 'https://panoramaswap.app/',
      categories: ['defi'],
    },
    {
      name: 'TAIGA',
      icon: 'https://d1fdloi71mui9q.cloudfront.net/8c4qoYY4S6mBVV2NUyYQ_Jq4cFVrgwJ9EF784',
      url: 'https://app.taigaprotocol.io/assets',
      categories: ['defi'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Zeitgeist',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/chains/white/Zeitgeist.svg',
      url: 'https://app.zeitgeist.pm/',
      categories: ['nft', 'utilities'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'ACE',
      icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/ACE.svg',
      url: 'https://ace.web3go.xyz/#/',
      categories: ['utilities'],
      isSupportSubstrateAccount: true,
    },
    {
      name: 'Moonfit - Raffle game',
      icon: 'https://dev-event.moonfit.xyz/logo-32x32.ico',
      url: 'https://mf-raffle-game.web.app',
      categories: ['evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Moonfit - Raffle game',
      icon: 'https://dev-event.moonfit.xyz/logo-32x32.ico',
      url: 'https://dev-event.moonfit.xyz',
      categories: ['test', 'evm'],
      isSupportEthereumAccount: true,
    },
    {
      name: 'Subwallet connect',
      icon: 'https://connect.subwallet.app/icon-128.png',
      url: 'https://connect.subwallet.app/#/',
      categories: ['test'],
      isSupportSubstrateAccount: true,
      isSupportEthereumAccount: true,
    },
  ],
};
