import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    name: props.values.name,
    desc: props.values.desc,
    key: props.values.key,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem name="target" label="Objeto de monitoreo">
            <Select style={{ width: '100%' }}>
              <Option value="0">Tabla 1</Option>
              <Option value="1">Tabla 2</Option>
            </Select>
          </FormItem>
          <FormItem name="template" label="Plantilla de regla">
            <Select style={{ width: '100%' }}>
              <Option value="0">Plantilla de regla 1</Option>
              <Option value="1">Plantilla de regla 2</Option>
            </Select>
          </FormItem>
          <FormItem name="type" label="Tipo de regla">
            <RadioGroup>
              <Radio value="0">Fuerte</Radio>
              <Radio value="1">Fuerte</Radio>
            </RadioGroup>
          </FormItem>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <FormItem
            name="time"
            label="Hora de inicio"
            rules={[{ required: true, message: 'Por favor, seleccione una hora de inicio' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Elige una hora de inicio"
            />
          </FormItem>
          <FormItem name="frequency" label="Período de programación">
            <Select style={{ width: '100%' }}>
              <Option value="month">Mes</Option>
              <Option value="week">Semana</Option>
            </Select>
          </FormItem>
        </>
      );
    }
    return (
      <>
        <FormItem
          name="name"
          label="Nombre de la regla"
          rules={[{ required: true, message: 'Por favor ingrese el nombre de la regla' }]}
        >
          <Input placeholder="por favor escribe" />
        </FormItem>
        <FormItem
          name="desc"
          label="Descripción de la regla"
          rules={[{ required: true, message: '¡Ingrese una descripción de la regla de al menos cinco caracteres!', min: 5 }]}
        >
          <TextArea rows={4} placeholder="Por favor ingrese al menos cinco caracteres" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
          Anterior
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>cancelar</Button>
          <Button type="primary" onClick={() => handleNext()}>
          Siguiente
          </Button>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            Anterior
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>cancelar</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Siguiente
          </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>cancelar</Button>
        <Button type="primary" onClick={() => handleNext()}>
          Siguiente
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Configuración de la regla"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="Información básica" />
        <Step title="Configurar propiedades de regla" />
        <Step title="Establecer período de programación" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          type: formVals.type,
          frequency: formVals.frequency,
          name: formVals.name,
          desc: formVals.desc,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
