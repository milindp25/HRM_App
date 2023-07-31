import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import emailjs from 'emailjs-com';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './recruitment.css';
import { publicRequest } from '../../Helper/ApiRequest'; // Import the API request instance

const RecruitmentPage = () => {
  const [data, setData] = useState([]);
  const [referralEmail, setReferralEmail] = useState('');
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const userId = process.env.REACT_APP_EMAILJS_USER_ID;

  // Make the API call only once when the component mounts
  useEffect(() => {
    const getRecruitments = async () => {
      try {
        const resp = await publicRequest.get(`/employee/jobsavailable`); // Adjust the API endpoint accordingly
        console.log(resp);

        const processedData = resp.data.map((item) => ({
          recruitment_id: item.recruitment_id,
          job_name: item.job_title,
          department_id: item.department_name,
          start_date: new Date(item.Start_date).toLocaleDateString(),
          end_date: new Date(item.end_date).toLocaleDateString(),
        }));

        setData(processedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
      }
    };

    getRecruitments();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render.

  const columns = useMemo(
    () => [
      {
        Header: 'Recruitment ID',
        accessor: 'recruitment_id',
      },
      {
        Header: 'Job Name',
        accessor: 'job_name',
      },
      {
        Header: 'Department ID',
        accessor: 'department_id',
      },
      {
        Header: 'Start Date',
        accessor: 'start_date',
      },
      {
        Header: 'End Date',
        accessor: 'end_date',
      },
    ],
    []
  );

  const handleRefer = () => {
    if (referralEmail) {
      const templateParams = {
        to_email: referralEmail,
        job_name: selectedJob.job_name,
      };

      emailjs.send(serviceId, templateId, templateParams, userId)
        .then((response) => {
          alert('Referral email sent successfully!');
          setShowReferralModal(false);
        })
        .catch((error) => {
          console.error('Error sending referral email:', error);
          alert('An error occurred while sending the referral email.');
        });
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="page-wrapper">
        <div className="content">
          <h2 className="page-title" style={{ marginBottom: '50px' }}>
            Recruitment Details
          </h2>

          <table {...getTableProps()} style={{ margin: 'auto' }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                    <td>
                      <button
                        onClick={() => {
                          setSelectedJob(row.original);
                          setShowReferralModal(true);
                        }}
                      >
                        Refer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showReferralModal && (
        <div className="page-wrapper">
          <div className="content">
            <div className="referral-modal" style={{ width: '50%', alignContent: 'center', position: 'absolute' }}>
              <div className="modal-content">
                <span className="close" onClick={() => setShowReferralModal(false)}>
                  &times;
                </span>
                <h2>Refer to Apply</h2>
                <p>Enter the email address to send the referral:</p>
                <input
                  type="email"
                  value={referralEmail}
                  style={{ width: '90%', marginLeft: '10px' }}
                  onChange={(e) => setReferralEmail(e.target.value)}
                />
                <button onClick={handleRefer}>Send Referral</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecruitmentPage;
