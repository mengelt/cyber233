import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Settings03Icon from '@untitled-ui/icons-react/build/esm/Settings03';
import Backdrop from '@mui/material/Backdrop';
import {
  Box,
  Button,
  Modal,
  Container,
  Stack,
  Fade,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  
} from '@mui/material';
import { Seo } from 'src/components/seo';
import { useSettings } from 'src/hooks/use-settings';
import { paths } from 'src/paths';
import { useRouter } from 'src/hooks/use-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SocialPostCard } from 'src/sections/dashboard/social/social-post-card';


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Page = () => {
  
  const settings = useSettings();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [fetchType, setFetchType] = useState("T");
  const [diagramOpen, setDiagramOpen] = useState(false);

  const handleToggleDiagram = () => {
    setDiagramOpen(!diagramOpen)
  }

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

  const handleToggleToken = () => {
    if ( fetchType === "T" ) {
      setFetchType("P")
    } else {
      setFetchType("T")
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
                          
                        </SvgIcon>
                      )}   
                      onClick={handleToggleDiagram}                   
                      ></Button>

                      <Button
                      startIcon={(
                        <SvgIcon>
                          
                        </SvgIcon>
                      )}   
                      onClick={handleToggleToken}                   
                      >
                      
                    </Button>                    
                    <Button
                      startIcon={(
                        <SvgIcon>
                          <Settings03Icon />
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
              if ( fetchType === "T" ) {
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
              } else {
                return (
                  <SocialPostCard
                    key={idx}
                    authorAvatar={post.identity.avatar}
                    authorName={post.identity.name}
                    comments={[]}
                    createdAt={postDate}
                    isLiked={false}
                    likes={parseInt(Math.random(0)*2)}
                    media={null}
                    message={post.post}
                  />
                )                
              }
              }))}
          </Stack>
        </Container>
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={diagramOpen}
        onClose={handleToggleDiagram}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={diagramOpen}>
          <Box sx={modalStyle}>
            <img src="/assets/flow/flow.png" />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Page;
