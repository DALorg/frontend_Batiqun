export function requireAuthentication(gssp) {
    return async (context) => {
        const { req, res } = context;
        const token = req.cookies.ethAddress;

        if (!token) {
            // Redirect to login page
            return {
                redirect: {
                    destination: '/Login',
                    statusCode: 302
                }
            };
        }

        return await gssp(context); // Continue on to call `getServerSideProps` logic
    }
}