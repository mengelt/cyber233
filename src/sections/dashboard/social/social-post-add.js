
import { useState } from 'react';

import Attachment01Icon from '@untitled-ui/icons-react/build/esm/Attachment01';
import FaceSmileIcon from '@untitled-ui/icons-react/build/esm/FaceSmile';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import Link01Icon from '@untitled-ui/icons-react/build/esm/Link01';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  IconButton,
  OutlinedInput,
  Stack,
  SvgIcon,
  useMediaQuery
} from '@mui/material';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { getInitials } from 'src/utils/get-initials';
import { useRouter } from 'src/hooks/use-router';
import axios from 'axios';
import { paths } from 'src/paths';

export const SocialPostAdd = (props) => {
  const user = useMockedUser();
  const router = useRouter();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [newText, setNewText] = useState("");
  const [posting, setPosting] = useState(false);

  const handleCreatePost = (e) => {
    setPosting(true);

    const newPost = {
      post : newText
    }
        
    const accessToken = window.sessionStorage.getItem('accessToken');
    
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
    };
  
    console.info('sending to api')
    axios.post('http://localhost:5000/post', newPost, config)
      .then(postResponse => {
        console.info('postResponse', postResponse)

        if ( postResponse.status === 200 ) {
          router.push(paths.dashboard)
        }

      })
      .catch(e => {
        setPosting(false);
        console.info(e, 'error on post')
      })
      
  }

  const handleTextChange = (e) => {
    setNewText(e.target.value)
  }

  return (
    <Card {...props}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          spacing={2}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 40,
              width: 40
            }}
          >
            {getInitials(user.name)}
          </Avatar>
          <Stack
            spacing={3}
            sx={{ flexGrow: 1 }}
          >
            <OutlinedInput
              fullWidth
              multiline
              onChange={handleTextChange}
              value={newText}
              rows={4}
            />
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              {smUp && (
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <IconButton>
                    <SvgIcon>
                      <Image01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <Attachment01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <Link01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <FaceSmileIcon />
                    </SvgIcon>
                  </IconButton>
                </Stack>
              )}
              <div>
                <Button disabled={newText.length === 0 || posting} variant="contained" onClick={handleCreatePost}>
                  Post
                </Button>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
