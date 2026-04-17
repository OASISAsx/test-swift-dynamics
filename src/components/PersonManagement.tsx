"use client";

import React, { useState } from "react";
import { Table, Button, Space, Input, App, Popconfirm, Select } from "antd"; // เพิ่ม Select เข้ามา
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  deletePerson,
  deleteMultiplePersons,
  Person,
} from "@/store/personsSlice";
import { openAddModal, openEditModal } from "@/store/personFormSlice";
import PersonFormModal from "./PersonFormModal";
import type { ColumnsType } from "antd/es/table";

const PersonManagement: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const persons = useSelector((state: RootState) => state.persons.persons);
  const [searchText, setSearchText] = useState("");
  const [sortInfo, setSortInfo] = useState<{
    field: string;
    order: string;
  } | null>(null);
  const { modal, message } = App.useApp();

  const [pageSize, setPageSize] = useState<number>(5);

  const handleDelete = (id: string) => {
    modal.confirm({
      title: t("common.confirm"),
      content: t("person.deleteConfirm"),
      okText: t("common.delete"),
      okButtonProps: { danger: true },
      cancelText: t("common.cancel"),
      onOk: () => {
        dispatch(deletePerson(id));
        message.success(t("person.deletePerson"));
      },
    });
  };

  const handleAdd = () => {
    dispatch(openAddModal());
  };

  const handleEdit = (person: Person) => {
    dispatch(openEditModal(person));
  };

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  // const handleTableChange = (pagination: any, filters: any, sorter: any) => {
  //   if (sorter.field) {
  //     setSortInfo({
  //       field: sorter.field,
  //       order: sorter.order,
  //     });
  //   }
  // };

  const getFilteredAndSortedPersons = () => {
    let filtered = persons.filter(
      (p) =>
        p.firstName.toLowerCase().includes(searchText) ||
        p.lastName.toLowerCase().includes(searchText) ||
        p.email.toLowerCase().includes(searchText) ||
        p.phone.includes(searchText),
    );

    if (sortInfo) {
      filtered.sort((a, b) => {
        const aValue = a[sortInfo.field as keyof Person];
        const bValue = b[sortInfo.field as keyof Person];
        if (aValue < bValue) return sortInfo.order === "ascend" ? -1 : 1;
        if (aValue > bValue) return sortInfo.order === "ascend" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDeleteSelected = () => {
    dispatch(deleteMultiplePersons(selectedRowKeys));
    message.success(
      t("person.deletePersons", { count: selectedRowKeys.length }),
    );
    setSelectedRowKeys([]);
  };

  const columns: ColumnsType<Person> = [
    {
      title: t("person.firstName"),
      dataIndex: "firstName",
      key: "firstName",
      sorter: true,
    },
    {
      title: t("person.lastName"),
      dataIndex: "lastName",
      key: "lastName",
      sorter: true,
    },
    {
      title: t("person.email"),
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: t("person.phone"),
      dataIndex: "phone",
      key: "phone",
      sorter: true,
    },
    {
      title: t("common.edit"),
      key: "edit",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          style={{ marginRight: 8 }}
        >
          {t("common.edit")}
        </Button>
      ),
    },
    {
      title: t("common.delete"),
      key: "delete",
      render: (_, record) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        >
          {t("common.delete")}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#fff", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 16 }}>{t("person.title")}</h2>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Input
            placeholder={t("common.search")}
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Space>

        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          {t("person.addPerson")}
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          danger
          onClick={handleDeleteSelected}
          disabled={selectedRowKeys.length === 0}
        >
          {t("common.deleteSelected")} ({selectedRowKeys.length})
        </Button>
      </div>

      <Table
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        dataSource={getFilteredAndSortedPersons()}
        columns={columns}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true, // This enables the dropdown
          pageSizeOptions: ["5", "10", "20", "50", "100"],
          onShowSizeChange: (current, size) => setPageSize(size),
        }}
      />
      {/* <Select
        value={pageSize}
        style={{ width: 120 }}
        onChange={(value) => setPageSize(value)}
        options={[
          { value: 5, label: "5" },
          { value: 10, label: "10" },
          { value: 20, label: "20" },
          { value: 50, label: "50" },
          { value: 100, label: "100" },
        ]}
      /> */}
      <PersonFormModal />
    </div>
  );
};

export default PersonManagement;
