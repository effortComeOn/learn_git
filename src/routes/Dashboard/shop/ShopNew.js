import React, {Component} from 'react';
import {Form ,Input ,Radio} from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@Form.create()
export default class ShopNew extends Component{
  constructor(props){
    super(props);

     }

  render(){
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 17},
        md: {span: 17},
      },
    };
    const {getFieldDecorator} = this.props.form;

    return (
      <div>
        <Form>
          <FormItem {...formItemLayout} label="门店名称">
            {getFieldDecorator('name',{rules:[{required:true,message:'请输入门店名称'}]})
                              (<Input placeholder="请输入门店名称"/>) }
          </FormItem>
          <FormItem {...formItemLayout} label="门店地址">
            {getFieldDecorator('address',{rules:[{required:true,message:'请输入门店地址'}]})
                              (<Input placeholder="请输入门店地址"/>) }
          </FormItem>
          <FormItem {...formItemLayout} label="门店营业状态">
            {getFieldDecorator('state',{initialValue:'a'})
                              (<RadioGroup>
                                <RadioButton value="a">营业</RadioButton>
                                <RadioButton value="b">休息</RadioButton>
                              </RadioGroup>) }
          </FormItem>
        </Form>
      </div>
    );
  }

}




















