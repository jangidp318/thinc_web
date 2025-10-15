const Content = require('../models/Content');

exports.getAllContent = async (req: any, res: any) => {
    try {
        const data = await Content.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
    }
};
