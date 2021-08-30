import AppLayout from '../components/AppLayout';
import {withRouter} from 'react-router-dom';

export function Commands(): JSX.Element {
    return <AppLayout>Commands</AppLayout>;
}

export default withRouter(Commands);
