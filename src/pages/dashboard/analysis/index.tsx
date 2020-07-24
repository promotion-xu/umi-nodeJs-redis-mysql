import React, { useState } from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

let data: any[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

function Analysis() {
  return (
    <div>
      <div>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 500 }} />
      </div>
    </div>
  )
}

Analysis.title = 'ANALYSIS_TITLE'
Analysis.layout = 'PRO_LAYOUT'
Analysis.requireSignin = true
// Analysis.access = 'canReadDashboardAnalysis'

export default Analysis
