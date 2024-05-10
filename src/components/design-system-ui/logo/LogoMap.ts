// Copyright 2019-2022 @ec3/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const ProjectLogos: Record<string, string> = {
  polkadot: require('./images/projects/polkadot.png'),
  ethereum: require('./images/projects/ethereum.png'),
  ec3: require('./images/projects/ec3.png'),
  matic: require('./images/projects/MATIC.png'),
};

export const ChainLogoMap: Record<string, string> = {
  polkadot: ProjectLogos.polkadot,
  ethereum: ProjectLogos.ethereum,
  ethereum_goerli: ProjectLogos.ethereum,
  ec3: ProjectLogos.ec3,
};

export const TokenLogoMap: Record<string, string> = {
  eth: ProjectLogos.ethereum,
  matic: ProjectLogos.matic,
  ec3: ProjectLogos.ec3,
};

export default ChainLogoMap;
