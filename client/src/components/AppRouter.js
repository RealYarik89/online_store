import { Routes, Route, Navigate } from "react-router-dom"
import { authRoutes, publicRoutes } from "../routes"

function AppRouter() {
    const isAuth = true
    return (

        <Routes>
            {isAuth && authRoutes.map(({ path, component }) =>
                <Route key={path} path={path} element={component} exact />
            )}
            {publicRoutes.map(({ path, component }) =>
                <Route key={path} path={path} element={component} exact />
            )}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    )
}

export default AppRouter