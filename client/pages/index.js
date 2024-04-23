const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>Hello {currentUser.email}</h1>
  ) : (
    <h1>Welcome to Ticketing!</h1>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
