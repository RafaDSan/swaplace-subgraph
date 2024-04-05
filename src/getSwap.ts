interface Client {
  readContract: any;
}

interface Swaplace {
  abi: any;
  address: string;
}

interface Token {
  addr: string;
  amountOrId: string;
}

export async function getSwapData(
  client: Client,
  Swaplace: Swaplace,
  swapId: bigint,
) {
  const contractResponse = await client.readContract({
    abi: Swaplace.abi,
    address: Swaplace.address,
    functionName: "getSwap",
    args: [swapId],
  });

  let config = contractResponse.config;

  const expiry = BigInt(config) & ((BigInt(1) << BigInt(96)) - BigInt(1));
  const allowed = (BigInt(config) >> BigInt(96)).toString(16);

  const biding = contractResponse.biding.map((token: Token) => ({
    addr: token.addr,
    amountOrId: token.amountOrId.toString(),
  }));

  const asking = contractResponse.asking.map((token: Token) => ({
    addr: token.addr,
    amountOrId: token.amountOrId.toString(),
  }));

  const strinfiedBid = JSON.stringify(biding);
  const strinfiedAsk = JSON.stringify(asking);

  return {
    expiry,
    allowed,
    strinfiedBid,
    strinfiedAsk,
  };
}
