import Input from './Input.jsx';
import MainBtn from './Button.jsx';
import { Link } from 'react-router-dom';
import Validation from '../validate/validate.js';

function Form({ title, inputArr, btnArr, type, action }) {
  let { handleSubmit } = Validation()
  let c = (data) => {
    console.log(data);
  }
  return (
    <form
      className="d-flex justify-content-center"
    >
      <div className="form-width">
        <p className="text-capitalize fs-4">{title}</p>
        {inputArr?.map((e, i) => (
          <Input
            title={e.title}
            placeholder={e.placeholder}
            key={`formInput${i}`}
            type={e.type}
            showErr={e.showErr}
            register={e.register}
            onChange={e.action}
          />
        ))}

        {/* {type == 'register' && (
          <p className="text-center mt-3 small-txt">
            By Creating an account you agree to our
            <a className="green-txt"> Terms of use </a>
            and
            <a className="green-txt"> Privacy Policy</a>
          </p>
        )} */}
        {btnArr.map((e, i) => (
          <div className="mt-3">
            <MainBtn
              txt={e.title}
              style={e.style}
              action={e.action}
              key={`formBtn${i}`} 
              type={e.type}
            />
          </div>
        ))}

        <p className="text-center mt-3 small-txt">
          {type == 'register' ? (
            <>
              Have an account?
              <Link to="/" className="green-txt">
                {' '}
                Login
              </Link>
            </>
          ) : type == 'login' ? (
            <>
              Forget Password?
              <Link to="/forgetpassword" className="green-txt">
                {' '}
                Reset Password
              </Link>
            </>
          ) : (
            ''
          )}
        </p>
      </div>
    </form>
  );
}

export default Form;
