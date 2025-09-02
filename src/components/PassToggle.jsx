import { Input } from "@heroui/react";

export default function PassToggle({ isVisible, setIsVisible }) {
  const toggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <label className="cursor-pointer">
        <Input type="checkbox" className="hidden peer" onClick={toggle} />
        <i
          className={`fa-regular ${!isVisible ? "fa-eye" : "fa-eye-slash"}`}
        ></i>
      </label>
    </>
  );
}
