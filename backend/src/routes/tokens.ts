import { Router } from 'express';
import { directusService } from '../services/directus';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const tokens = await directusService.getItems('custom_tokens',);
        res.json(tokens);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tokens' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const token = await directusService.getItem('custom_tokens', req.params.id);
        res.json(token);
    } catch (error) {
        res.status(404).json({ error: 'Token not found' });
    }
});

export { router as tokenRoutes };
