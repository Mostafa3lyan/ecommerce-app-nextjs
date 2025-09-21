"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Button,
  addToast,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Card,
  CardBody,
} from "@heroui/react";
import { Edit3 as EditIcon, Eye, EyeOff } from "lucide-react";
import { User } from "@/types/orders.types";
import updateUserData from "@/api/profile/updateUserData";
import changePassword from "@/api/profile/changePassword";

const UserProfile = ({ user }: { user: User }) => {
  const [data, setData] = useState({
    name: user?.name || "Unknown",
    email: user?.email || "Not provided",
    phone: user?.phone || "Not provided",
  });

  type Field = "name" | "email" | "phone";
  const [editing, setEditing] = useState<Field | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Password modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const res = await updateUserData(data.name, data.email, data.phone);

      if (res.message === "Success") {
        addToast({
          title: "Success",
          description: "Profile updated successfully",
          color: "success",
          variant: "flat",
        });
        setEditing(null);
      } else {
        addToast({
          title: "Error",
          description: res?.errors?.msg || "Update failed",
          color: "danger",
          variant: "flat",
        });
      }
    } catch (err: any) {
      addToast({
        title: "Error",
        description: err?.message || "Something went wrong",
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: Field, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      addToast({
        title: "Error",
        description: "All password fields are required",
        color: "warning",
        variant: "flat",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      addToast({
        title: "Error",
        description: "Passwords do not match",
        color: "warning",
        variant: "flat",
      });
      return;
    }

    try {
      setIsChanging(true);
      const res = await changePassword(
        currentPassword,
        newPassword,
        confirmPassword
      );

      if (res.message === "Success") {
        addToast({
          title: "Success",
          description: "Password changed successfully",
          color: "success",
          variant: "flat",
        });
        onOpenChange();
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else if (res.statusMsg === "fail") {
        addToast({
          title: "Error",
          description: res?.message || "Password change failed",
          color: "danger",
          variant: "flat",
        });
      } else {
        const message =
          typeof res.message === "object"
            ? JSON.stringify(res.message) // Or res.message.error if known structure
            : res.message || "An error occurred";
        console.log(res);
        addToast({
          title: "Error",
          description: res?.errors.msg || "Password change failed",
          color: "danger",
          variant: "flat",
        });
      }
    } catch (err: any) {
      addToast({
        title: "Error",
        description: err?.message || "Something went wrong",
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="px-4 py-8 sm:px-8">
      <Card className="max-w-3xl mx-auto shadow-md rounded-2xl">
        <CardBody>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            User Profile
          </h2>

          {/* Table */}
          <Table aria-label="User profile edit table" removeWrapper>
            <TableHeader>
              <TableColumn className="font-semibold">Field</TableColumn>
              <TableColumn className="font-semibold">Value</TableColumn>
              <TableColumn className="font-semibold">Edit</TableColumn>
            </TableHeader>

            <TableBody>
              {(["name", "email", "phone"] as Field[]).map((field) => (
                <TableRow key={field}>
                  <TableCell className="font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </TableCell>

                  <TableCell>
                    {editing === field ? (
                      <Input
                        autoFocus
                        value={data[field]}
                        variant="bordered"
                        onChange={(e) => handleChange(field, e.target.value)}
                      />
                    ) : (
                      <span className="text-gray-600">{data[field]}</span>
                    )}
                  </TableCell>

                  <TableCell>
                    <Tooltip content={`Edit ${field}`}>
                      <span
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClick={() => setEditing(field)}
                      >
                        <EditIcon size={18} />
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
            {/* Change Password */}
            <Button
              color="primary"
              onPress={onOpen}
              className="w-full sm:w-auto"
            >
              Change Password
            </Button>
            <Modal
              isOpen={isOpen}
              placement="top-center"
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Change Password
                    </ModalHeader>
                    <ModalBody className="space-y-3">
                      <Input
                        label="Current Password"
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <Eye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <Input
                        label="New Password"
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <Eye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <Input
                        label="Confirm Password"
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <Eye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        color="primary"
                        onPress={handleChangePassword}
                        isLoading={isChanging}
                        isDisabled={isChanging}
                      >
                        {isChanging ? "Changing..." : "Change Password"}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

            {/* Save profile */}
            <Button
              onPress={handleEdit}
              isLoading={isLoading}
              isDisabled={isLoading}
              className="w-full sm:w-auto bg-green-600 text-slate-50 hover:bg-green-500"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserProfile;
