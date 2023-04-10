import PropTypes from 'prop-types';
import { Box, Link, Stack, Tooltip, Typography } from '@mui/material';
import { paths } from 'src/paths';

const issuers = {
  Amplify: '/assets/logos/logo-amplify.svg',
  Auth0: '/assets/logos/logo-auth0.svg',
  Firebase: '/assets/logos/logo-firebase.svg',
  JWT: '/assets/logos/logo-jwt.svg'
};

export const AuthIssuer = (props) => {
  const { issuer: currentIssuer } = props;

  return (
    <Box
      sx={{
        borderColor: 'divider',
        borderRadius: 2.5,
        borderStyle: 'solid',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3
      }}
    >


    </Box>
  );
};

AuthIssuer.propTypes = {
  issuer: PropTypes.string.isRequired
};
