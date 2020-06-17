import React from 'react';
import { Form, Button, Divider, Input, Select } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'BLOCK_NAME_CAMEL_CASE/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'BLOCK_NAME_CAMEL_CASE/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={data}
      >
        <Form.Item
          label="Cuenta de cargo"
          name="payAccount"
          rules={[{ required: true, message: 'Por favor seleccione una cuenta de cargo' }]}
        >
          <Select placeholder="test@example.com">
            <Option value="react-design@machina.ai">react-design@machina.ai</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Cuentas por cobrar">
          <Input.Group compact>
            <Select defaultValue="mibanco" style={{ width: 100 }}>
              <Option value="mibanco">Mi banco</Option>
              <Option value="bank">otro banco</Option>
            </Select>
            <Form.Item
              noStyle
              name="receiverAccount"
              rules={[
                { required: true, message: 'Por favor ingrese la cuenta del beneficiario' },
                { type: 'email', message: 'El nombre de la cuenta debe estar en formato de correo electrónico' },
              ]}
            >
              <Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item
          label="Nombre del beneficiario"
          name="receiverName"
          rules={[{ required: true, message: 'Por favor ingrese el nombre del beneficiario' }]}
        >
          <Input placeholder="Por favor ingrese el nombre del beneficiario" />
        </Form.Item>
        <Form.Item
          label="monto de la transferencia"
          name="amount"
          rules={[
            { required: true, message: 'Por favor ingrese el monto de la transferencia' },
            {
              pattern: /^(\d+)((?:\.\d+)?)$/,
              message: 'Por favor ingrese un monto válido',
            },
          ]}
        >
          <Input prefix="$" placeholder="Por favor ingrese la cantidad" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={onValidateForm}>
            Próximo paso
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>Descripción</h3>
        <h4>Transferencia a cuenta del mismo banco</h4>
        <p>
          Si es necesario, puede hacer algunas preguntas comunes sobre el producto aquí. Si es necesario, puede poner algunas preguntas frecuentes sobre el producto aquí. Si es necesario, puede poner algunas preguntas frecuentes sobre el producto aquí.
        </p>
        <h4>Transferencia a tarjeta bancaria</h4>
        <p>
        Si necesita transferir dinero a una tarjeta bancaria, puede hacer algunas preguntas frecuentes sobre el producto aquí. Si es necesario, puede poner algunas preguntas frecuentes sobre el producto aquí. Si es necesario, puede poner algunas preguntas frecuentes sobre el producto aquí.
        </p>
      </div>
    </>
  );
};

export default connect(({ BLOCK_NAME_CAMEL_CASE }: { BLOCK_NAME_CAMEL_CASE: StateType }) => ({
  data: BLOCK_NAME_CAMEL_CASE.step,
}))(Step1);
