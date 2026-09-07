import { useNavigate } from "react-router-dom";
import PortalSignIn from "../components/common/PortalSignIn";
function SignIn(){const navigate=useNavigate(); return <PortalSignIn portalName="Municipal Agriculture Office" title="MAO Sign In" description="Sign in to manage and validate agricultural information for your municipality." emailPlaceholder="name@mao-rizal.ph" onSubmit={()=>navigate("/")}/>}
export default SignIn;
