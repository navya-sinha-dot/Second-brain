interface InputPorps {
  type?: string
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
        className="p-4 m-2 neo-border bg-white focus:outline-none focus:bg-neo-yellow transition-colors placeholder:text-black/50 font-bold tracking-tight text-sm w-full"></input>
    </div>
  );
}
