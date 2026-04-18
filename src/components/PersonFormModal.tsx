"use client";

import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Col,
  Row,
  Select,
  DatePicker,
  App,
  Radio,
  Space,
  Grid,
} from "antd";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { closeModal } from "@/store/personFormSlice";
import { addPerson, updatePerson } from "@/store/personsSlice";
import { v4 as uuidv4 } from "uuid";
import { Person } from "../types/person.type";
import dayjs from "dayjs";
import {
  getCountryOptions,
  getGenderOptions,
  getNationalityOptions,
} from "@/constants/options";

const PersonFormModal: React.FC = () => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const screens = Grid.useBreakpoint();

  const { isModalOpen, formData, editingId } = useSelector(
    (state: RootState) => state.personForm,
  );

  useEffect(() => {
    if (isModalOpen) {
      if (editingId && formData) {
        form.setFieldsValue({
          ...formData,
          birthday: formData.birthday
            ? dayjs(formData.birthday, "DD/MM/YYYY")
            : null,
        });
      } else {
        form.resetFields();
      }
    }
  }, [isModalOpen, editingId, form, formData]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const person: Person = {
        id: editingId || uuidv4(),
        ...values,
        birthday: values.birthday ? values.birthday.format("DD/MM/YYYY") : null,
      };

      if (editingId) {
        dispatch(updatePerson(person));
      } else {
        dispatch(addPerson(person));
      }

      dispatch(closeModal());
      form.resetFields();

      message.success(
        editingId ? t("person.updateSuccess") : t("person.addSuccess"),
      );
    } catch (errorInfo) {
      console.log("Validate Failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const modalWidth = screens.xl
    ? 1200
    : screens.lg
      ? 960
      : screens.md
        ? 720
        : "calc(100vw - 24px)";

  return (
    <Modal
      title={editingId ? t("person.editPerson") : t("person.addPerson")}
      open={isModalOpen}
      width={modalWidth}
      centered
      onCancel={handleCancel}
      styles={{ body: { paddingBottom: 8 } }}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {t("common.cancel")}
        </Button>,
        <Button key="save" type="primary" onClick={handleOk}>
          {t("common.save")}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8} md={6} lg={4}>
            <Form.Item
              name="prefix"
              label={t("person.prefix")}
              rules={[{ required: true, message: t("validate.required") }]}
            >
              <Select
                allowClear
                placeholder={t("person.selectPrefix")}
                options={[
                  { label: t("person.mr"), value: "male" },
                  { label: t("person.ms"), value: "female" },
                  { label: t("person.mrs"), value: "other" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8} md={9} lg={10}>
            <Form.Item
              label={t("person.firstName")}
              name="firstName"
              rules={[{ required: true, message: t("validate.firstName") }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8} md={9} lg={10}>
            <Form.Item
              label={t("person.lastName")}
              name="lastName"
              rules={[{ required: true, message: t("validate.lastName") }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              name="birthday"
              label={t("person.birthday")}
              rules={[{ required: true, message: t("validate.birthday") }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder={t("person.birthday")}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={t("person.nationality")}
              name="nationality"
              rules={[{ required: true, message: t("validate.nationality") }]}
            >
              <Select
                allowClear
                placeholder={t("person.selectNationality")}
                options={getNationalityOptions(t)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label={t("person.phone")}>
              <Space.Compact
                block
                direction={screens.xs ? "vertical" : "horizontal"}
                style={{ width: "100%" }}
              >
                <Form.Item name="phoneCode" noStyle initialValue="+66">
                  <Select
                    options={getCountryOptions()}
                    style={{ width: screens.xs ? "100%" : 110 }}
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  noStyle
                  rules={[{ required: true, message: t("validate.phone") }]}
                >
                  <Input
                    placeholder={t("validate.addphone")}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} lg={14}>
            <Form.Item
              name="citizenId"
              label={t("person.citizenId")}
              rules={[
                { required: true, message: t("validate.citizenId") },
                { len: 13, message: t("validate.citizenIdLength") },
              ]}
            >
              <Input.OTP
                length={13}
                style={{ width: "100%" }}
                formatter={(str) => str.replace(/\D/g, "")}
                separator={(index) => {
                  if (
                    index === 0 ||
                    index === 4 ||
                    index === 9 ||
                    index === 11
                  ) {
                    return (
                      <span style={{ margin: "0 4px", color: "#ccc" }}>-</span>
                    );
                  }
                  return null;
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={10} style={{ paddingLeft: "100px" }}>
            <Form.Item
              name="gender"
              label={t("person.gender")}
              rules={[{ required: true, message: t("validate.gender") }]}
            >
              <Radio.Group
                options={getGenderOptions(t)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={t("person.passportNumber")}
              name="passportNumber"
              rules={[
                { required: true, message: t("validate.passportNumber") },
                {
                  pattern: /^[A-Z]{1,2}\d{7,8}$/,
                  message: t("validate.passportPattern"),
                },
                { len: 9, message: t("validate.passportLength") },
              ]}
            >
              <Input
                placeholder="Ex. AA1234567"
                maxLength={9}
                style={{ textTransform: "uppercase" }}
              />
            </Form.Item>
            {/* <Form.Item name="passportNumber">
                <Input type="number" placeholder={t("person.passportNumber")} />
              </Form.Item> */}
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item name="expectedSalary" label={t("person.expectedSalary")}>
              <Input type="number" placeholder={t("person.expectedSalary")} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label=" ">
              <Button
                type="dashed"
                style={{ width: "100%" }}
                onClick={() => form.resetFields()}
              >
                {t("validate.resetFields")}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default PersonFormModal;
