import {useState} from "react";
import {SelectChangeEvent} from "@mui/material";

interface IUseMuiSelectInput {
    (initialValue: string, inputName: string):
        {
            value: any,
            onChange: (e: SelectChangeEvent<HTMLInputElement>) => void
        }
}

export const useInputMuiSelect: IUseMuiSelectInput = (initialValue, inputName) => {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    return {
        id: inputName,
        name: inputName,
        label: inputName,
        value,
        onChange
    }
}