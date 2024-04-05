export async function getEnsData(client: any, address: any) {
  try {
    const primaryName = await client.getEnsName(address);
    return primaryName;
  } catch (error) {
    console.error(`Error resolving ENS for address ${address}:`, error);
    throw error;
  }
}
