function MainBtn({ txt, style, action,type }) {
  return (
    <button type={type} className={`btn text-capitalize mainBtn ${style}`} onClick={action}>{txt}</button>
  );
}

export default MainBtn;
