import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Dispatch, Link, connect } from 'umi';
import { StateType } from './model';
import styles from './style.less';
import { LoginParamsType } from './service';
import LoginFrom from './components/Login';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;
interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  dispatch: Dispatch;
  BLOCK_NAME_CAMEL_CASE: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const PAGE_NAME_UPPER_CAMEL_CASE: React.FC<PAGE_NAME_UPPER_CAMEL_CASEProps> = (props) => {
  const { BLOCK_NAME_CAMEL_CASE = {}, submitting } = props;
  const { status, type: loginType } = BLOCK_NAME_CAMEL_CASE;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/login',
      payload: {
        ...values,
        type,
      },
    });
  };
  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="Inicio de sesión con contraseña">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="Cuenta o contraseña incorrecta（admin/machina.ai）" />
          )}

          <UserName
            name="userName"
            placeholder="nombre de usuario: admin or user"
            rules={[
              {
                required: true,
                message: 'por favor ingrese el nombre de usuario!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="password: machina.ai"
            rules={[
              {
                required: true,
                message: '¡Por favor introduzca la contraseña!',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="Inicio de sesión móvil">
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="Error de código de verificación" />
          )}
          <Mobile
            name="mobile"
            placeholder="número de teléfono"
            rules={[
              {
                required: true,
                message: 'Por favor, introduzca el número de teléfono!',
              },
              {
                pattern: /^1\d{10}$/,
                message: '¡Número de teléfono mal formado!',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="Captcha"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="verificación"
            rules={[
              {
                required: true,
                message: 'por favor ingrese el código de verificación!',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
          recordar
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            recuperar contraseña
          </a>
        </div>
        <Submit loading={submitting}>Iniciar Sesión</Submit>
        <div className={styles.other}>
          Otros métodos de inicio de sesión
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
          Registrar Cuenta
          </Link>
        </div>
      </LoginFrom>
    </div>
  );
};

export default connect(
  ({
    BLOCK_NAME_CAMEL_CASE,
    loading,
  }: {
    BLOCK_NAME_CAMEL_CASE: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    BLOCK_NAME_CAMEL_CASE,
    submitting: loading.effects['BLOCK_NAME_CAMEL_CASE/login'],
  }),
)(PAGE_NAME_UPPER_CAMEL_CASE);
