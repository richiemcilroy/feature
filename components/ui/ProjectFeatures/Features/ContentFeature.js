export default function ContentFeature(props) {  
  return(
    <div className="py-16 overflow-hidden lg:py-24" style={{backgroundColor: props?.data?.background_color}}>
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="relative">
          {
            props?.data?.section_title &&
            <p className="text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl" style={{color: props?.data?.text_color}}>
              {props?.data?.section_title}
            </p>
          }
          {
            props?.data?.section_content &&
            <p className="mt-4 max-w-3xl mx-auto text-center text-xl" style={{color: props?.data?.text_color}}>
              {props?.data?.section_content}
            </p>
          }
        </div>
      </div>
    </div>
  )
};