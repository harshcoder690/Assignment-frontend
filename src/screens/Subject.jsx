/* eslint-disable no-shadow */
import {
  Button, Col, Divider, Row, Spin, Typography,
} from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SubjectList from '../components/SubjectList';
import TableData from '../components/TableData';

function Subject() {
  const [loading, setLoading] = useState(false);
  const [limit] = useState(10);
  const [data, setData] = useState([]);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [page, setPage] = useState(1);
  const { subject } = useParams();
  const navigate = useNavigate();

  const fetchBookData = async (page) => {
    setLoading(true);
    const { data } = await axios.get(`https://openlibrary.org/subjects/${subject}.json?page=${page}&limit=${limit}`);
    if (data.works.length < 10) setNext(false);
    else setNext(true);

    if (page === 1) setPrev(false);
    else setPrev(true);

    setData(data.works.map((book) => ({
      title: book.title,
      author: book.authors === undefined ? undefined : book.authors[0].name,
      latestPublishYear: book.first_publish_year,
      firstPublishYear: book.first_publish_year,
      key: book.key,
    })));
    setLoading(false);
  };

  useEffect(() => {
    fetchBookData(page);
  }, []);

  const handleNext = () => {
    setPage(page + 1);
    fetchBookData(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
    fetchBookData(page - 1);
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
          <Typography style={{ textAlign: 'left', marginLeft: '20px', fontWeight: 'bolder' }}>
            {subject.toUpperCase()}
            <Button onClick={() => navigate('/')} style={{ float: 'right', marginRight: '20px' }}>HOME</Button>
          </Typography>
          <Divider />
        </div>
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

export default Subject;
