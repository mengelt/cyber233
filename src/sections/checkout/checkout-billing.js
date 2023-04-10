import {
  Box,
  Stack,
  Typography
} from '@mui/material';


export const CheckoutBilling = (props) => {
  

  return (
    <Stack 
           spacing={6}
    >
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Box
            sx={{
              alignItems: 'center',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              display: 'flex',
              height: 40,
              justifyContent: 'center',
              width: 40
            }}
          >
            <Typography
              sx={{ fontWeight: 'fontWeightBold' }}
              variant="h6"
            >
              1
            </Typography>
          </Box>
          <Typography variant="h6">
            Identity Tokenization
            <br />
            (todo: explain it)
          </Typography>


        </Stack>

      </Stack>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Box
            sx={{
              alignItems: 'center',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              display: 'flex',
              height: 40,
              justifyContent: 'center',
              width: 40
            }}
          >
            <Typography
              sx={{ fontWeight: 'fontWeightBold' }}
              variant="h6"
            >
              2
            </Typography>
          </Box>
          <Typography variant="h6">
            Some Other Cool Thing
          </Typography>
        </Stack>

      </Stack>

      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Box
            sx={{
              alignItems: 'center',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              display: 'flex',
              height: 40,
              justifyContent: 'center',
              width: 40
            }}
          >
            <Typography
              sx={{ fontWeight: 'fontWeightBold' }}
              variant="h6"
            >
              3
            </Typography>
          </Box>
          <Typography variant="h6">
            Do We Have Anything Else?
          </Typography>
        </Stack>

      </Stack>

    </Stack>
  );
};
