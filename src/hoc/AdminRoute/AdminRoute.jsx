import { useContext,  } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../../store/app.context";
import PropTypes from 'prop-types';

/**
 * AdminRoute is a higher-order component that restricts access to its children
 * to only users with admin privileges. If the user is not logged in or does not
 * have admin rights, they are redirected to the login page.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render if the user is an admin.
 * @returns {React.ReactNode} The children components if the user is an admin, otherwise a redirect to the login page.
 */
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