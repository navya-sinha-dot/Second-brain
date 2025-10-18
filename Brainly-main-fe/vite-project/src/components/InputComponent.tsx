interface InputPorps {
  type?:string
  reference?: any;
  placeholder: string;
}

export function Input({ reference, placeholder, type = "text" }: InputPorps) {
  return (
    <div>
      <input
        type={type}
        ref={reference}
        placeholder={placeholder}
        className="p-4 m-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-blue-400"></input>
    </div>
  );
}
