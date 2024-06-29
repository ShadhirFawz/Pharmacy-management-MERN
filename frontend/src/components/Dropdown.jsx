function DropDown({ txt, className }) {
  return (
    <div>
      <button
        className={className}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {txt}
      </button>
      <ul class="dropdown-menu">
        <li>
          <p class="dropdown-item" href="#">
            Action
          </p>
        </li>
      </ul>
    </div>
  );
}

export default DropDown;
