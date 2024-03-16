function generateRandomName(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateNameFromAddress(address: string) {
  const addrLen = address.length;
  return `${address.slice(0, 7)}...${address.slice(addrLen - 5, addrLen)}`;
}

function generateDefaultAvatar(address: string) {
  return `https://avatars.jakerunzer.com/${address}`;
}

async function sleep(ms: number) {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export {
  generateRandomName,
  generateNameFromAddress,
  sleep,
  generateDefaultAvatar,
};
