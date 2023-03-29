import {useEffect, useState} from "react";

export const Validations = {
    IS_LONGER_THAN: "IS_LONGER_THAN",
    IS_SHORTER_THAN: "IS_SHORTER_THAN",
    IS_EMPTY: "IS_EMPTY",
    IS_EMAIL_VALID: "IS_EMAIL_VALID",
    IS_CHECKED: "IS_CHECKED",
    IS_POSITIVE_INTEGER: "IS_POSITIVE_INTEGER",
} as const;

type Validation = {
    validation: keyof typeof Validations,
    value?: number | string | boolean
}

interface IUseIsValid {
    (value: string | number | boolean, title: string, validations: Validation[]):
        {
            isValid: boolean,
            errors: string[]
        };
}

export const useIsValid: IUseIsValid = (value, title, validations) => {
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [isLongerThan, setIsLongerThan] = useState<boolean>(false);
    const [isShorterThan, setIsShorterThan] = useState<boolean>(false);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPositiveInteger, setIsPositiveInteger] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[]>([]);

    const removeError = (error: string): void => {
        setErrors(prevState => prevState.filter(item => item !== error));
    };

    const addError = (error: string): void => {
        if (errors.indexOf(error) < 0) {
            setErrors(prevState => [...prevState, `${error}`]);
        }
    };

    useEffect(() => {
        for (const validation of validations) {
            switch (validation.validation) {
                case Validations.IS_EMPTY:
                    if (typeof value === "string" && value.length < 1) {
                        setIsEmpty(true);
                        addError(`${title} cannot be empty`);
                    } else {
                        setIsEmpty(false);
                        removeError(`${title} cannot be empty`);
                    }
                    break;
                case Validations.IS_LONGER_THAN:
                    if (validation.value && typeof value === "string" && value.length > validation.value) {
                        setIsLongerThan(true);
                        addError(`${title} cannot be more than ${validation.value} symbols`);
                    } else {
                        setIsLongerThan(false);
                        removeError(`${title} cannot be more than ${validation.value} symbols`);
                    }
                    break;
                case Validations.IS_SHORTER_THAN:
                    if (validation.value && typeof value === "string" && value.length < validation.value) {
                        setIsShorterThan(true);
                        addError(`${title} cannot be less than ${validation.value} symbols`);
                    } else {
                        setIsShorterThan(false);
                        removeError(`${title} cannot be less than ${validation.value} symbols`);
                    }
                    break;
                case Validations.IS_POSITIVE_INTEGER:
                    if (typeof value === "string" && value.match(/^[0-9]+$/) != null) {
                        setIsPositiveInteger(true);
                        removeError(`${title} must be positive integer`);
                    } else {
                        setIsPositiveInteger(false);
                        addError(`${title} must be positive integer`);
                    }
                    break;
                case Validations.IS_EMAIL_VALID:
                    if (typeof value === "string" && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        setIsEmailValid(false);
                        addError(`${title} is wrong`);
                    } else {
                        setIsEmailValid(true);
                        removeError(`${title} is wrong`);
                    }
                    break;
                case Validations.IS_CHECKED:
                    if (value) {
                        setIsChecked(true);
                        removeError(`${title}`);
                    } else {
                        setIsChecked(false);
                        addError(`${title}`);
                    }
                    break;
                default:
                    break;
            }
        }

    }, [value]);

    const isValid = !isEmpty && !isLongerThan && !isShorterThan && isPositiveInteger && isEmailValid && isChecked;

    return {
        isValid,
        errors: errors
    };
};