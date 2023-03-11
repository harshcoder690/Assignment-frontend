import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Latest Publish Year',
    dataIndex: 'latestPublishYear',
    key: 'latestPublishYear',
  },
  {
    title: 'First Publish Year',
    dataIndex: 'firstPublishYear',
    key: 'firstPublishYear',
  },
];

// eslint-disable-next-line react/prop-types
function TableData({ data }) {
  return (
    <div>
      {data && <Table columns={columns} dataSource={data} pagination={false} style={{ margin: '10px' }} />}
    </div>
  );
}

export default TableData;
