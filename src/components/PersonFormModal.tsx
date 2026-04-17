"use client";

import React from "react";
import { Modal, Form, Input, Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { closeModal, updateFormData } from "@/store/personFormSlice";
import { addPerson, updatePerson, Person } from "@/store/personsSlice";
import { v4 as uuidv4 } from "uuid";

const PersonFormModal: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { isModalOpen, formData, editingId } = useSelector(
    (state: RootState) => state.personForm,
  );

  const handleOk = () => {
    const person: Person = {
      id: editingId || uuidv4(),
      ...formData,
    };

    if (editingId) {
      dispatch(updatePerson(person));
    } else {
      dispatch(addPerson(person));
    }

    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleFormChange = (changedValues: any) => {
    dispatch(updateFormData(changedValues));
  };

  return (
    <Modal
      title={editingId ? t("person.editPerson") : t("person.addPerson")}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {t("common.cancel")}
        </Button>,
        <Button key="save" type="primary" onClick={handleOk}>
          {t("common.save")}
        </Button>,
      ]}
      destroyOnHidden
    >
      <Form
        layout="vertical"
        onValuesChange={handleFormChange}
        initialValues={formData}
      >
        <Form.Item
          label={t("person.firstName")}
          name="firstName"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("person.lastName")}
          name="lastName"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("person.email")}
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("person.phone")}
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("person.address")} name="address">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PersonFormModal;
