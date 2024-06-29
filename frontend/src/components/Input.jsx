import { useRef } from 'react';
import eye from '../assets/images/svg/eye.svg';

function Input({ title, placeholder, showErr, type,register, onChange, required}) {
  console.log(register);
  let inputRef = useRef();
  const showPassword = () => {
    let input = inputRef.current.previousSibling;
    input.type == 'text' ? (input.type = 'password') : (input.type = 'text');
  };

  return (
    <div className="mt-3">
      <p className="mb-2 text-capitalize fw-medium">{title}</p>
      <div className="input-group">
        <input
        onChange={onChange}
          className={`mainInput form-control ${
            type == 'password' && 'border-end-0'
          } ${showErr && 'err-active'}`}
          placeholder={placeholder}
          type={type}
          {...register}
          required={required}
        />
        {type == 'password' && (
          <span
            className="input-group-text bg-white border-start-0 search"
            ref={inputRef}
            onClick={showPassword}
          >
            <img className='pointer' src={eye} alt="eye" />
          </span>
        )}
      </div>
      {showErr && (
        <p className="text-capitalize err-msg my-1">{showErr}</p>
      )}
    </div>
  );
}

export default Input;
