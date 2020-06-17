import React from 'react';
import { Form, Alert, Button, Descriptions, Divider, Statistic, Input } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step2Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
}

const Step2: React.FC<Step2Props> = (props) => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;
  if (!data) {
    return null;
  }
  const { validateFields, getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'BLOCK_NAME_CAMEL_CASE/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'BLOCK_NAME_CAMEL_CASE/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'BLOCK_NAME_CAMEL_CASE/submitStepForm',
        payload: {
          ...data,
          ...values,
        },
      });
    }
  };

  const { payAccount, receiverAccount, receiverName, amount } = data;
  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      initialValues={{ password: '123456' }}
    >
      <Alert
        closable
        showIcon
        message="Después de confirmar la transferencia, los fondos se acreditarán directamente a la cuenta de la otra parte y no podrán devolverse."
        style={{ marginBottom: 24 }}
      />
      <Descriptions column={1}>
        <Descriptions.Item label="Cuenta de pago"> {payAccount}</Descriptions.Item>
        <Descriptions.Item label="Cuentas por cobrar"> {receiverAccount}</Descriptions.Item>
        <Descriptions.Item label="Nombre del beneficiario"> {receiverName}</Descriptions.Item>
        <Descriptions.Item label="monto de la transferencia">
          <Statistic value={amount} suffix="$" />
        </Descriptions.Item>
      </Descriptions>
      <Divider style={{ margin: '24px 0' }} />
      <Form.Item
        label="Contraseña de pago"
        name="password"
        required={false}
        rules={[{ required: true, message: 'Se requiere contraseña de pago para realizar el pago' }]}
      >
        <Input type="password" autoComplete="off" style={{ width: '80%' }} />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 8 }}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
      >
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          enviar
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
         Anterior
        </Button>
      </Form.Item>
    </Form>
  );
};
export default connect(
  ({
    BLOCK_NAME_CAMEL_CASE,
    loading,
  }: {
    BLOCK_NAME_CAMEL_CASE: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['BLOCK_NAME_CAMEL_CASE/submitStepForm'],
    data: BLOCK_NAME_CAMEL_CASE.step,
  }),
)(Step2);
