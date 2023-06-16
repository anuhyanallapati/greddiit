// import AutoStoriesIcon from '@mui/icons-material/AutoStories';
// import LayersIcon from '@mui/icons-material/Layers';
import LayersIcon from '@material-ui/icons/Layers';
// import HomeIcon from '@mui/icons-material/Home';
import PagesIcon from '@material-ui/icons/Pages';
import HomeIcon from '@material-ui/icons/Home';

const Navbar = () => {
    return (
        <nav>
            <a href='/mysubgreddiit'><LayersIcon>MySubGreddiit  </LayersIcon></a>
            <a href='/subgreddiit'><PagesIcon>SubGreddiit  </PagesIcon></a>
            <a href='/home'><HomeIcon>Home  </HomeIcon></a>
        </nav>
    )
}

export default Navbar