"use client";

import { Form, message, Select, Space } from "antd";
import type { SelectProps } from "antd";
import {
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "@/redux/api/user/userApi";
import { toast } from "sonner";

//const { Text } = Typography;

const roleOptions: SelectProps["options"] = [
  { label: "SUPER_ADMIN", value: "SUPER_ADMIN" },
  { label: "ADMIN", value: "ADMIN" },
  { label: "EDITOR", value: "EDITOR" },
  { label: "CUSTOMER", value: "CUSTOMER" },
];

const statusOptions: SelectProps["options"] = [
  { label: "ACTIVE", value: "ACTIVE" },
  { label: "DEACTIVE", value: "DEACTIVE" },
  { label: "DELETED", value: "DELETED" },
];

type TRole = {
  key: string;
  role: string;
  status: string;
};

const ActionCell = ({ record }: { record: TRole }) => {
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleRoleChange = async (value: string) => {
    try {
      await updateUserRole({ id: record.key, role: value }).unwrap();
      message.success("Role updated successfully");
      toast.success("Role is updated...");
    } catch (err) {
      message.error(`Failed to update role: ${err}`);
      toast.error("Failed to updated...");
    }
  };

  const handleStatusChange = async (value: string) => {
    try {
      await updateUserStatus({ id: record.key, status: value }).unwrap();
      message.success("Status updated successfully");
      toast.success("Status is updated...");
    } catch (err) {
      message.error(`Failed to update status: ${err}`);
      toast.error("Failed to updated...");
    }
  };

  return (
    <Space direction="vertical" size={4}>
      <Form.Item label="Role">
        <Select
          defaultValue={record.role}
          style={{ width: 120 }}
          options={roleOptions}
          onChange={handleRoleChange}
        />
      </Form.Item>
      <Form.Item label="Status">
        <Select
          defaultValue={record.status}
          style={{ width: 120 }}
          options={statusOptions}
          onChange={handleStatusChange}
        />
      </Form.Item>
    </Space>
  );
};

export default ActionCell;

// <Space direction="horizontal" size={4}>
//   <div className="flex flex-col">
//     <Text type="secondary" style={{ fontSize: "12px" }}>
//       Role
//     </Text>
//     <Select
//       defaultValue={record.role}
//       style={{ width: 120 }}
//       options={roleOptions}
//       onChange={handleRoleChange}
//     />
//   </div>
//   <div className="flex flex-col">
//     <Text type="secondary" style={{ fontSize: "12px" }}>
//       Status
//     </Text>
//     <Select
//       defaultValue={record.status}
//       style={{ width: 120 }}
//       options={statusOptions}
//       onChange={handleStatusChange}
//     />
//   </div>
// </Space>
