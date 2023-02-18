import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Employee from '../models/employee.model'

const createEmployee = (req: Request, res: Response) => {
    const { firstname, surname, hiringDate, skills } = req.body;

    const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        firstname,
        surname,
        hiringDate,
        skills
    });

    return employee
        .save()
        .then((employee) => res.status(201).send(employee))
        .catch((error) => res.status(500).send({ error }));
};
const readEmployee = (req: Request, res: Response) => {
    const employeeId = req.params.employeeId;

    return Employee
        .findById(employeeId)
        .populate('skills')
        .then((employee) => employee ? res.status(200).send(employee) : res.status(404).send({ message: 'Employee not found!'}))
        .catch((error) => res.status(500).send({ error }));
};
const readAllEmployees = (req: Request, res: Response) => {
    return Employee
        .find()
        .populate('skills')
        .then((employees) => res.status(200).send(employees))
        .catch((error) => res.status(500).send({ error }));
};
const updateEmployee = (req: Request, res: Response) => {
    const employeeId = req.params.employeeId;

    console.log("params ", req.params);
    console.log("body ", req.body);
    return Employee
        .findById(employeeId)
        .then((employee) => {
            if (employee) {
                employee.set(req.body)

                return employee
                    .save()
                    .then((employee) => res.status(201).send(employee))
                    .catch((error) => res.status(500).send({ error }));
            } else {
                res.status(404).send({ message: 'Employee not found!'});
            }
        })
        .catch((error) => res.status(500).send({ error }));
};
const deleteEmployee = (req: Request, res: Response) => {
    const employeeId = req.params.employeeId;

    return Employee
        .findByIdAndDelete(employeeId)
        .then( (employee) => employee ? res.status(201).send({ message: 'Employee deleted!' }) : res.status(404).send({ message: 'Employee not found!'}))
        .catch((error) => res.status(500).send({ error }));
};

export default {
    createEmployee,
    readEmployee,
    readAllEmployees,
    updateEmployee,
    deleteEmployee
};