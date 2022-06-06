import "./components/GlobalVariable"

export function requireAuthenticationSA(gssp) {



    return async (context) => {
        const { req, res } = context;
        const token = req.cookies.UserRole;
        const KTPstatus = req.cookies.UsrKTPstatus;

        if (!token) {
            // Redirect to login page
            return {
                redirect: {
                    destination: '/Login',
                    statusCode: 302
                }
            };
        }else if (token === global.superadmin){
            if(KTPstatus == "true"){
                return await gssp(context); // Continue on to call `getServerSideProps` logic
            }else{
                return {
                    redirect: {
                        destination: '/404',
                        statusCode: 302
                    }
                };
            }
        }else{
            return {
                redirect: {
                    destination: '/404',
                    statusCode: 302
                }
            };
        }

       
    }
}