import { createResourceId } from 'src/utils/create-resource-id';
import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from 'src/utils/jwt';
import { wait } from 'src/utils/wait';
import { users } from './data';
import axios from 'axios';

const STORAGE_KEY = 'users';

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = () => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user) => {
  try {
    const users = getPersistedUsers();
    const data = JSON.stringify([...users, user]);
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

class AuthApi {
  async signIn(request) {
    const { email, password } = request;

    await wait(500);

    return new Promise((resolve, reject) => {
      try {

        let existingUser = {email, password};

        try {
          axios.post('http://localhost:5000/login', existingUser)
            .then(userResponse => {
  
              console.info({userResponse})
  
              if ( userResponse.status === 200 ) {
                resolve({accessToken: userResponse.data.token})
              } else if ( userResponse.status === 401 ) {
                reject(`Invalid email or password`)
              } else {
                reject(`Error ${userResponse.status} Unexpected error occurred during log in.`)
              }
  
            })
        } catch (e) {
          reject('Unexpected error occurred during login.')
        }
        
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async signUp(request) {
    const { email, name, password } = request;

    return new Promise((resolve, reject) => {

      let newUser = {email, name, password};

      try {
        axios.post('http://localhost:5000/register', newUser)
          .then(newUserResponse => {

            console.info({newUserResponse})

            if ( newUserResponse.status === 200 ) {
              resolve({accessToken: newUserResponse.data.token})
            } else {
              reject(`Error ${newUserResponse.status} Unexpected error occurred during registration.`)
            }

          })
      } catch (e) {
        reject('Unexpected error occurred during registration.')
      }

    });

    /*
    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Merge static users (data file) with persisted users (browser storage)
        const mergedUsers = [
          ...users,
          ...getPersistedUsers()
        ];

        // Check if a user already exists
        let user = mergedUsers.find((user) => user.email === email);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: undefined,
          email,
          name,
          password,
          plan: 'Standard'
        };

        persistUser(user);

        const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
    */
  }

  me(request) {
    const { accessToken } = request;

    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const user = decode(accessToken);

        resolve({
          id: user.id,
          email: user.email,
          name: user.name
        });
        
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
