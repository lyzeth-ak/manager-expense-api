export default class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }

    createTransaction = async (req, res) => {
        const data = { ...req.body, userId: req.user.id };
        try {
            const transaction = await this.transactionService.createTransaction(data);
            res.status(201).json(transaction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getTransactionsByUserId = async (req, res) => {
        try {
            const transactions = await this.transactionService.getTransactionsByUserId(req.user.id);
            res.status(200).json(transactions);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };

    getPublicTransaction = async (req, res, next) => {
        try {
            const transaction = await this.transactionService.getPublicTransaction(req.params.id);
            if (transaction === null) return res.status(404).json({ error: "Transaction not found" });
            if (transaction === false) return res.status(403).json({ error: "Transaction is private" });
            return res.status(200).json(transaction);
        } catch (error) {
            next(error);
        }
    };

    updateTransaction = async (req, res) => {
        const { id } = req.params;
        try {
            const updated = await this.transactionService.updateTransaction(id, req.body, req.user.id);
            res.status(200).json(updated);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteTransaction = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.transactionService.deleteTransaction(id, req.user.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };
}

