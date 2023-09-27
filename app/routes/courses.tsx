import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Registration page' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader() {
  const res = await fetch('http://localhost:3002/courses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const courses = await res.json();
  return courses;
}

export default function Courses() {
  const data = useLoaderData<any>();

  const renderAllCourses = () => {
    return data.map((course: any) => {
      return (
        <tr key={course.id}>
          <td>{course.title}</td>
          <td>{course.professor_name}</td>
          <td>{course.current_capacity}</td>
          <td>{course.max_capacity}</td>
          <td>{course.current_capacity < course.max_capacity && <button>Enroll</button>}</td>
        </tr>
      );
    });
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Courses page</h1>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Professor</th>
            <th>Enrolled</th>
            <th>Max</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>{renderAllCourses()}</tbody>
      </table>
    </div>
  );
}
