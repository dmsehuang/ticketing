import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    // this only exists on the browser
    // request should be made to nginx
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    // we are on the browser
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};

export default LandingPage;
