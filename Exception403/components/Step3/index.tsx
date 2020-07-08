import { Button, Result, Descriptions, Statistic } from 'antd';
import React from 'react';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';
import { formatMessage  } from 'umi';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

const Step3: React.FC<Step3Props> = (props) => {
  const { data, dispatch } = props;
  if (!data) {
    return null;
  }
  const { payAccount, receiverAccount, receiverName, amount } = data;
  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'formStepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
      <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.pay-account'})}> {payAccount}</Descriptions.Item>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.accounts-receivable'})}> {receiverAccount}</Descriptions.Item>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.beneficiary-account'})}> {receiverName}</Descriptions.Item>
        <Descriptions.Item label={formatMessage({id: 'BLOCK_NAME.transfer-amount'})}>
          <Statistic value={amount} suffix="$" />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
  const extra = (
    <>
       <Button type="primary" onClick={onFinish}>
        {formatMessage({id: 'BLOCK_NAME.transfer-btn-prev'})}
      </Button>
      <Button>{formatMessage({id: 'BLOCK_NAME.btn-next'})}</Button>
    </>
  );
  return (
    <Result
      status="success"
      title={formatMessage({id: 'BLOCK_NAME.result-title'})}
      subTitle={formatMessage({id: 'BLOCK_NAME.result-subtitle'})}
      extra={extra}
      className={styles.result}
    >
      {information}
    </Result>
  );
};

export default connect(({ formStepForm }: { formStepForm: StateType }) => ({
  data: formStepForm.step,
}))(Step3);
