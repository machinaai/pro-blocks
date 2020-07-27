import React from 'react';
import { Form, Button, Divider, Input, Select } from 'antd';
import { connect, Dispatch, formatMessage, getLocale } from 'umi';
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
        type: 'formStepForm/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'formStepForm/saveCurrentStep',
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
          label={formatMessage({id: 'BLOCK_NAME.pay-account'})}
          name="payAccount"
          rules={[{ required: true, message: getLocale() === 'es-ES' ? 'Por favor seleccione una cuenta de cargo' : 'Please select a charging account'}]}
          className={styles.formItem}
        >
          <Select placeholder={formatMessage({id: 'BLOCK_NAME.test-email'})} className={styles.selectForm}>
            <Option value="react-design@machina.ai">react-design@machina.ai</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={formatMessage({id: 'BLOCK_NAME.accounts-receivable'})}
          className={styles.formItem}
        >
          <Input.Group compact className={styles.selectForm}>
            <Select defaultValue="mibanco" style={{ width: 100 }} className={styles.selectForm}>
              <Option value="mibanco">
                {formatMessage({ id: 'formstepform.form.label.myBank' })}
              </Option>
              <Option value="bank">
                {formatMessage({ id: 'formstepform.form.label.otherBank' })}
              </Option>
            </Select>
            <Form.Item
              noStyle
              name="receiverAccount"
              rules={[
                { required: true, message: getLocale() === 'es-ES' ? 'Por favor ingrese la cuenta del beneficiario' : 'Please enter the beneficiary´s account'},
                { type: 'email', message: getLocale() === 'es-ES' ? 'El nombre de la cuenta debe estar en formato de correo electrónico' : 'Account name must be in email format'},
              ]}
            >
              <Input
                style={{ width: 'calc(100% - 100px)' }}
                placeholder={formatMessage({id: 'BLOCK_NAME.test-email'})}
                className={styles.selectForm}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item
          label={formatMessage({id: 'BLOCK_NAME.beneficiary-account'})}
          name="receiverName"
          rules={[{ required: true, message: getLocale() === 'es-ES' ? 'Por favor ingrese el nombre del beneficiario' : 'Please enter the name of the beneficiary'}]}
          className={styles.formItem}
        >
          <Input
           placeholder={formatMessage({id: 'BLOCK_NAME.beneficiary-placeholder'})}
            className={styles.selectForm}
          />
        </Form.Item>
        <Form.Item
          label={formatMessage({id: 'BLOCK_NAME.transfer-amount'})}
          name="amount"
          rules={[
            { required: true, message: formatMessage({id: 'formstepform.form.label.required.transferAmmount'}) },
            {
              pattern: /^(\d+)((?:\.\d+)?)$/,
              message: getLocale() === 'es-ES' ? 'Por favor ingrese un monto válido' : 'Please enter a valid amount',
            },
          ]}
          className={styles.formItem}
        >
          <Input
            prefix="$"
            placeholder={formatMessage({id: 'BLOCK_NAME.amount-placeholder'})} 
            className={styles.selectForm}
          />
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
          {formatMessage({id: 'BLOCK_NAME.btn-next'})}
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
      <h3>{formatMessage({id: 'BLOCK_NAME.text-title'})}</h3>
        <h4>{formatMessage({id: 'BLOCK_NAME.text-subtitle'})}</h4>
        <p>
        {formatMessage({id: 'BLOCK_NAME.text1'})}
        </p>
        <h4>{formatMessage({id: 'BLOCK_NAME.text-subtitle2'})}</h4>
        <p>
        {formatMessage({id: 'BLOCK_NAME.text2'})}
        </p>
      </div>
    </>
  );
};

export default connect(({ formStepForm }: { formStepForm: StateType }) => ({
  data: formStepForm.step,
}))(Step1);
