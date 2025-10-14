import axios from "axios";
import { BASE_URL } from "./config";

// 1️⃣ Add new animal report
export const addReport = async (reportData) => {
  const res = await axios.post(`${BASE_URL}/reports`, reportData);
  return res.data;
};

// 2️⃣ Get all reports (for dashboard or NGO view)
export const getAllReports = async () => {
  const res = await axios.get(`${BASE_URL}/reports`);
  return res.data;
};

// 3️⃣ Update report status (by NGO/volunteer)
export const updateReportStatus = async (id, status) => {
  const res = await axios.put(`${BASE_URL}/reports/${id}`, { status });
  return res.data;
};
