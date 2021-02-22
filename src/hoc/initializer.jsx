import React ,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import useRouter from '../hook/useRouter';
import { authCheckState } from "./../store/actions/auth_action";

function Initializer({children}) {
    const dispatch = useDispatch();	
    const route = useRouter();
    const isAuthenticate = useSelector(state => state.auth.isAuthenticate);
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath);
    useEffect(() => {
        dispatch(authCheckState());        
    }, [dispatch]);
    
    useEffect(() => {
        if(isAuthenticate){
            route.history.push(`${authRedirectPath}`)
        }else{
            route.history.push(`/login`)
        }
    }, [isAuthenticate])    

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default Initializer
