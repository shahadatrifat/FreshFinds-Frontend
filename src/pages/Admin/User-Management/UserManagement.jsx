import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import UserTable from "./UserTable";
import PaginationControls from "./PaginationControls";
import toast from "react-hot-toast";
import axiosInstance from "../../../Hooks/useAxiosInstance";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchUsers = async (pageNum = 1, query = "") => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/user/admin`, {
        params: { page: pageNum, search: query, limit: 10 },
      });
      setUsers(data.data);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  };

  const handleSearch = (query) => {
    setSearch(query);
    fetchUsers(1, query);
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      await axiosInstance.patch(`/api/v1/user/admin/${id}/role`, {
        role: newRole,
      });
      toast.success("User role updated");
      fetchUsers(page, search);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  const handleBanToggle = async (id, ban) => {
    try {
      await axiosInstance.patch(`/api/v1/user/admin/${id}/ban`, {
        ban,
        reason: ban ? "Violation of rules" : "",
      });
      toast.success(ban ? "User banned" : "User unbanned");
      fetchUsers(page, search);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update ban status"
      );
    }
  };

  useEffect(() => {
    fetchUsers(page, search);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-emerald font-lora mb-6">Manage Users</h1>
      <SearchBar onSearch={handleSearch} />
      <UserTable
        users={users}
        onUpdateRole={handleUpdateRole}
        onBanToggle={handleBanToggle}
      />
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => fetchUsers(newPage, search)}
      />
    </div>
  );
};

export default UserManagement;
