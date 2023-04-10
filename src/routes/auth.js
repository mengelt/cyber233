import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { IssuerGuard } from 'src/guards/issuer-guard';
import { GuestGuard } from 'src/guards/guest-guard';
import { Layout as AuthLayout } from 'src/layouts/auth/classic-layout';
import { Issuer } from 'src/utils/auth';

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));

export const authRoutes = [
  {
    path: 'auth',
    children: [
      {
        path: 'jwt',
        element: (
          <IssuerGuard issuer={Issuer.JWT}>
            <GuestGuard>
              <AuthLayout>
                <Outlet />
              </AuthLayout>
            </GuestGuard>
          </IssuerGuard>
        ),
        children: [
          {
            path: 'login',
            element: <JwtLoginPage />
          },
          {
            path: 'register',
            element: <JwtRegisterPage />
          }
        ]
      }
    ]
  }
];
