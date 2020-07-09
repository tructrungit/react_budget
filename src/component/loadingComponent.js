import React, { Component } from 'react'
import { Spin, Alert } from 'antd';

export default class LoadingComponent extends Component {
    render() {
        return (
            <div>
                <Spin tip="Loading...">
                    <Alert
                    message="Loading..."
                    description="Please wait..."
                    type="info"
                    />
                </Spin>
            </div>
        )
    }
}
