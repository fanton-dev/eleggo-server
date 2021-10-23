/* eslint-disable */
import LoginForm from './LoginForm';

export default {
  title: "LoginForm",
  component: LoginForm
};

export const Default = () => <LoginForm apiLoginEndpoint=''/>;

Default.story = {
  name: 'default',
};
