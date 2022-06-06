import Swal from "sweetalert2";
import "./components/GlobalVariable"

export function requireAuthenticationAdmin(gssp) {



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
        }else if (token === global.admin || token === global.superadmin || token === global.seller){
            if(KTPstatus == "true"){
                return await gssp(context); // Continue on to call `getServerSideProps` logic
            }else{
                Swal.fire(
                    "Silahkan lengkapi profile",
                    "Isi NIK sesuai dengan KTP anda",
                    "warning"
                );
                return {
                    redirect: {
                        destination: '/Profile/EditProfile',
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