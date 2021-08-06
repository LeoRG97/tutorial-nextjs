import { useFormik } from 'formik';
import { useState } from 'react';

export default function Signup() {
  const [message, setMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      passwd: '',
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = async (values: any) => {
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.passwd,
      }),
    };

    const res = await fetch('http://localhost:3000/api/signup', requestOptions);
    const json = await res.json();

    setMessage(json);
  };

  return (
    <div>
      <h1>Create a new user</h1>
      <div>{JSON.stringify(message)}</div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="passwd">Password</label>
        <input
          id="passwd"
          name="passwd"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.passwd}
        />
        <button type="submit"> Login</button>
      </form>
    </div>
  );
}
