import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';

import HomeNavBar from './HomeNavBar';

function Home() {
    const {email, token} = useContext(AuthContext);

    return (
        <div>
            <HomeNavBar></HomeNavBar>
            <div>S2A Home</div>
        </div>
    );
}

export default Home;