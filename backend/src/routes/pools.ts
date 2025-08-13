import { Router } from 'express';
import { directusService } from '../services/directus';

const router = Router();

// Get all pinned pools
router.get('/', async (req, res) => {
    try {

        const allPools = await directusService.getItems('pools');
        console.log('🔍 All pools:', allPools);

        res.json(allPools);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pools' });
    }
});

// Get pool by ID
router.get('/:id', async (req, res) => {
    try {
        const pool = await directusService.getItem('pools', req.params.id);
        res.json(pool);
    } catch (error) {
        res.status(404).json({ error: 'Pool not found' });
    }
});

export { router as poolRoutes };
