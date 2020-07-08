import React, { FC, useEffect } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select } from 'antd';
import { BasicListItemDataType } from '../data.d';
import styles from '../style.less';
import { formatMessage } from 'umi';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: BasicListItemDataType) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as BasicListItemDataType);
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: formatMessage({ id: 'BASIC-LIST.modal.edit.save' }), onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title={formatMessage({ id: 'BASIC-LIST.modal.success.title' })}
          subTitle={formatMessage({ id: 'BASIC-LIST.modal.success.subtitle' })}
          extra={
            <Button type="primary" onClick={onDone}>
              {formatMessage({ id: 'BASIC-LIST.modal.success.button' })}
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label={formatMessage({ id: 'BASIC-LIST.form.task.name' })}
          rules={[{ required: true, message: 'Por favor ingrese un nombre de tarea' }]}
        >
          <Input placeholder={formatMessage({ id: 'BASIC-LIST.form.task.name.placeholder' })} />
        </Form.Item>
        <Form.Item
          name="createdAt"
          label={formatMessage({ id: 'BASIC-LIST.form.task.time' })}
          rules={[{ required: true, message: 'Por favor seleccione una hora de inicio' }]}
        >
          <DatePicker
            showTime
            placeholder={formatMessage({ id: 'BASIC-LIST.form.task.time.placeholder' })}
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name="owner"
          label={formatMessage({ id: 'BASIC-LIST.form.task.leader' })}
          rules={[{ required: true, message: 'Por favor seleccione la persona a cargo' }]}
        >
          <Select placeholder={formatMessage({ id: 'BASIC-LIST.form.task.leader.placeholder' })}>
            <Select.Option value="hernandez">Hernández</Select.Option>
            <Select.Option value="lopez">López</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="subDescription"
          label={formatMessage({ id: 'BASIC-LIST.form.task.description' })}
          rules={[
            {
              message: '¡Ingrese una descripción del producto de al menos cinco caracteres!',
              min: 5,
            },
          ]}
        >
          <TextArea rows={4} placeholder="Por favor ingrese al menos cinco caracteres" />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `tarea${current ? 'editar' : 'añadir'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
