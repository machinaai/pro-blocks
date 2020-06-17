import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, TimePicker } from 'antd';

import React, { FC, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';
import FooterToolbar from './components/FooterToolbar';
import styles from './style.less';

type InternalNamePath = (string | number)[];

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
   nombre: 'Nombre del almacén',
   url: 'Nombre de dominio de almacén',
   propietario: 'Administrador de almacén',
   aprobador: 'Aprobador',
   dateRange: 'Fecha efectiva',
   tipo: 'Tipo de almacén',
   nombre2: 'Nombre de la tarea',
   url2: 'Descripción de la tarea',
   propietario2: 'Ejecutor',
   approver2: 'Persona responsable',
   dateRange2: 'Fecha efectiva',
   type2: 'Tipo de tarea',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
}

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const PAGE_NAME_UPPER_CAMEL_CASE: FC<PAGE_NAME_UPPER_CAMEL_CASEProps> = ({
  submitting,
  dispatch,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="Información de verificación de formulario"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = (values: { [key: string]: any }) => {
    setError([]);
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/submitAdvancedForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageHeaderWrapper content="Los formularios avanzados se usan comúnmente para ingresar y enviar grandes cantidades de datos a la vez.">
        <Card title="Gestion de almacenes" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.name}
                name="name"
                rules={[{ required: true, message: 'Por favor ingrese el nombre del almacén' }]}
              >
                <Input placeholder="Por favor ingrese el nombre del almacén" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.url}
                name="url"
                rules={[{ required: true, message: 'por favor elige' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="por favor escriba"
                />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.owner}
                name="owner"
                rules={[{ required: true, message: 'Por favor seleccione un administrador' }]}
              >
                <Select placeholder="Por favor seleccione un administrador">
                  <Option value="hernandez">Hernández</Option>
                  <Option value="lopez">López</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.approver}
                name="approver"
                rules={[{ required: true, message: 'Por favor seleccione un aprobador' }]}
              >
                <Select placeholder="Por favor seleccione un aprobador">
                  <Option value="hernandez">Hernández</Option>
                  <Option value="lopez">López</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.dateRange}
                name="dateRange"
                rules={[{ required: true, message: 'Por favor seleccione fecha de vigencia' }]}
              >
                <RangePicker placeholder={['fecha de inicio', 'Fecha final']} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.type}
                name="type"
                rules={[{ required: true, message: 'Por favor seleccione el tipo de almacén' }]}
              >
                <Select placeholder="Por favor seleccione el tipo de almacén">
                  <Option value="private">privado</Option>
                  <Option value="public">público</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Administración de tareas" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.name2}
                name="name2"
                rules={[{ required: true, message: 'por favor escribe' }]}
              >
                <Input placeholder="por favor escribe" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.url2}
                name="url2"
                rules={[{ required: true, message: 'por favor escribe' }]}
              >
                <Input placeholder="por favor escribe" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.owner2}
                name="owner2"
                rules={[{ required: true, message: 'Por favor seleccione un administrador' }]}
              >
                <Select placeholder="Por favor seleccione un administrador">
                  <Option value="hernandez">Hernández</Option>
                  <Option value="lopez">López</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.approver2}
                name="approver2"
                rules={[{ required: true, message: 'Por favor seleccione un aprobador' }]}
              >
                <Select placeholder="Por favor seleccione un aprobador">
                  <Option value="hernandez">Hernández</Option>
                  <Option value="lopez">López</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.dateRange2}
                name="dateRange2"
                rules={[{ required: true, message: 'por favor escribe' }]}
              >
                <TimePicker
                  placeholder="Tiempo recordatorio"
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => {
                    if (trigger && trigger.parentNode) {
                      return trigger.parentNode as HTMLElement;
                    }
                    return trigger;
                  }}
                />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.type2}
                name="type2"
                rules={[{ required: true, message: 'Por favor seleccione el tipo de almacén' }]}
              >
                <Select placeholder="Por favor seleccione el tipo de almacén">
                  <Option value="private">privado</Option>
                  <Option value="public">público</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Gestión de miembros" bordered={false}>
          <Form.Item name="members">
            <TableForm />
          </Form.Item>
        </Card>
      </PageHeaderWrapper>
      <FooterToolbar>
        {getErrorInfo(error)}
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
         enviar
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['BLOCK_NAME_CAMEL_CASE/submitAdvancedForm'],
}))(PAGE_NAME_UPPER_CAMEL_CASE);
