import { Ban, CheckCircle } from "lucide-react";
import { Button } from "../../../components/ui/button"; // Shadcn button
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"; // Shadcn select

const UserTable = ({ users, onUpdateRole, onBanToggle }) => {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg bg-white p-4">
      <table className="w-full border-collapse table-auto text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="p-4 border-b border-gray-200 text-center">Name</th> {/* Centered */}
            <th className="p-4 border-b border-gray-200 text-center">Email</th> {/* Centered */}
            <th className="p-4 border-b border-gray-200 text-center">Role</th> {/* Centered */}
            <th className="p-4 border-b border-gray-200 text-center">Status</th> {/* Centered */}
            <th className="p-4 border-b border-gray-200 text-center">Actions</th> {/* Centered */}
          </tr>
        </thead>
        <tbody>
          {users?.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users?.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="p-4 border-b border-gray-200 text-center">{user.displayName}</td> {/* Centered */}
                <td className="p-4 border-b border-gray-200 text-center">{user.email}</td> {/* Centered */}
                <td className="p-4 border-b border-gray-200 text-center">
                  <Select
                    value={user.role}
                    onValueChange={(value) => onUpdateRole(user.userId, value)}
                  >
                    <SelectTrigger className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-4 border-b border-gray-200 text-center">
                  {user.banned ? (
                    <span className="text-red-600 font-semibold">Banned</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Active</span>
                  )}
                </td>
                <td className="p-4 border-b border-gray-200 text-center">
                  <Button
                    onClick={() => onBanToggle(user.userId, !user.banned)}
                    variant={user.banned ? "outline" : "destructive"}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    {user.banned ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle size={16} />
                        Unban
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Ban size={16} />
                        Ban
                      </div>
                    )}
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
