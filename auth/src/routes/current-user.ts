import express from 'express';
import { currentUser } from '@karidx/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null }); // You don't want "undefined"
});

export { router as currentUserRouter };
