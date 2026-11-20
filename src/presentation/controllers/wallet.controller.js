export default class walletController {
    constructor(walletService) {
        this.walletService = walletService;
    }

    createWallet = async (req, res) => {
        const data = { ...req.body };
        try {
            const wallet = await this.walletService.createWallet(data);
            res.status(201).json(wallet);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getWallets = async (req, res) => {
        try {
            const wallets = await this.walletService.getWallets();
            res.status(200).json(wallets);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };

    updateWallet = async (req, res) => {
        const { id } = req.params;
        try {
            const wallet = await this.walletService.updateWallet(id, req.body);
            res.status(200).json(wallet);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteWallet = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.walletService.deleteWallet(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

