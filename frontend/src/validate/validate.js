import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Validation = (type) => {
    const mainSchema =
        {
            name: yup.string().required("Your Name is Required!"),
            username: yup.string().required("Your username is Required!"),
            email: yup.string().email("Enter a valid email").required("Email is required"),
            mobileNumber: yup.string().matches(/^[0-9]{10}$/, "Invalid mobile number").required("Your mobile number is Required!"),
            dateOfBirth: yup.date("Enter date of birth").required("Enter date of birth"),
            gender: yup.string().required("Select gender"),
            emergencyName: yup.string().required("Enter Emergency contact full name"),
            emergencyMobile: yup.string().matches(/^[0-9]{10}$/, "Invalid mobile number").required("Enter Emergency contact mobile number"),
            emergencyRelation: yup.string().required("Enter Emergency contact relation"),
            hourlyRate: yup.string().required("Enter hourly rate"),
            affiliation: yup.string().required("Enter affiliation"),
            educationalBackground: yup.string().required("Enter Educational background"),
            oldPassword: yup.string().required("Old Password is required"),
            password: yup.string().min(8).max(34)
            .matches(/^(?=.*[a-z])/, "Password must contain at least 1 lowercase")
            //.matches(/^(?=.*[A-Z])/, "Password must contain at least 1 uppercase")
            .matches(/^(?=.*[#$@!%&*?^,"'])/, "Password must contain a special character")
            //.matches(/^(?=.*\d)/, "Password must contain at least 1 number")
            //.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,34}$/, "Password must contain at least 1 uppercase, 1 lowercase, 1 special character and 1 number")
            .required("Password is required"),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref("password"), null], "Passwords Don't Match")
                .required("Confirm Password is required"),
            activeIngredients: yup.string().required("Enter active ingreidents"),
            price: yup.string().required("Enter price"),
            availableQuantity: yup.string().required("Enter availableQuantity"),

        }
        
    const formSchema = {
        createAccount: {
            name: mainSchema['name'],
            username: mainSchema['username'],
            email: mainSchema['email'],
            mobileNumber: mainSchema['mobileNumber'],
            gender: mainSchema['gender'],
            dateOfBirth: mainSchema['dateOfBirth'],
            password: mainSchema['password'],
            confirmPassword: mainSchema['confirmPassword'],
            emergencyName : mainSchema['emergencyName'],
            emergencyMobile : mainSchema['emergencyMobile'],
            emergencyRelation : mainSchema['emergencyRelation'],
            hourlyRate: mainSchema['hourlyRate'],
            affiliation: mainSchema['affiliation'],
            educationalBackground: mainSchema['educationalBackground'],

        },
        login: {
            email: mainSchema['email'],
            password: mainSchema['password']
        },
        forgotPassword: {
            email: mainSchema['email']
        },
        resetPassword: {
            password: mainSchema['password'],
            confirmPassword: mainSchema['confirmPassword']
        },
        changePassword: {
            oldPassword: mainSchema['oldPassword'],
            password: mainSchema['password'],
            confirmPassword: mainSchema['confirmPassword']
        },
        addAdministrator: {
            username: mainSchema['username'],
            password: mainSchema['password']
        },
        addMedicine: {
            activeIngredients: mainSchema['activeIngredients'],
            price: mainSchema['price'],
            availableQuantity: mainSchema['availableQuantity']
        },
        editMedicine: {
            activeIngredients: mainSchema['activeIngredients'],
            price: mainSchema['price'],
        }
    }
    const schema = yup.object().shape(formSchema[type]);
    
        const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return { register, handleSubmit, errors }
}

export default Validation