"use client";

import React from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useGetAllUsersQuery } from "@/redux/api/user/userApi";
import ActionCell from "@/components/shared/ActionCell";

interface DataType {
  key: string;
  name: string;
  email: string;
  role: string;
  status: string;
  tags: string[];
}

type TUser = {
  id: string;
  user_name: string;
  profile?: {
    fullName?: string;
  };
  email: string;
  role: string;
  status: string;
  tags: string[];
};

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <ActionCell record={record} />,
  },
];

const AllUserList = () => {
  const { isError, isLoading, data: allUsers } = useGetAllUsersQuery(undefined);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load users.</p>;
  console.log(allUsers);

  const transformedData: DataType[] = allUsers.data.map((user: TUser) => ({
    key: user.id,
    name: user.user_name || user.profile?.fullName || "N/A",
    email: user.email,
    role: user.role,
    status: user.status,
    tags: [user.role.toLowerCase()],
  }));

  return <Table<DataType> columns={columns} dataSource={transformedData} />;
};

export default AllUserList;
