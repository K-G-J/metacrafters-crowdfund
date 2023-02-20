import { ethers, getNamedAccounts, network } from 'hardhat';
import { Crowdfund } from '../typechain-types';
import { BigNumber } from 'ethers';

const chainId = network.config.chainId;

// yarn hardhat run scripts/refund.ts --network localhost

export default async function refund(
  campaignId: number,
  account?: string
): Promise<void> {
  if (chainId == 31337) {
    const pledger1 = (await getNamedAccounts()).pledger1;
    const signer = ethers.provider.getSigner(pledger1);
    const crowdfund: Crowdfund = await ethers.getContract('Crowdfund');

    const totalDonated: BigNumber = await crowdfund
      .connect(signer)
      .pledgedAmount(campaignId, pledger1);

    await crowdfund.connect(signer).refund(campaignId);
    console.log(`\nRefunded ${ethers.utils.formatEther(totalDonated)}\n`);
  } else {
    const crowdfund: Crowdfund = await ethers.getContract('Crowdfund');
    const signer = ethers.provider.getSigner(account!);

    const totalDonated: BigNumber = await crowdfund
      .connect(signer)
      .pledgedAmount(campaignId, account!);

    await crowdfund.connect(signer).refund(campaignId);
    console.log(`\nRefunded ${ethers.utils.formatEther(totalDonated)}\n`);
  }
}

refund(1)
  .then(() => process.exit(0))
  .catch((error) => {
    const reason = error.reason
      .replace(
        'Error: VM Exception while processing transaction: reverted with reason string ',
        ''
      )
      .replace(/[']/g, '');
    reason.replace("''", '');
    console.log(`\n\n${reason}\n\n`);
    process.exit(1);
  });
