import AppLayout from '../components/AppLayout';
import { withRouter } from 'react-router-dom';

export function Users(): JSX.Element {
    return <AppLayout>Users</AppLayout>;
}

export default withRouter(Users);
