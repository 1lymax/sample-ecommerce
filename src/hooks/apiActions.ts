import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {productActionCreators} from "../store/slices/product.slice";

export const useProductActions = () => {
    const dispatch = useDispatch()
     return bindActionCreators(productActionCreators, dispatch)
}
