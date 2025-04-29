interface InputPorps {
  reference?: any;
  placeholder: string;
}

export function Input({ reference, placeholder }: InputPorps) {
  return (
    <div>
      <input
        type="text"
        ref={reference}
        placeholder={placeholder}
        className="p-4 m-2 rounded-md border"></input>
    </div>
  );
}
