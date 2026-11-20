import WalletEntity from "../../domain/entities/wallet.entity.js";

export default class WalletService {
    constructor(walletRepository) {
        this.walletRepository = walletRepository;
    }

    async createWallet(data) {
        if (!data.code || !data.name) {
            throw new Error("Code and name are required");
        }

        const wallet = new WalletEntity(data);
        return await this.walletRepository.save(wallet);
    }

    async getWallets() {
        return await this.walletsRepository.findAll();
    }

    async updateWallet(id, data) {
        const wallet = await this.walletRepository.findById(id);
        if (!wallet) throw new Error("Wallet not found");
        if (wallet.isDefault) throw new Error("Cannot update a default system wallet");

        return await this.walletRepository.update(id, data);
    }

    async deleteWallet(id) {
        const wallet = await this.walletRepository.findById(id);
        if (!wallet) throw new Error("Wallet not found");
        if (wallet.isDefault) throw new Error("Cannot delete a default system wallet");

        await this.walletRepository.delete(id);
        return { message: "Wallet deleted successfully" };
    }
}

