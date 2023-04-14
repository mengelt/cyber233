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
import { Seo } from 'src/components/seo';
import { useSettings } from 'src/hooks/use-settings';
import { paths } from 'src/paths';
import { useRouter } from 'src/hooks/use-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SocialPostCard } from 'src/sections/dashboard/social/social-post-card';


const Page = () => {
  
  const settings = useSettings();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [fetchType, setFetchType] = useState("T");

  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = () => {

    if ( fetchType === "T" ) {

      const accessToken = window.sessionStorage.getItem('accessToken');
    
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
      };
      
      axios.get('http://localhost:5000/feed', config)
        .then(feedResponse => {

          console.info(feedResponse.data)
          
          setPosts(feedResponse.data)
        })

    }

  }

  const handleNewPost = () => {
    router.push(paths.dashboard.post);
  }

  return (
    <>
      <Seo title="Dashboard: Overview" />
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
                    My Feed
                  </Typography>
                </div>
                <div>
                  <Stack
                    direction="row"
                    spacing={4}
                  >
                    <Button
                      startIcon={(
                        <SvgIcon>
                          <PlusIcon />
                        </SvgIcon>
                      )}
                      onClick={handleNewPost}
                      variant="contained"
                    >
                      New Post
                    </Button>
                  </Stack>
                </div>
              </Stack>
            </Grid>
          </Grid>

          <Stack
            spacing={3}
            sx={{ mt: 3 }}
          >
            
            {posts.map(( (post, idx) => {
              let postDate = new Date(post.dateAdded);
              let avatar = '/assets/avatars/user.png';
              return (
                <SocialPostCard
                  key={idx}
                  authorAvatar={avatar}
                  authorName={post.token}
                  comments={[]}
                  createdAt={postDate}
                  isLiked={false}
                  likes={parseInt(Math.random(0)*2)}
                  media={null}
                  message={post.post}
                />
              )
              }))}
          </Stack>
        </Container>
      </Box>


    </>
  );
};

export default Page;
