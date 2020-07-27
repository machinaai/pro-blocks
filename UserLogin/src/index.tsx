import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Dispatch, Link, connect, formatMessage, FormattedMessage } from 'umi';
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
        <Tab key="account" tab={formatMessage({id: 'USER_Name.text.title'})}>
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content={formatMessage({id: 'USER_Name.text.subtitle'})} />
          )}

          <UserName
            name={formatMessage({id: 'USER_Name.text.name'})}
            placeholder={formatMessage({id: 'USER_Name.text.placeholder'})}
            rules={[
              {
                required: true,
                message: formatMessage({id: 'USER_Name.userName.message'}),
              },
            ]}
          />
          <Password
            name={formatMessage({id: 'USER_Name.password.title'})}
            placeholder={formatMessage({id: 'USER_Name.password.placeholder'})}
            rules={[
              {
                required: true,
                message: formatMessage({id: 'USER_Name.password.message'}),
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab={formatMessage({id: 'USER_Name.text.mobile.title'})}>
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content={formatMessage({id: 'USER_Name.text.mobile.error'})} />
          )}
          <Mobile
            name="mobile"
            placeholder={formatMessage({id: 'USER_Name.mobile.placeholder'})}
            rules={[
              {
                required: true,
                message: formatMessage({id: 'USER_Name.mobile.message.number'}),
              },
              {
                pattern: /^1\d{10}$/,
                message: formatMessage({id: 'USER_Name.mobile.message.error.number'}),
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder={formatMessage({id: 'USER_Name.captcha.placeholder'})}
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="verificación"
            rules={[
              {
                required: true,
                message: formatMessage({id: 'USER_Name.captcha.message'}),
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
             <FormattedMessage id='USER_Name.checkbox' />
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
          <FormattedMessage id='USER_Name.forgo.password' />
          </a>
        </div>
        <Submit loading={submitting}>
          <FormattedMessage id='USER_Name.log.in' />
        </Submit>
        <div className={styles.other}>
        <FormattedMessage id='USER_Name.loging.methods' /> 
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
          <FormattedMessage id='USER_Name.register.account' />
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
