import { subDays, subHours, subMinutes } from 'date-fns';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Seo } from 'src/components/seo';
import { useSettings } from 'src/hooks/use-settings';
import { CryptoCards } from 'src/sections/dashboard/crypto/crypto-cards';
import { CryptoOperation } from 'src/sections/dashboard/crypto/crypto-operation';
import { CryptoWallet } from 'src/sections/dashboard/crypto/crypto-wallet';
import { CryptoTransactions } from 'src/sections/dashboard/crypto/crypto-transactions';
import { CryptoUpgrade } from 'src/sections/dashboard/crypto/crypto-upgrade';
import { CryptoCurrentBalance } from 'src/sections/dashboard/crypto/crypto-current-balance';
import axios from 'axios';

const now = new Date();

const Page = () => {
  const settings = useSettings();
  const theme = useTheme();

    const [friends, setFriends] = useState([])

    const fetchData = () => {

        const accessToken = window.sessionStorage.getItem('accessToken');
    
        const config = {
          headers: { Authorization: `Bearer ${accessToken}` }
        };
        
        axios.get('http://localhost:5000/friends', config)
          .then(friendResponse => {
  
            console.info(friendResponse.data)
            
            setFriends(friendResponse.data)
          })

    }

    useEffect(() => {
        fetchData();
    }, [])

  return (
    <>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    Friends ({friends.length})
                  </Typography>
                </div>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Button
                    startIcon={(
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                  >
                    Add Friend
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              md={7}
            >
              <Stack
                direction="row"
                spacing={3}
              >
                {friends.map( (friend, idx) => {
                    return (
                        <CryptoWallet
                        chartColor={theme.palette.primary.main}
                        chartSeries={[
                          {
                            name: 'BTC',
                            data: [
                              56, 61, 64, 60, 63, 61, 60, 68, 66, 64, 77, 60, 65, 51, 72, 80,
                              74, 67, 77, 83, 94, 95, 89, 100, 94, 104, 101, 105, 104, 103, 107, 120
                            ]
                          }
                        ]}
                        coinAmount={friend}
                        currency="BTC"
                        rate={0.56}
                        sx={{ flexBasis: '50%' }}
                        usdValue={16213.20}
                      />                        
                    )
                })}

              </Stack>
            </Grid>


          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
