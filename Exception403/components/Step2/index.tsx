import React from 'react';
import { Form, Alert, Button, Descriptions, Divider, Statistic, Input } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';
import { formatMessage } from 'umi';

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
        type: 'formStepForm/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'formStepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'formStepForm/submitStepForm',
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
        message={formatMessage({id: 'BLOCK_NAME.transfer-alert'})}
        style={{ marginBottom: 24 }}
      />
      <Descriptions column={1}>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.pay-account'})}> {payAccount}</Descriptions.Item>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.accounts-receivable'})}> {receiverAccount}</Descriptions.Item>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.beneficiary-account'})}> {receiverName}</Descriptions.Item>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.transfer-amount'})}>
          <Statistic value={amount} suffix="$" />
        </Descriptions.Item>
      </Descriptions>
      <Divider style={{ margin: '24px 0' }} />
      <Form.Item
        label={formatMessage({id: 'BLOCK_NAME.transfer-password'})}
        name="password"
        required={false}
        rules={[
          { required: true, message: 'Se requiere contraseña de pago para realizar el pago' },
        ]}
        className={styles.formItem}
      >
        <Input
          type="password"
          autoComplete="off"
          style={{ width: '64%' }}
          className={styles.inputForm}
        />
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
          {formatMessage({id: 'BLOCK_NAME.transfer-btn-next'})}
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
         {formatMessage({id: 'BLOCK_NAME.transfer-btn-prev'})}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default connect(
  ({
    formStepForm,
    loading,
  }: {
    formStepForm: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['formStepForm/submitStepForm'],
    data: formStepForm.step,
  }),
)(Step2);
