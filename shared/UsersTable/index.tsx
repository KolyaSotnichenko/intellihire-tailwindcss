import { FC, useState } from "react";
import EditUserModal from "../EditUserModal";

interface IUsersTableProps {
  data: any[];
}

const UsersTable: FC<IUsersTableProps> = ({ data }) => {
  const [openEditModal, setOpenEditModel] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>();

  const handleRemoveInterview = (id: string) => {};

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              User email
            </th>
            <th scope="col" className="px-6 py-3">
              Admin
            </th>
            <th scope="col" className="px-6 py-3">
              Completed questions
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => {
              const handleOpenEditModal = () => {
                setOpenEditModel(true);
                setSelectedItem(item);
              };

              return (
                <tr
                  key={index}
                  className={`bg-white border-b ${
                    parseInt(item.id) % 2 ? "bg-gray-300" : "bg-gray-100"
                  } dark:border-gray-200`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.id}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.email}
                  </th>
                  <td
                    className={`px-6 py-4 ${
                      item.isAdmin === "true"
                        ? "text-green-400"
                        : "text-red-400"
                    } capitalize`}
                  >{`${item.isAdmin}`}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {item.Completed.length}
                  </td>
                  {item.isAdmin === "false" && (
                    <td className="px-6 py-4 flex gap-x-5">
                      <button
                        className="text-gray-900 hover:text-gray-500"
                        onClick={handleOpenEditModal}
                      >
                        Edit
                      </button>
                      {openEditModal && selectedItem && (
                        <EditUserModal
                          id={selectedItem.id}
                          isAdmin={selectedItem.isAdmin}
                          handleOpen={setOpenEditModel}
                        />
                      )}
                      <button
                        className="text-red-500 hover:text-gray-500"
                        onClick={() => handleRemoveInterview(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <p>No users</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
