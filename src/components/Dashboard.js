import React from "react";
import AuthContext from '../control/auth-context';
import {Redirect} from 'react-router-dom';
import DashboardContent from "./DashboardContent";

export default function Dashboard() {
    return (
        <AuthContext.Consumer>
            {({isAuthenticated, logout}) => (
                <>
                    {
                        isAuthenticated ?
                            <DashboardContent logout={logout}/> :
                            <Redirect to={'/admin/login'}/>
                    }
                </>
            )}
        </AuthContext.Consumer>
    );
}
