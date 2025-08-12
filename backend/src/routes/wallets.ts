import { Router } from 'express';
import { directusService } from '../services/directus';

const router = Router();

// Get all wallets
router.get('/', async (req, res) => {
  try {
    const wallets = await directusService.getItems('wallets', {
      filter: { status: { _eq: 'published' } },
      sort: ['name']
    });
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wallets' });
  }
});

// Get wallet by ID
router.get('/:id', async (req, res) => {
  try {
    const wallet = await directusService.getItem('wallets', req.params.id);
    res.json(wallet);
  } catch (error) {
    res.status(404).json({ error: 'Wallet not found' });
  }
});

export { router as walletRoutes };
