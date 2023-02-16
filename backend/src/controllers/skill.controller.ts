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
        .then((skill) => res.status(201).send(skill))
        .catch((error) => res.status(500).send({ error }));
};
const readSkill = (req: Request, res: Response) => {
    const skillId = req.params.skillId;

    return Skill
        .findById(skillId)
        .then((skill) => skill ? res.status(200).send(skill) : res.status(404).send({ message: 'Skill not found!'}))
        .catch((error) => res.status(500).send({ error }));
};
const readAllSkills = (req: Request, res: Response) => {
    return Skill
        .find()
        .then((skills) => {
            res.send(skills);
        })
        .catch((error) => {
            res.send(error);
        });
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
                    .then((skill) => res.status(201).send(skill))
                    .catch((error) => res.status(500).send({ error }));
            } else {
                res.status(404).send({ message: 'Skill not found!'});
            }
        })
        .catch((error) => res.status(500).send({ error }));
};
const deleteSkill = (req: Request, res: Response) => {
    const skillId = req.params.skillId;

    return Skill
        .findByIdAndDelete(skillId)
        .then( (skill) => skill ? res.status(201).send({ message: 'Skill deleted!' }) : res.status(404).send({ message: 'Skill not found!'}))
        .catch((error) => res.status(500).send({ error }));
};

export default {
    createSkill,
    readSkill,
    readAllSkills,
    updateSkill,
    deleteSkill
};