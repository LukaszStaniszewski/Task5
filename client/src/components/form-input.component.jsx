const FormInput = ({label, ...otherProps }) => (

  <div className="relative mb-7">
    <input className="block appearance-none bg-transparent  w-full text-gray-700 mr-3 px-2 leading-tight border-b border-teal-500 py-2" {...otherProps}/>
    {
      label && <label className={`${otherProps.value.length
      ? ' -translate-y-8 text-slate-400'
      : ''} 
      focus:-translate-y-9 text-gray-400 top-0 absolute pointer-events-none
      transition-transform ease-in-out duration-300 px-2 py-2 `}>{label}</label>
    }
</div>

)

export default FormInput;
