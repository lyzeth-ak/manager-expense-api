import { DataTypes, Op } from "sequelize";
import sequelize from "./connection.js";

export const WalletModel = sequelize.define("Wallet", {
    code: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });

export default class WalletMySQLRepository {
    async save(walletEntity) {
        const wallet = await WalletModel.create({
            code: walletEntity.code,
            name: walletEntity.name
        });
        return wallet.toJSON();
    }

    async findById(id) {
        const wallet = await WalletModel.findByPk(id);
        return wallet ? wallet.toJSON() : null;
    }

    async update(id, data) {
        const wallet = await WalletModel.findByPk(id);
        if (!wallet) return null;
        await wallet.update(data);
        return wallet.toJSON();
    }

    async delete(id) {
        const wallet = await WalletModel.findByPk(id);
        if (!wallet) return null;
        await wallet.destroy();
        return true;
    }

    async seedWallets() {
        const count = await WalletModel.count();
        if (count === 0) {
            await WalletModel.bulkCreate([
                { code: "CASH", name: "Efetivo" },
                { code: "BBNB", name: "Banco Nacional de Bolivia" },
                { code: "BUSA", name: "Banco Unión" },
                { code: "WTYP", name: "Yape" },
                { code: "WSTR", name: "Western union" }
            ]);
            console.log("Seeded default wallets in MySQL");
        }
    }
}

