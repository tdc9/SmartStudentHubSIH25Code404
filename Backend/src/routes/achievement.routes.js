const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievement.controller');
const authMiddleware = require('../middlewares/auth'); 


router.use(authMiddleware);


router.post('/', achievementController.createAchievement);


router.get('/', achievementController.getMyAchievements);

router.get('/:id', achievementController.getAchievementById);


router.put('/:id', achievementController.updateAchievement);


router.delete('/:id', achievementController.deleteAchievement);

module.exports = router;
