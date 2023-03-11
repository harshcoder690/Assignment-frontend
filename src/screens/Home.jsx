/* eslint-disable no-shadow */
import React, { useState } from 'react';
import {
  Row, Col, Input, Spin, Button, Divider,
} from 'antd';
import axios from 'axios';
import SubjectList from '../components/SubjectList';
import './Home.css';
import TableData from '../components/TableData';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [limit] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async (page) => {
    setLoading(true);
    const { data } = await axios.get(`https://openlibrary.org/search.json?q=${searchTerm}&page=${page}&limit=${limit}`);
    if (data.docs.length < 10) setNext(false);
    else setNext(true);

    if (page === 1) setPrev(false);
    else setPrev(true);

    setData(data.docs.map((book) => ({
      title: book.title,
      author: book.author_name === undefined ? undefined : book.author_name[0],
      // eslint-disable-next-line max-len
      latestPublishYear: book.publish_year === undefined ? undefined : Math.max(...book.publish_year),
      firstPublishYear: book.first_publish_year,
      key: book.key,
    })));
    setLoading(false);
  };

  const handleNext = () => {
    setPage(page + 1);
    handleSearch(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
    handleSearch(page - 1);
  };

  return (
    <Row
      justify="center"
      className="home-row"
      gutter={{
        xs: 24, sm: 24, md: 8, lg: 8, xl: 8, xxl: 8,
      }}
    >
      <Col xs={24} sm={24} md={8} lg={6} xl={6} xxl={6} style={{ background: '#dedcdc' }}>
        <SubjectList />
      </Col>
      <Col xs={24} sm={24} md={16} lg={18} xl={18} xxl={18}>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Input.Search
            style={{
              width: '40%',
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={() => handleSearch(page)}
          />
          <Button onClick={() => setSearchTerm('')}>Clear</Button>
        </div>
        <Divider />
        <Spin spinning={loading}>
          <TableData data={data} setData={setData} />
        </Spin>
        <div style={{ textAlign: 'right' }}>
          <Button style={{ margin: '20px' }} disabled={!prev} onClick={handlePrev}>Previous</Button>
          <Button style={{ margin: '20px' }} disabled={!next} onClick={handleNext}>Next</Button>
        </div>
      </Col>
    </Row>

  );
}

export default Home;
