import { AppLayout } from '../components/AppLayout';
import { withRouter } from 'react-router-dom';
import useDiscordData from '../hooks/useDiscordData';

export function Home(): JSX.Element {
    const discordData = useDiscordData();
    return <AppLayout data={discordData}>Welcome {discordData.username} !</AppLayout>;
}

export default withRouter(Home);
