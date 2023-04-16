import PropTypes from 'prop-types';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import { Box, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';
import { TenantPopover } from './tenant-popover';

const tenants = ['Devias', 'Acme Corp'];

export const TenantSwitch = (props) => {
  const popover = usePopover();

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="inherit"
            variant="h6"
          >
                            <Box
                  sx={{
                    color: 'text.primary',
                    fontFamily: '\'Noto Serif\', \'Plus Jakarta Sans\', sans-serif',
                    fontSize: 16,
                    fontWeight: 800,
                    letterSpacing: '0.3px',
                    lineHeight: 2.5,
                    '& span': {
                      color: 'primary.main'
                    }
                  }}
                >
                  OneSpace
                </Box>
          </Typography>

        </Box>

      </Stack>
      <TenantPopover
        anchorEl={popover.anchorRef.current}
        onChange={popover.handleClose}
        onClose={popover.handleClose}
        open={popover.open}
        tenants={tenants}
      />
    </>
  );
};

TenantSwitch.propTypes = {
  sx: PropTypes.object
};
