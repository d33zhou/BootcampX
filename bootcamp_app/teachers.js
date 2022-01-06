const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM assistance_requests
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
JOIN teachers ON teacher_id = teachers.id
WHERE cohorts.name = $1
ORDER BY teacher;
`;
const cohortName = process.argv[2] || 'JUL02';
const values = [cohortName];

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  });
});