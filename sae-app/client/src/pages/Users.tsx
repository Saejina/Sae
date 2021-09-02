import AppLayout from '../components/AppLayout';
import { withRouter } from 'react-router-dom';
import useDiscordData from '../hooks/useDiscordData';

export function Users(): JSX.Element {
    const data = useDiscordData();
    return <AppLayout data={data}>Users</AppLayout>;
}

export default withRouter(Users);
