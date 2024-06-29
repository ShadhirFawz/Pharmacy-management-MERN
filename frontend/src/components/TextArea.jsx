import React  from 'react'


const InvalidLogin = (props) => {
  return (
  <div className="invalidLoginLabel">
    <div className="invalidLoginText">{props.message}</div>
  </div>
  );
  };

const TextArea = (props) => {
  // const [errMsg , setErrMsg] = useState('')
  // setErrMsg(props.invalidMessage)
  return (

    <div className="textarea">
      <div className="text-wrapper-4">{props.label}</div>
      <div className="frame-5">
        <textarea style={!props.isCorrect ? {borderColor: '#e50c0c'} : null} type={props.type} name={props.name} placeholder={props.placeholder} onChange={props.onChange} readOnly= {props.readOnly} value={props.value}></textarea>
      </div>
      <div ref={props.ref} style={!props.isCorrect ? {display: "block"} : {display: "none"}}>

        {props.isCorrect ? null : (<InvalidLogin message = {props.invalidMessage} />)}

      </div>


    </div>

  )
}

export default TextArea;