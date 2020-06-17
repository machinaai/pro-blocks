import { Button, Result, Descriptions, Statistic } from 'antd';
import React from 'react';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';

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
        type: 'BLOCK_NAME_CAMEL_CASE/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="Cuenta de pago"> {payAccount}</Descriptions.Item>
        <Descriptions.Item label="Cuentas por cobrar"> {receiverAccount}</Descriptions.Item>
        <Descriptions.Item label="Nombre del beneficiario"> {receiverName}</Descriptions.Item>
        <Descriptions.Item label="monto de la transferencia">
          <Statistic value={amount} suffix="$" />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        Volver a empezar
      </Button>
      <Button>Ver factura</Button>
    </>
  );
  return (
    <Result
      status="success"
      title="Operación exitosa"
      subTitle="Se espera que llegue dentro de dos horas"
      extra={extra}
      className={styles.result}
    >
      {information}
    </Result>
  );
};

export default connect(({ BLOCK_NAME_CAMEL_CASE }: { BLOCK_NAME_CAMEL_CASE: StateType }) => ({
  data: BLOCK_NAME_CAMEL_CASE.step,
}))(Step3);
