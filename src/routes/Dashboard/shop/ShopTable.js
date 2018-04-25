import React, {Component} from 'react';
import {Table, Card, Button, Breadcrumb, Popconfirm,Modal,Form} from 'antd';
import ShopNew from "./ShopNew";

const data=[];
for (let i=1;i<10;i++){
    data.push({
      key:i,
      name:`新奥餐厅${i}`,
      address:`莲花路${i}`,
      state:'a'?"营业":'休息'
    })
}

@Form.create()
export default class ShopTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
     dataSource:data,
      visible:false,
      shopInformation:{
        key:'',
        name:'',
        address:'',
        state:'',
      }
    };
    this.columns = [
      {
        title: '店铺名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '店铺地址',
        dataIndex: 'address',
        key: 'address'
      }, {
        title: '营业状态',
        dataIndex: 'state',
        key: 'state'
      }, {
        title: '操作',
        dataIndex: 'option',
        key: 'option',
        fixed: 'right',
        width: 150,
        render: (text, record) => (
          <div>
            <a href="">编辑</a>
            <span> | </span>
            <span>
              <Popconfirm title="确认删除吗?" onConfirm={() => this.onDelete(record.key)}>
                <a href="#">删除</a>
              </Popconfirm>
            </span>
          </div>
        )
      }
    ];
  }

  //表单删除按钮
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
  //添加弹出modal框
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    console.log(e);
    const _this = this;
    this.setState({
      visible: false,
    });
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('接收到更新门店信息: ', values);
      _this.setState({
        shopInformation: values
      });
      console.log()
      this.state.shopInformation=values;
      this.state.shopInformation.key=data.length+1;
      data.push(this.state.shopInformation);
      console.log(data);
      form.resetFields();
    });
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render() {

    const ButtonOption = (
      <div>
        <Button size='small' type='primary' icon="plus" onClick={this.showModal}>添加</Button>

        <Button size='small' type='primary' icon="reload" onClick={() => {
          window.location.reload()
        }} style={{marginLeft: 12}}>刷新</Button>
      </div>
    );
    const pagination = {
      pageSize: 9,
      total: this.state.dataSource.length
    }


    return (
      <div>
        {/*面包屑导航*/}
        <Breadcrumb>
          <Breadcrumb.Item>dashboard</Breadcrumb.Item>
          <Breadcrumb.Item><a href="">门店管理</a></Breadcrumb.Item>
        </Breadcrumb>

        <Card title="所有门店" extra={ButtonOption}>
          <Table dataSource={this.state.dataSource}
                 columns={this.columns}
                 pagination={pagination}
          />
          <Modal title="新建门店"
                 visible={this.state.visible}
                 onOk={this.handleOk.bind(this,'visible')}
                 onCancel={this.handleCancel.bind(this,'visible')}
          >
         <ShopNew wrappedComponentRef={this.saveFormRef} />
          </Modal>
        </Card>
      </div>
    );
  }
}
