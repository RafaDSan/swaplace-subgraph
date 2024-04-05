import { ponder } from "@/generated";
import { getSwapData } from "./getSwap";
import { getEnsData } from "./getEns";

ponder.on("Swaplace:SwapCreated", async ({ event, context }) => {
  const { client } = context;
  const { Swaplace } = context.contracts;
  const { SwapDatabase, EnsDatabase } = context.db;
  const { swapId, owner } = event.args;

  const { expiry, allowed, strinfiedBid, strinfiedAsk } = await getSwapData(
    client,
    Swaplace,
    swapId,
  );

  await SwapDatabase.create({
    id: swapId,
    data: {
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
      status: "CREATED",
      swapId: swapId,
      owner: owner,
      allowed: `0x${allowed}`,
      expiry: expiry,
      bid: strinfiedBid,
      ask: strinfiedAsk,
    },
  });

  // const primaryName = await getEnsData(client, owner);
  // console.log("PRIMARY NAME", primaryName);

  // await EnsDatabase.create({
  //   id: swapId,
  //   data: {
  //     address: owner,
  //     ensName: primaryName,
  //     ensAvatar: `https: metadata.ens.domains/mainnet/avatar/${primaryName}`,
  //   },
  // });
});

ponder.on("Swaplace:SwapCanceled", async ({ event, context }) => {
  const { SwapDatabase } = context.db;
  const { swapId } = event.args;

  try {
    await SwapDatabase.update({
      id: swapId,
      data: {
        status: "CANCELED",
      },
    });
  } catch (error) {
    console.log("Error updating SwapDatabase. Creating new entry instead.");
    const { client } = context;
    const { Swaplace } = context.contracts;
    const { swapId, owner } = event.args;

    const { expiry, allowed, strinfiedBid, strinfiedAsk } = await getSwapData(
      client,
      Swaplace,
      swapId,
    );

    await SwapDatabase.create({
      id: swapId,
      data: {
        blockTimestamp: event.block.timestamp,
        transactionHash: event.transaction.hash,
        status: "CANCELED",
        swapId: swapId,
        owner: owner,
        allowed: `0x${allowed}`,
        expiry: expiry,
        bid: strinfiedBid,
        ask: strinfiedAsk,
      },
    });
  } finally {
    console.log("SwapDatabase updated successfully.");
  }
});

ponder.on("Swaplace:SwapAccepted", async ({ event, context }) => {
  const { SwapDatabase } = context.db;
  const { swapId } = event.args;

  try {
    await SwapDatabase.update({
      id: swapId,
      data: {
        status: "ACCEPTED",
      },
    });
  } catch (error) {
    console.log("Error updating SwapDatabase. Creating new entry instead.");
    const { client } = context;
    const { Swaplace } = context.contracts;
    const { swapId, owner } = event.args;
    const { expiry, allowed, strinfiedBid, strinfiedAsk } = await getSwapData(
      client,
      Swaplace,
      swapId,
    );

    await SwapDatabase.upsert({
      id: swapId,

      create: {
        blockTimestamp: event.block.timestamp,
        transactionHash: event.transaction.hash,
        status: "ACCEPTED",
        swapId: swapId,
        owner: owner,
        allowed: `0x${allowed}`,
        expiry: expiry,
        bid: strinfiedBid,
        ask: strinfiedAsk,
      },

      update: {
        status: "ACCEPTED",
      },
    });
  } finally {
    console.log("SwapDatabase updated successfully.");
  }
});
