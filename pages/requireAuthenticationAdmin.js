export function requireAuthenticationAdmin(gssp) {
    return async (context) => {
        const { req, res } = context;
        const token = req.cookies.UserRole;

        if (!token) {
            // Redirect to login page
            return {
                redirect: {
                    destination: '/Login',
                    statusCode: 302
                }
            };
        }else if (token !== "Admin"){
            // Redirect to login page
            return {
                redirect: {
                    destination: '/404',
                    statusCode: 302
                }
            };
        }

        return await gssp(context); // Continue on to call `getServerSideProps` logic
    }
}