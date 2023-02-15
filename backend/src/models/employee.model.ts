import mongoose, {Document, Schema} from "mongoose";

export interface IEmployee {
    name: string;
}

export interface IEmployeeModel extends IEmployee {}

const EmployeeSchema: Schema = new Schema(
    {
        name: {type: String, required: true}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IEmployeeModel>('Employee', EmployeeSchema);