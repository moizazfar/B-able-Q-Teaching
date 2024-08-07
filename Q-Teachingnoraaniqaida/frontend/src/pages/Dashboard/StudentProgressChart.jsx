import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StudentProgressChart = ({ studentProgress }) => {
  // Prepare data for chart
  const data = studentProgress.map((progress) => ({
    assignment_type: progress.assignment_type,
    completed_assignments: progress.completed_assignments,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <XAxis dataKey="assignment_type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed_assignments" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StudentProgressChart;
