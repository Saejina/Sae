import { AppLayout } from '../components/AppLayout';
import {withRouter} from 'react-router-dom';

export function Home(): JSX.Element {
    return (
    <AppLayout>
        Home
    </AppLayout>);
}

export default withRouter(Home);
