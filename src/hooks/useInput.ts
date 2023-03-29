import React, {useState} from "react";

interface IUseInput {
    (initialValue: string, inputName: string):
        {
            value: string,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        }
}

export const useInput: IUseInput = (initialValue, inputName) => {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return {
        type: "text",
        id: inputName,
        fullWidth: true,
        name: inputName,
        label: inputName,
        value,
        onChange
    }
}