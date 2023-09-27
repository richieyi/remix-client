import { json } from '@remix-run/node'; // or cloudflare/deno
import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Registration page' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Register() {
  const data = useActionData<any>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Registration page</h1>
      <Form method="post">
        <p>
          <input
            name="email"
            type="text"
            placeholder="Email"
          />
          {data?.errors?.email && <span>{data.errors.email}</span>}
        </p>
        <p>
          <input
            name="password"
            type="password"
            placeholder="Password"
          />
          {data?.errors?.password && <span>{data.errors.password}</span>}
        </p>
        <p>
          <input
            name="passwordConfirmation"
            type="password"
            placeholder="Password"
          />
        </p>
        <button type="submit">Register</button>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const passwordConfirmation = String(formData.get('passwordConfirmation'));

  const errors: {
    email?: string;
    password?: string;
  } = {};

  if (!email.includes('@')) {
    errors.email = 'Invalid email address';
  }

  if (password.length < 4) {
    errors.password = 'Password should be at least 4 characters';
  }

  if (password !== passwordConfirmation) {
    errors.password = 'Passwords do not match';
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  // Redirect to dashboard if validation is successful
  // return redirect("/courses");
  // redirect doesnt exist
  console.log(request);
  return null;
}
