var config = {}

config.host = process.env.HOST || " https://wipro-hyderabad.documents.azure.com:443";
config.authKey = process.env.AUTH_KEY || "+lzrK+E6egx2Lbd5AoC0wIiSUDT1tXWgMyPaVxBUIleFwyceu8k1tU8BEhZZwLUXVNMoCI3TxhEqB0QSGTV3Eg=="; 
config.databaseId = "WiproHyderabad";
config.collectionId = "Applogs";

module.exports = config;