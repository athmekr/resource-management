import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Skill from '../models/skill.model'

const createSkill = (req: Request, res: Response) => {
    const { title, description } = req.body;

    const skill = new Skill({
        _id: new mongoose.Types.ObjectId(),
        title,
        description
    });

    return skill
        .save()
        .then((skill) => res.status(201).json({ skill }))
        .catch((error) => res.status(500).json({ error }));
};
const readSkill = (req: Request, res: Response) => {
    const skillId = req.params.skillId;

    return Skill
        .findById(skillId)
        .then((skill) => skill ? res.status(200).json({ skill }) : res.status(404).json({ message: 'Skill not found!'}))
        .catch((error) => res.status(500).json({ error }));
};
const readAllSkills = (req: Request, res: Response) => {
    return Skill
        .find()
        .then((skills) => res.status(200).json({ skills }))
        .catch((error) => res.status(500).json({ error }));
};
const updateSkill = (req: Request, res: Response) => {
    const skillId = req.params.skillId;

    return Skill
        .findById(skillId)
        .then((skill) => {
            if (skill) {
                skill.set(req.body)

                return skill
                    .save()
                    .then((skill) => res.status(201).json({ skill }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Skill not found!'});
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteSkill = (req: Request, res: Response) => {
    const skillId = req.params.skillId;

    return Skill
        .findByIdAndDelete(skillId)
        .then( (skill) => skill ? res.status(201).json({ message: 'Skill deleted!' }) : res.status(404).json({ message: 'Skill not found!'}))
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createSkill,
    readSkill,
    readAllSkills,
    updateSkill,
    deleteSkill
};