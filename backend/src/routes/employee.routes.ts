import express from "express";
import employeeController from "../controllers/employee.controller";

const router = express.Router();

router.post('/create', employeeController.createEmployee);
router.get('/get/:employeeId', employeeController.readEmployee);
router.get('/get', employeeController.readAllEmployees);
router.patch('/update/:employeeId', employeeController.updateEmployee);
router.delete('/delete/:employeeId', employeeController.deleteEmployee);

export = router;