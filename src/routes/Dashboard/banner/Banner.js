import React,{Component} from  'react';
import { List, Button, Spin ,Card} from 'antd';
import reqwest from 'reqwest';
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

export default class Banner extends Component{
  constructor(props){
    super(props);
  }

  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
  }
  componentDidMount() {
    this.getData((res) => {
      this.setState({
        loading: false,
        data: res.results,
      });
    });
  }
  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }
  onLoadMore = () => {
    this.setState({
      loadingMore: true,
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.results);
      this.setState({
        data,
        loadingMore: false,
      }, () => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
    });
  }

  render(){
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;

    const ButtonOption = (
      <div>
        <Button size='small' type='primary' icon="plus" onClick={this.showModal}>添加</Button>
        <Button size='small' type='primary' icon="reload" onClick={() => {
          window.location.reload()
        }} style={{marginLeft: 12}}>刷新</Button>
      </div>
    );

    return (
      <div>

        <Card title="Banner 列表" extra={ButtonOption}>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={data}
        renderItem={item => (
          <List.Item  actions={[<a>编辑</a>, <a>删除</a>]} >
            <List.Item.Meta
              avatar={<img alt='' width="300px" height='160px' src="http://img3.imgtn.bdimg.com/it/u=3944049325,1226566536&fm=27&gp=0.jpg"/>}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description="Ant Design, a design language for background applications,
              is refined by Ant UED TeamAnt Design, a design language for background applications,
              is refined by Ant UED TeamAnt Design, a design language for background applications,
               is refined by Ant UED TeamAnt Design, a design language for background applications,
               is refined by Ant UED TeamAnt Design, a design language for background applications,
               is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
        </Card>
      </div>
    );
    }
}
