// import AutoStoriesIcon from '@mui/icons-material/AutoStories';
// import LayersIcon from '@mui/icons-material/Layers';
import LayersIcon from '@material-ui/icons/Layers';
// import PagesIcon from '@mui/icons-material/Pages';
import PagesIcon from '@material-ui/icons/Pages';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ReportIcon from '@material-ui/icons/Report';

const SpecialNavbar = () => {
    return (
        <nav>
            <a href='/mysubgreddiit'><LayersIcon>MySubGreddiit  </LayersIcon></a>
            <a href='/subgreddiit'><PagesIcon>SubGreddiit  </PagesIcon></a>
            <a href='/home'><HomeIcon>Home  </HomeIcon></a>
            <a href='/subgreddiit_users'><AccountCircleIcon>Users  </AccountCircleIcon></a>
            <a href='/joiningreqpage'><AddIcon>JoiningReqPage  </AddIcon></a>
            <a href='/stats'><EqualizerIcon>Stats  </EqualizerIcon></a>
            <a href='/reportedpage'><ReportIcon>ReportedPage  </ReportIcon></a>
        </nav>
    )
}

export default SpecialNavbar