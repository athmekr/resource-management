import mongoose, {Document, Schema} from "mongoose";

export interface ISkill {
    name: string;
    description: string;
}

export interface ISkillModel extends ISkill, Document {}

const SkillSchema: Schema = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ISkillModel>('Skill', SkillSchema);