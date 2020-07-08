import React from 'react';
import { Card, Input, Select, Form } from 'antd';
import { withPropsAPI } from 'gg-editor';
import { formatMessage } from 'umi';

const upperFirst = (str: string) =>
  str.toLowerCase().replace(/( |^)[a-z]/g, (l: string) => l.toUpperCase());

const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

interface DetailFormProps {
  type: string;
  propsAPI?: any;
}

class DetailForm extends React.Component<DetailFormProps> {
  get item() {
    const { propsAPI } = this.props;
    return propsAPI.getSelected()[0];
  }

  handleFieldChange = (values: any) => {
    const { propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    setTimeout(() => {
      const item = getSelected()[0];
      if (!item) {
        return;
      }
      executeCommand(() => {
        update(item, {
          ...values,
        });
      });
    }, 0);
  };

  handleInputBlur = (type: string) => (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.handleFieldChange({
      [type]: e.currentTarget.value,
    });
  };

  renderNodeDetail = () => {
    const { label } = this.item.getModel();

    return (
      <Form initialValues={{ label }}>
        <Item
          label={formatMessage({ id: 'BLOCK_NAME.label' })}
          name="label"
          {...inlineFormItemLayout}
        >
          <Input onBlur={this.handleInputBlur('label')} />
        </Item>
      </Form>
    );
  };

  renderEdgeDetail = () => {
    const { label = '', shape = 'flow-smooth' } = this.item.getModel();

    return (
      <Form initialValues={{ label, shape }}>
        <Item
          label={formatMessage({ id: 'BLOCK_NAME.label' })}
          name="label"
          {...inlineFormItemLayout}
        >
          <Input onBlur={this.handleInputBlur('label')} />
        </Item>
        <Item
          label={formatMessage({ id: 'BLOCK_NAME.shape' })}
          name="shape"
          {...inlineFormItemLayout}
        >
          <Select onChange={(value) => this.handleFieldChange({ shape: value })}>
            <Option value="flow-smooth">{formatMessage({ id: 'BLOCK_NAME.smooth' })}</Option>
            <Option value="flow-polyline">{formatMessage({ id: 'BLOCK_NAME.polyline' })}</Option>
            <Option value="flow-polyline-round">
              {formatMessage({ id: 'BLOCK_NAME.polyline-round' })}
            </Option>
          </Select>
        </Item>
      </Form>
    );
  };

  renderGroupDetail = () => {
    const { label = 'Nuevo grupo' } = this.item.getModel();

    return (
      <Form initialValues={{ label }}>
        <Item
          label={formatMessage({ id: 'BLOCK_NAME.label' })}
          name="label"
          {...inlineFormItemLayout}
        >
          <Input onBlur={this.handleInputBlur('label')} />
        </Item>
      </Form>
    );
  };

  render() {
    const { type } = this.props;
    if (!this.item) {
      return null;
    }

    return (
      <Card type="inner" size="small" title={upperFirst(type)} bordered={false}>
        {type === 'node' && this.renderNodeDetail()}
        {type === 'edge' && this.renderEdgeDetail()}
        {type === 'group' && this.renderGroupDetail()}
      </Card>
    );
  }
}

export default withPropsAPI(DetailForm as any);
