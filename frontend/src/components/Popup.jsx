import React, { useEffect, useState, useContext } from 'react'
import Popup from "reactjs-popup";
import deleteDisable from '../assets/images/svg/delete-disabled 2.svg'
import TextArea from './TextArea'
import Validation from '../validate/validate';

function PopupMessage ({type,show}) {
    let {errors,handleSubmit,register} = Validation('missingRequest')
    const [selectedRadio, setSelectedRadio] = useState('');
    const [comment, setComment] = useState("");
    const [errMsgReject, setErrMsgReject] = useState('');
    const [isRejectCorrect, setIsRejectCorrect] = useState(true);
    
  
    const isRadioSelected = (value) => selectedRadio === value;
    const handleRadioClick = (e) => setSelectedRadio(e.target.value)
    
return (
    <div lassName="frame-55">
        {type==='reject' &&
        <Popup
              modal
              nested
            //   show = {show}
            //   trigger={<div className="frame-57">
            //     <div className="text-wrapper-52">
            //       Reject
            //     </div>
            //   </div>}
            >
              <div className="frame-header">
                <div className="div">
                  <div className="text-wrapper">Rejection Reason</div>
                  <a href="/expertview">
                    <img className="img" alt="Delete disabled" src={deleteDisable} />
                  </a>
                </div>
              </div>
              <div className="frame-popup">
                <div className="selection">
                  <input
                    type='radio' className="div" value={'speciality'}
                    checked={isRadioSelected('speciality')} onChange={handleRadioClick} />
                  <div className="label">Another specialty</div>
                </div>
                <div className="selection">
                  <input
                    type='radio' className="div" value={'time'}
                    checked={isRadioSelected('time')} onChange={handleRadioClick} />
                  <div className="label">Didn&#39;t have time</div>
                </div>
                <div className="selection">
                  <input
                    type='radio' className="div" value={'other'}
                    checked={isRadioSelected('other')} onChange={handleRadioClick} />
                  <div className="label">Other</div>
                </div>
                <div className="input">
                  <div className="text-wrapper">Comments</div>
                  <TextArea className="text-wrapper-2 div-2"
                    invalidMessage={errMsgReject}
                    isCorrect={isRejectCorrect}
                    type='text' placeholder='Type your comments' onChange={(e) => setComment(e.target.value)}/>

                </div>

                <div className="div-wrapper">
                  <div className="text-wrapper-3">Reject Case</div>
                </div>

              </div>
        </Popup>
        }
        {
        type==='missing' && 
        <Popup
        modal
        nested
        trigger={<div className="frame-56">
          <div className="text-wrapper-45">
            Request missing information
          </div>
        </div>
        }>
        <div className="frame-header">
          <div className="div">
            <div className="text-wrapper">Missing Information</div>
            <a href="/expertview">
              <img className="img" alt="Delete disabled" src={deleteDisable} />
            </a>
          </div>
        </div>
        <div className="frame-popup">

          <div className="input">
            <div className="text-wrapper">Comments</div>
          
            {
              <TextArea className="text-wrapper-2 div-2"
              err={errors.missingRequest?.message}
              register={register("missingRequest")}
              type='text' placeholder='Type your comments' name="missingRequest"
              />
            }
          
          </div>

          <div className="div-wrapper" >
            <div className="text-wrapper-3">Request Missing Information</div>
          </div>

        </div>
      </Popup>
        }
    </div>
)
}
export default PopupMessage