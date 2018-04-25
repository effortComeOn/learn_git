import React from 'react';
import {connect} from 'dva';
import ShopTable from "./ShopTable";


@connect()
export default class Shop extends React.Component {

  render() {
    return(
      <div>
        <ShopTable />
      </div>
    )
  }
}
