/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Button, Divider, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SubjectList() {
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();

  const popularSubjects = ['history', 'science', 'fiction', 'mystery', 'javascript'];

  const handleSubmit = async (currentSubject = subject) => {
    navigate(`/${currentSubject}`);
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '5px', paddingTop: '20px' }}>
      <h3>Trending Subjects</h3>
      <div>
        <Input.Search
          style={{
            width: '60%',
          }}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          onSearch={handleSubmit}
        />
        <Button onClick={() => setSubject('')}>Clear</Button>
      </div>
      <Divider />
      <ul style={{ listStyle: 'none', paddingLeft: '0px' }}>
        {popularSubjects.map((sub, idx) => (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            onClick={() => handleSubmit(sub)}
            style={{ cursor: 'pointer' }}
          >
            {sub.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectList;
