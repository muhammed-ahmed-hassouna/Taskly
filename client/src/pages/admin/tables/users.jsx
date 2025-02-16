import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { usePage } from "../context/SelectedPageContext";
import { getAllUsers, deleteUser } from "queries/getQueryFns";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { onSelectedPage } = usePage();

  const TABLE_HEAD = ["Name", "Email", "Admin", "Actions"];

  // Fetch users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
    onError: () => toast.error("Error fetching users"),
  });


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      //   deleteMutation.mutate(userId);
    }
  };

  return (
    <Card className="p-2 m-5 w-4/5 mx-auto border border-primary bg-primary3">
      <h1 className="text-start mt-5 mx-5 text-lg font-bold">Users</h1>
      <hr className="text-black" />
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-primary3"
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 m-4">
          <div className="flex w-full md:w-auto shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              variant="outlined"
              size="sm"
              className="bg-primary text-white hover:bg-buttonHover"
              onClick={() => onSelectedPage("users")}
            >
              View All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0 h-[400px] mb-auto overflow-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-primary text-white">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => {
              const isLast = index === paginatedUsers.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr
                  key={user?.id}
                  className={
                    index % 2 !== 0
                      ? "bg-second-color"
                      : "bg-transparent-first-color"
                  }
                >
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {user.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal opacity-70"
                    >
                      {user?.email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={user?.role_id === 2 ? "No" : "Yes"}
                      className={`px-2 py-1 text-xs font-medium uppercase rounded-md ${
                        user?.role_id === 1
                          ? "bg-red-100 text-red-700 border border-red-400"
                          : "bg-green-100 text-green-700 border border-green-400"
                      }`}
                    />
                  </td>
                  <td className={classes}>
                    <div className="flex gap-6">
                      <Tooltip content="Delete User">
                        <button
                          variant="text"
                          // onClick={() => handleDelete(user?.id)}
                          onClick={() => alert("soon !")}
                        >
                          <TrashIcon className="w-5 h-5 text-red-500" />
                        </button>
                      </Tooltip>
                      <Tooltip content="Edit User">
                        <button variant="text" onClick={() => alert("soon !")}>
                          <PencilIcon className="w-5 h-5 text-blue-500" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AllUsers;
