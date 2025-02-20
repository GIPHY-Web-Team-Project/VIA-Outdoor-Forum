import { useContext,  } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../../store/app.context";
import PropTypes from 'prop-types';

export default function AdminRoute( {children} ) {
    const { user, userData } = useContext(AppContext);
    const location = useLocation();

    if (!user || !userData || !userData.isAdmin) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired
}