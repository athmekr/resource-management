import mongoose, {Document, Schema} from "mongoose";

export interface IEmployee {
    firstname: string;
    surname: string;
    hiringDate: Date;
    skills: string[];
}

export interface IEmployeeModel extends IEmployee, Document {}

const EmployeeSchema: Schema = new Schema(
    {
        firstname: {type: String, required: true},
        surname: {type: String, required: true},
        hiringDate: {type: Date, required: true},
        skills: {type: [Schema.Types.ObjectId], required: true, ref: 'Skill'},
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IEmployeeModel>('Employee', EmployeeSchema);