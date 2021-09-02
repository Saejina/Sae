import AppLayout from '../components/AppLayout';
import { withRouter } from 'react-router-dom';
import useDiscordData from '../hooks/useDiscordData';

export function Commands(): JSX.Element {
    const discordData = useDiscordData();
    return <AppLayout data={discordData}>Commands</AppLayout>;
}

export default withRouter(Commands);
