import {useSnackbar} from "notistack";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {useEffect} from "react";


export const useMessageError = (message: string, error: FetchBaseQueryError | SerializedError | undefined) => {
    const {enqueueSnackbar} = useSnackbar()
    useEffect(() => {
        if (error) {
            enqueueSnackbar(message, {variant: "error"})
        }
        // eslint-disable-next-line
    }, [error])

}