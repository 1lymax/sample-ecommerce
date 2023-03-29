import {useSnackbar} from "notistack";
import {useEffect} from "react";

export const useMessageSuccess = (message: string, isSuccess: boolean) => {
    const {enqueueSnackbar} = useSnackbar()
    useEffect(() => {
        if (isSuccess)
            enqueueSnackbar(message, {variant: "success"})
        // eslint-disable-next-line
    }, [isSuccess])
}