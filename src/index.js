import app from './app.js';
import { connectMongo } from './infrastructure/database/mongo/connection.js';
import { connectMysql } from './infrastructure/database/mysql/connection.js';
import CurrencyMongoRepository from './infrastructure/database/mongo/currency.mongo.repository.js';
import CategoryMySQLRepository from './infrastructure/database/mysql/category.mysql.repository.js';
import WalletMySQLRepository from './infrastructure/database/mysql/wallet.mysql.repository.js';

await connectMongo();
await connectMysql();

// Ejecución de datos semilla para monedas (MongoDB) y categorías (MySQL)
const currencyRepo = new CurrencyMongoRepository();
const categoryRepo = new CategoryMySQLRepository();
const walletRepo = new WalletMySQLRepository();
await currencyRepo.seedCurrencies();
await categoryRepo.seedCategories();
await walletRepo.seedWallets();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

