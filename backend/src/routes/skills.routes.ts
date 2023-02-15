import express from "express";
import skillController from "../controllers/skill.controller";

const router = express.Router();

router.post('/create', skillController.createSkill);
router.get('/get/:skillId', skillController.readSkill);
router.get('/get', skillController.readAllSkills);
router.patch('/update/:skillId', skillController.updateSkill);
router.delete('/delete/:skillId', skillController.deleteSkill);

export = router;