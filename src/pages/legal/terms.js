import { useCallback, useState } from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Lock01Icon from '@untitled-ui/icons-react/build/esm/Lock01';
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { paths } from 'src/paths';
import { CheckoutBilling } from 'src/sections/checkout/checkout-billing';


const initialBilling = {
  address: '',
  cardExpirationDate: '',
  cardNumber: '',
  cardOwner: '',
  cardSecurityCode: '',
  firstName: '',
  lastName: '',
  optionalAddress: '',
  paymentMethod: 'visa',
  state: '',
  zip: ''
};

const initialProducts = [
  {
    id: '97375399bf10f57d0f0f7fd9',
    image: '/assets/products/product-1.png',
    name: 'Healthcare Erbology',
    price: 23.99,
    quantity: 1
  },
  {
    id: 'ece4069546ff025047b97735',
    image: '/assets/products/product-2.png',
    name: 'Makeup Lancome Rouge',
    price: 95.00,
    quantity: 1
  }
];

const Page = () => {
  const [billing, setBilling] = useState(initialBilling);
  const [products, setProducts] = useState(initialProducts);

  const handleBillingChange = useCallback((event) => {
    setBilling((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }, []);

  const handleQuantityChange = useCallback((event, productId) => {
    setProducts((prevState) => {
      return prevState.map((product) => {
        if (product.id !== productId) {
          return product;
        }

        return {
          ...product,
          quantity: event.target.value
        };
      });
    });
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <>
      <Seo title="Privacy Features " />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex'
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    Home
                  </Typography>
                </Link>
              </div>
              <Typography variant="h3">
                Terms &amp; Conditions
              </Typography>
            </Stack>

          </form>
        </Container>
      </Box>
    </>
  );
};

export default Page;
