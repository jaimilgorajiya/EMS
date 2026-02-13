import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import DepartmentManagement from "./pages/admin/DepartmentManagement";
import EmployeeProfile from "./pages/admin/EmployeeProfile";
import AttendanceManagement from "./pages/admin/AttendanceManagement";
import LeaveManagement from "./pages/admin/LeaveManagement";
import PayrollManagement from "./pages/admin/PayrollManagement";
import TaskPerformance from "./pages/admin/TaskPerformance";
import SystemSettings from "./pages/admin/SystemSettings";

import ManagerDashboard from "./pages/manager/Dashboard";
import TeamManagement from "./pages/manager/TeamManagement";
import ApprovalsPanel from "./pages/manager/ApprovalsPanel";
import TaskAssignment from "./pages/manager/TaskAssignment";
import PerformanceReview from "./pages/manager/PerformanceReview";

import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeAttendance from "./pages/employee/Attendance";
import MissedPunchRequest from "./pages/employee/MissedPunchRequest";
import LeaveWFH from "./pages/employee/LeaveWFH";
import EmployeePayroll from "./pages/employee/Payroll";
import EmployeeTasks from "./pages/employee/Tasks";
import EmployeeProfilePage from "./pages/employee/Profile";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "login", Component: Login },
      
      // Admin Routes
      { path: "admin", Component: AdminDashboard },
      { path: "admin/users", Component: UserManagement },
      { path: "admin/departments", Component: DepartmentManagement },
      { path: "admin/employee/:id", Component: EmployeeProfile },
      { path: "admin/attendance", Component: AttendanceManagement },
      { path: "admin/leave", Component: LeaveManagement },
      { path: "admin/payroll", Component: PayrollManagement },
      { path: "admin/tasks", Component: TaskPerformance },
      { path: "admin/settings", Component: SystemSettings },
      
      // Manager Routes
      { path: "manager", Component: ManagerDashboard },
      { path: "manager/team", Component: TeamManagement },
      { path: "manager/approvals", Component: ApprovalsPanel },
      { path: "manager/tasks", Component: TaskAssignment },
      { path: "manager/performance", Component: PerformanceReview },
      
      // Employee Routes
      { path: "employee", Component: EmployeeDashboard },
      { path: "employee/attendance", Component: EmployeeAttendance },
      { path: "employee/missed-punch", Component: MissedPunchRequest },
      { path: "employee/leave", Component: LeaveWFH },
      { path: "employee/payroll", Component: EmployeePayroll },
      { path: "employee/tasks", Component: EmployeeTasks },
      { path: "employee/profile", Component: EmployeeProfilePage },
      
      { path: "*", Component: NotFound },
    ],
  },
]);
