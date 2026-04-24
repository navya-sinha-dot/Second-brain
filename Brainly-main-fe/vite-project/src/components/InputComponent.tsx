interface InputProps {
  type?: string;
  reference?: any;
  placeholder: string;
}

export function Input({ reference, placeholder, type = "text" }: InputProps) {
  return (
    <div className="w-full">
      <input
        type={type}
        ref={reference}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:bg-white focus:border-neo-blue/30 focus:ring-4 focus:ring-neo-blue/5 transition-all placeholder:text-neo-gray/50 font-medium text-sm"
      />
    </div>
  );
}
